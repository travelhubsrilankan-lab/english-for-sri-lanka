import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { VocabularyWord } from '../types/story';

export type ReaderTheme = 'night' | 'light' | 'sepia';

export interface SavedWordEntry {
  wordId: string;
  word: string;
  phonetic: string;
  sinhalaMeaning: string;
  englishDefinition: string;
  example?: string;
  partOfSpeech: string;
  storyId: string;
  mastered: boolean;
}

export interface QuizScoreRecord {
  score: number;
  total: number;
}

interface LocalProgressSnapshot {
  completedStoryIds: string[];
  favoriteStoryIds: string[];
  quizScores: Record<string, number>;
  gameBestScores: Record<string, number>;
  streakCount: number;
  lastReadDate: string;
  readerTheme: ReaderTheme;
  readerFontSize: number;
  savedWords: SavedWordEntry[];
}

interface UserProgressContextValue {
  user: User | null;
  authReady: boolean;
  authBusy: boolean;
  authError: string | null;
  completedStoryIds: string[];
  favoriteStoryIds: string[];
  quizScores: Record<string, number>;
  gameBestScores: Record<string, number>;
  streakCount: number;
  lastReadDate: string;
  readerTheme: ReaderTheme;
  readerFontSize: number;
  savedWords: SavedWordEntry[];
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  markStoryComplete: (storyId: string) => void;
  toggleFavoriteStory: (storyId: string) => void;
  isStoryFavorited: (storyId: string) => boolean;
  recordQuizScore: (storyId: string, score: number, total: number) => void;
  updateGameBestScore: (gameKey: string, score: number) => void;
  recordLearningActivity: () => void;
  setReaderTheme: (theme: ReaderTheme) => void;
  setReaderFontSize: (sizeIndex: number) => void;
  toggleSaveWord: (vocab: VocabularyWord, storyId?: string) => void;
  isWordSaved: (word: string) => boolean;
  toggleMasteredWord: (wordId: string) => void;
  setWordMastered: (wordId: string, mastered: boolean) => void;
  addStarterWords: (words: Array<{ vocab: VocabularyWord; storyId: string }>) => void;
  recordDailyVisit: () => void;
  recordStoryView: (storyId: string) => void;
}

const LOCAL_STORAGE_KEY = 'storyglow_user_progress_v1';
const GAME_SCORES_KEY = 'storyglow_game_best_scores';
const FAVORITE_STORIES_KEY = 'storyglow_favorite_stories_v1';

function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getYesterdayDateString(): string {
  const dt = new Date();
  dt.setDate(dt.getDate() - 1);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function normalizeWordId(word: string): string {
  const sanitized = word
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_\-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 64);
  return sanitized || 'word';
}

function readLocalSnapshot(): LocalProgressSnapshot {
  const defaults: LocalProgressSnapshot = {
    completedStoryIds: [],
    favoriteStoryIds: [],
    quizScores: {},
    gameBestScores: { match: 0, scramble: 0, cloze: 0, speed: 0, detective: 0 },
    streakCount: 0,
    lastReadDate: '',
    readerTheme: 'night',
    readerFontSize: 1,
    savedWords: [],
  };

  try {
    const rawGames = window.localStorage.getItem(GAME_SCORES_KEY);
    if (rawGames) {
      const parsedGames = JSON.parse(rawGames) as Record<string, number>;
      if (parsedGames && typeof parsedGames === 'object') {
        defaults.gameBestScores = { ...defaults.gameBestScores, ...parsedGames };
      }
    }
  } catch {
    // Ignore localStorage game score read errors
  }

  try {
    const rawFavorites = window.localStorage.getItem(FAVORITE_STORIES_KEY);
    if (rawFavorites) {
      const parsedFav = JSON.parse(rawFavorites) as unknown;
      if (Array.isArray(parsedFav)) {
        defaults.favoriteStoryIds = parsedFav.filter((id): id is string => typeof id === 'string');
      }
    }
  } catch {
    // Ignore localStorage favorites read errors
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<LocalProgressSnapshot>;
      const mergedFavorites = Array.isArray(parsed.favoriteStoryIds)
        ? parsed.favoriteStoryIds.filter((id): id is string => typeof id === 'string')
        : defaults.favoriteStoryIds;

      return {
        completedStoryIds: Array.isArray(parsed.completedStoryIds)
          ? parsed.completedStoryIds.filter((id): id is string => typeof id === 'string').slice(0, 100)
          : [],
        favoriteStoryIds: Array.from(new Set(mergedFavorites)).slice(0, 100),
        quizScores:
          parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
        gameBestScores:
          parsed.gameBestScores && typeof parsed.gameBestScores === 'object'
            ? { ...defaults.gameBestScores, ...parsed.gameBestScores }
            : defaults.gameBestScores,
        streakCount:
          typeof parsed.streakCount === 'number' && parsed.streakCount >= 0
            ? parsed.streakCount
            : 0,
        lastReadDate: typeof parsed.lastReadDate === 'string' ? parsed.lastReadDate : '',
        readerTheme:
          parsed.readerTheme === 'light' || parsed.readerTheme === 'sepia'
            ? parsed.readerTheme
            : 'night',
        readerFontSize:
          typeof parsed.readerFontSize === 'number' &&
          parsed.readerFontSize >= 0 &&
          parsed.readerFontSize <= 3
            ? Math.round(parsed.readerFontSize)
            : 1,
        savedWords: Array.isArray(parsed.savedWords) ? parsed.savedWords : [],
      };
    }
  } catch {
    // Ignore localStorage progress read errors
  }

  return defaults;
}

const UserProgressContext = createContext<UserProgressContextValue | null>(null);

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialRef = useRef<LocalProgressSnapshot>(readLocalSnapshot());

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [completedStoryIds, setCompletedStoryIds] = useState<string[]>(
    initialRef.current.completedStoryIds
  );
  const [favoriteStoryIds, setFavoriteStoryIds] = useState<string[]>(
    initialRef.current.favoriteStoryIds
  );
  const [quizScores, setQuizScores] = useState<Record<string, number>>(
    initialRef.current.quizScores
  );
  const [gameBestScores, setGameBestScores] = useState<Record<string, number>>(
    initialRef.current.gameBestScores
  );
  const [streakCount, setStreakCount] = useState<number>(initialRef.current.streakCount);
  const [lastReadDate, setLastReadDate] = useState<string>(initialRef.current.lastReadDate);
  const [readerTheme, setReaderThemeState] = useState<ReaderTheme>(
    initialRef.current.readerTheme
  );
  const [readerFontSize, setReaderFontSizeState] = useState<number>(
    initialRef.current.readerFontSize
  );
  const [savedWords, setSavedWords] = useState<SavedWordEntry[]>(
    initialRef.current.savedWords
  );

  // Persist snapshot to localStorage inside try/catch whenever core state updates
  useEffect(() => {
    try {
      const payload: LocalProgressSnapshot = {
        completedStoryIds,
        favoriteStoryIds,
        quizScores,
        gameBestScores,
        streakCount,
        lastReadDate,
        readerTheme,
        readerFontSize,
        savedWords,
      };
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
      window.localStorage.setItem(GAME_SCORES_KEY, JSON.stringify(gameBestScores));
      window.localStorage.setItem(FAVORITE_STORIES_KEY, JSON.stringify(favoriteStoryIds));
    } catch {
      // Ignore localStorage write errors (e.g. private browsing quota)
    }
  }, [
    completedStoryIds,
    favoriteStoryIds,
    quizScores,
    gameBestScores,
    streakCount,
    lastReadDate,
    readerTheme,
    readerFontSize,
    savedWords,
  ]);

  const stateRef = useRef({
    completedStoryIds,
    quizScores,
    gameBestScores,
    streakCount,
    lastReadDate,
    readerTheme,
    readerFontSize,
  });
  stateRef.current = {
    completedStoryIds,
    quizScores,
    gameBestScores,
    streakCount,
    lastReadDate,
    readerTheme,
    readerFontSize,
  };

  const pushProfileToCloud = useCallback(
    async (
      targetUser: User,
      nextState: {
        completedStoryIds: string[];
        quizScores: Record<string, number>;
        gameBestScores: Record<string, number>;
        streakCount: number;
        lastReadDate: string;
        readerTheme: ReaderTheme;
        readerFontSize: number;
      }
    ) => {
      if (!targetUser.emailVerified) return;
      const path = `users/${targetUser.uid}`;
      try {
        const cleanQuizScores: Record<string, number> = {};
        Object.entries(nextState.quizScores)
          .slice(0, 50)
          .forEach(([k, v]) => {
            if (typeof v === 'number' && Number.isFinite(v)) {
              cleanQuizScores[k.slice(0, 80)] = Math.max(0, Math.min(100, Math.round(v)));
            }
          });

        const cleanGameScores: Record<string, number> = {};
        Object.entries(nextState.gameBestScores)
          .slice(0, 20)
          .forEach(([k, v]) => {
            if (typeof v === 'number' && Number.isFinite(v)) {
              cleanGameScores[k.slice(0, 40)] = Math.max(0, Math.round(v));
            }
          });

        await setDoc(
          doc(db, 'users', targetUser.uid),
          {
            uid: targetUser.uid,
            displayName: (targetUser.displayName || 'Learner').slice(0, 100),
            completedStoryIds: nextState.completedStoryIds.slice(0, 100),
            quizScores: cleanQuizScores,
            gameBestScores: cleanGameScores,
            streakCount: Math.max(0, Math.min(10000, Math.round(nextState.streakCount))),
            lastReadDate: nextState.lastReadDate.slice(0, 20),
            readerTheme: nextState.readerTheme,
            readerFontSize: Math.max(0, Math.min(3, Math.round(nextState.readerFontSize))),
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, path);
      }
    },
    []
  );

  // Listen to Firebase Auth state & merge local + cloud profile on sign-in
  useEffect(() => {
    let unsubSavedWords: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);

      if (unsubSavedWords) {
        unsubSavedWords();
        unsubSavedWords = null;
      }

      if (!currentUser) return;

      const userPath = `users/${currentUser.uid}`;
      try {
        const snap = await getDoc(doc(db, 'users', currentUser.uid));
        const local = stateRef.current;

        if (snap.exists()) {
          const cloud = snap.data();
          const cloudCompleted = Array.isArray(cloud.completedStoryIds)
            ? (cloud.completedStoryIds as string[])
            : [];
          const mergedCompleted = Array.from(
            new Set([...local.completedStoryIds, ...cloudCompleted])
          ).slice(0, 100);

          const cloudQuiz =
            cloud.quizScores && typeof cloud.quizScores === 'object'
              ? (cloud.quizScores as Record<string, number>)
              : {};
          const mergedQuiz: Record<string, number> = { ...local.quizScores };
          for (const [k, v] of Object.entries(cloudQuiz)) {
            mergedQuiz[k] = Math.max(mergedQuiz[k] ?? 0, Number(v) || 0);
          }

          const cloudGames =
            cloud.gameBestScores && typeof cloud.gameBestScores === 'object'
              ? (cloud.gameBestScores as Record<string, number>)
              : {};
          const mergedGames: Record<string, number> = { ...local.gameBestScores };
          for (const [k, v] of Object.entries(cloudGames)) {
            mergedGames[k] = Math.max(mergedGames[k] ?? 0, Number(v) || 0);
          }

          const cloudStreak = Number(cloud.streakCount) || 0;
          const mergedStreak = Math.max(local.streakCount, cloudStreak);
          const cloudDate = typeof cloud.lastReadDate === 'string' ? cloud.lastReadDate : '';
          const mergedDate =
            local.lastReadDate >= cloudDate ? local.lastReadDate : cloudDate;

          const cloudTheme: ReaderTheme =
            cloud.readerTheme === 'light' || cloud.readerTheme === 'sepia'
              ? cloud.readerTheme
              : local.readerTheme;
          const cloudFont =
            typeof cloud.readerFontSize === 'number'
              ? cloud.readerFontSize
              : local.readerFontSize;

          const mergedState = {
            completedStoryIds: mergedCompleted,
            quizScores: mergedQuiz,
            gameBestScores: mergedGames,
            streakCount: mergedStreak,
            lastReadDate: mergedDate,
            readerTheme: cloudTheme,
            readerFontSize: cloudFont,
          };

          setCompletedStoryIds(mergedCompleted);
          setQuizScores(mergedQuiz);
          setGameBestScores(mergedGames);
          setStreakCount(mergedStreak);
          setLastReadDate(mergedDate);
          setReaderThemeState(cloudTheme);
          setReaderFontSizeState(cloudFont);

          void pushProfileToCloud(currentUser, mergedState).catch(() => {});
        } else {
          await pushProfileToCloud(currentUser, local);
        }

        const localWords = readLocalSnapshot().savedWords;
        for (const w of localWords) {
          const wordRef = doc(db, 'users', currentUser.uid, 'savedWords', w.wordId);
          const wordSnap = await getDoc(wordRef);
          if (!wordSnap.exists()) {
            await setDoc(wordRef, {
              userId: currentUser.uid,
              word: w.word.slice(0, 64),
              phonetic: (w.phonetic || '').slice(0, 80),
              sinhalaMeaning: w.sinhalaMeaning.slice(0, 200),
              englishDefinition: (w.example || w.englishDefinition || '').slice(0, 300),
              partOfSpeech: (w.partOfSpeech || 'word').slice(0, 30),
              storyId: (w.storyId || '').slice(0, 80),
              mastered: Boolean(w.mastered),
              savedAt: serverTimestamp(),
            });
          }
        }

        const savedWordsPath = `users/${currentUser.uid}/savedWords`;
        unsubSavedWords = onSnapshot(
          collection(db, 'users', currentUser.uid, 'savedWords'),
          (snapshot) => {
            const list: SavedWordEntry[] = snapshot.docs.map((d) => {
              const data = d.data();
              const defText = String(data.englishDefinition || '');
              return {
                wordId: d.id,
                word: String(data.word || d.id),
                phonetic: String(data.phonetic || ''),
                sinhalaMeaning: String(data.sinhalaMeaning || ''),
                englishDefinition: defText,
                example: defText,
                partOfSpeech: String(data.partOfSpeech || 'word'),
                storyId: String(data.storyId || ''),
                mastered: Boolean(data.mastered),
              };
            });
            setSavedWords(list);
          },
          (error) => {
            handleFirestoreError(error, OperationType.LIST, savedWordsPath);
          }
        );
      } catch (err) {
        console.error('Cloud profile sync warning:', err);
        if (err instanceof Error && err.message.includes('Missing or insufficient permissions')) {
          handleFirestoreError(err, OperationType.GET, userPath);
        }
      }
    });

    return () => {
      unsubAuth();
      if (unsubSavedWords) unsubSavedWords();
    };
  }, [pushProfileToCloud]);

  const syncAfterUpdate = useCallback(
    (overrides: Partial<typeof stateRef.current>) => {
      const next = { ...stateRef.current, ...overrides };
      stateRef.current = next;
      if (user) {
        void pushProfileToCloud(user, next).catch(() => {});
      }
    },
    [user, pushProfileToCloud]
  );

  const computeNextStreak = useCallback((): { streakCount: number; lastReadDate: string } => {
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();
    const currentLast = stateRef.current.lastReadDate;
    const currentStreak = stateRef.current.streakCount;

    if (currentLast === today) {
      return {
        streakCount: Math.max(1, currentStreak),
        lastReadDate: today,
      };
    }
    if (currentLast === yesterday) {
      return {
        streakCount: currentStreak + 1,
        lastReadDate: today,
      };
    }
    return {
      streakCount: 1,
      lastReadDate: today,
    };
  }, []);

  const recordLearningActivity = useCallback(() => {
    const { streakCount: nextStreak, lastReadDate: nextDate } = computeNextStreak();
    setStreakCount(nextStreak);
    setLastReadDate(nextDate);
    syncAfterUpdate({ streakCount: nextStreak, lastReadDate: nextDate });
  }, [computeNextStreak, syncAfterUpdate]);

  const markStoryComplete = useCallback(
    (storyId: string) => {
      const { streakCount: nextStreak, lastReadDate: nextDate } = computeNextStreak();
      const nextCompleted = stateRef.current.completedStoryIds.includes(storyId)
        ? stateRef.current.completedStoryIds
        : [...stateRef.current.completedStoryIds, storyId].slice(0, 100);

      setCompletedStoryIds(nextCompleted);
      setStreakCount(nextStreak);
      setLastReadDate(nextDate);
      syncAfterUpdate({
        completedStoryIds: nextCompleted,
        streakCount: nextStreak,
        lastReadDate: nextDate,
      });
    },
    [computeNextStreak, syncAfterUpdate]
  );

  const toggleFavoriteStory = useCallback((storyId: string) => {
    setFavoriteStoryIds((prev) =>
      prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [storyId, ...prev]
    );
  }, []);

  const isStoryFavorited = useCallback(
    (storyId: string) => favoriteStoryIds.includes(storyId),
    [favoriteStoryIds]
  );

  const recordQuizScore = useCallback(
    (storyId: string, score: number, total: number) => {
      const pct = total > 0 ? Math.round((score / total) * 100) : 0;
      const prevPct = stateRef.current.quizScores[storyId] ?? 0;
      const nextQuizScores = {
        ...stateRef.current.quizScores,
        [storyId]: Math.max(prevPct, pct),
      };
      const { streakCount: nextStreak, lastReadDate: nextDate } = computeNextStreak();
      const nextCompleted = stateRef.current.completedStoryIds.includes(storyId)
        ? stateRef.current.completedStoryIds
        : [...stateRef.current.completedStoryIds, storyId].slice(0, 100);

      setQuizScores(nextQuizScores);
      setCompletedStoryIds(nextCompleted);
      setStreakCount(nextStreak);
      setLastReadDate(nextDate);
      syncAfterUpdate({
        quizScores: nextQuizScores,
        completedStoryIds: nextCompleted,
        streakCount: nextStreak,
        lastReadDate: nextDate,
      });
    },
    [computeNextStreak, syncAfterUpdate]
  );

  const updateGameBestScore = useCallback(
    (gameKey: string, score: number) => {
      const prev = stateRef.current.gameBestScores[gameKey] ?? 0;
      const nextGames =
        score > prev
          ? { ...stateRef.current.gameBestScores, [gameKey]: score }
          : stateRef.current.gameBestScores;
      const { streakCount: nextStreak, lastReadDate: nextDate } = computeNextStreak();

      setGameBestScores(nextGames);
      setStreakCount(nextStreak);
      setLastReadDate(nextDate);
      syncAfterUpdate({
        gameBestScores: nextGames,
        streakCount: nextStreak,
        lastReadDate: nextDate,
      });
    },
    [computeNextStreak, syncAfterUpdate]
  );

  const setReaderTheme = useCallback(
    (theme: ReaderTheme) => {
      setReaderThemeState(theme);
      syncAfterUpdate({ readerTheme: theme });
    },
    [syncAfterUpdate]
  );

  const setReaderFontSize = useCallback(
    (sizeIndex: number) => {
      const clamped = Math.max(0, Math.min(3, Math.round(sizeIndex)));
      setReaderFontSizeState(clamped);
      syncAfterUpdate({ readerFontSize: clamped });
    },
    [syncAfterUpdate]
  );

  const isWordSaved = useCallback(
    (word: string) => {
      const targetId = normalizeWordId(word);
      return savedWords.some((w) => w.wordId === targetId);
    },
    [savedWords]
  );

  const toggleSaveWord = useCallback(
    (vocab: VocabularyWord, storyId = '') => {
      const wordId = normalizeWordId(vocab.word);
      const alreadyExists = savedWords.some((w) => w.wordId === wordId);

      if (alreadyExists) {
        setSavedWords((prev) => prev.filter((w) => w.wordId !== wordId));
        if (user && user.emailVerified) {
          const path = `users/${user.uid}/savedWords/${wordId}`;
          void deleteDoc(doc(db, 'users', user.uid, 'savedWords', wordId)).catch((err) => {
            handleFirestoreError(err, OperationType.DELETE, path);
          });
        }
      } else {
        const cleanExample = (vocab.example || vocab.englishDefinition || '').slice(0, 300);
        const entry: SavedWordEntry = {
          wordId,
          word: vocab.word.slice(0, 64),
          phonetic: (vocab.phonetic || '').slice(0, 80),
          sinhalaMeaning: vocab.sinhalaMeaning.slice(0, 200),
          englishDefinition: cleanExample,
          example: cleanExample,
          partOfSpeech: (vocab.partOfSpeech || 'word').slice(0, 30),
          storyId: storyId.slice(0, 80),
          mastered: false,
        };
        setSavedWords((prev) => [entry, ...prev]);

        if (user && user.emailVerified) {
          const path = `users/${user.uid}/savedWords/${wordId}`;
          void (async () => {
            try {
              await pushProfileToCloud(user, stateRef.current);
              await setDoc(doc(db, 'users', user.uid, 'savedWords', wordId), {
                userId: user.uid,
                word: entry.word,
                phonetic: entry.phonetic,
                sinhalaMeaning: entry.sinhalaMeaning,
                englishDefinition: entry.englishDefinition,
                partOfSpeech: entry.partOfSpeech,
                storyId: entry.storyId,
                mastered: false,
                savedAt: serverTimestamp(),
              });
            } catch (err) {
              handleFirestoreError(err, OperationType.CREATE, path);
            }
          })();
        }
      }
    },
    [savedWords, user, pushProfileToCloud]
  );

  const setWordMastered = useCallback(
    (wordId: string, mastered: boolean) => {
      setSavedWords((prev) =>
        prev.map((w) => (w.wordId === wordId ? { ...w, mastered } : w))
      );

      recordLearningActivity();

      if (user && user.emailVerified) {
        const path = `users/${user.uid}/savedWords/${wordId}`;
        void setDoc(
          doc(db, 'users', user.uid, 'savedWords', wordId),
          {
            mastered,
            savedAt: serverTimestamp(),
          },
          { merge: true }
        ).catch((err) => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }
    },
    [user, recordLearningActivity]
  );

  const toggleMasteredWord = useCallback(
    (wordId: string) => {
      const target = savedWords.find((w) => w.wordId === wordId);
      setWordMastered(wordId, target ? !target.mastered : true);
    },
    [savedWords, setWordMastered]
  );

  const addStarterWords = useCallback(
    (items: Array<{ vocab: VocabularyWord; storyId: string }>) => {
      const existingIds = new Set(savedWords.map((w) => w.wordId));
      const additions: SavedWordEntry[] = [];

      for (const item of items) {
        const wordId = normalizeWordId(item.vocab.word);
        if (!existingIds.has(wordId)) {
          existingIds.add(wordId);
          const cleanExample = (
            item.vocab.example ||
            item.vocab.englishDefinition ||
            ''
          ).slice(0, 300);
          additions.push({
            wordId,
            word: item.vocab.word.slice(0, 64),
            phonetic: (item.vocab.phonetic || '').slice(0, 80),
            sinhalaMeaning: item.vocab.sinhalaMeaning.slice(0, 200),
            englishDefinition: cleanExample,
            example: cleanExample,
            partOfSpeech: (item.vocab.partOfSpeech || 'word').slice(0, 30),
            storyId: item.storyId.slice(0, 80),
            mastered: false,
          });
        }
      }

      if (additions.length === 0) return;
      setSavedWords((prev) => [...additions, ...prev]);

      if (user && user.emailVerified) {
        void (async () => {
          await pushProfileToCloud(user, stateRef.current);
          for (const entry of additions) {
            const path = `users/${user.uid}/savedWords/${entry.wordId}`;
            try {
              await setDoc(doc(db, 'users', user.uid, 'savedWords', entry.wordId), {
                userId: user.uid,
                word: entry.word,
                phonetic: entry.phonetic,
                sinhalaMeaning: entry.sinhalaMeaning,
                englishDefinition: entry.englishDefinition,
                partOfSpeech: entry.partOfSpeech,
                storyId: entry.storyId,
                mastered: false,
                savedAt: serverTimestamp(),
              });
            } catch (err) {
              handleFirestoreError(err, OperationType.CREATE, path);
            }
          }
        })().catch(() => {});
      }
    },
    [savedWords, user, pushProfileToCloud]
  );

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);
    setAuthBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign-in could not complete.';
      if (!msg.includes('popup-closed-by-user')) {
        setAuthError(
          'Google Sign-In unavailable in this window. Please allow popups and try again.'
        );
      }
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setAuthError(null);
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  }, []);

  const recordDailyVisit = useCallback(() => {
    const today = getTodayDateString();
    const sessionKey = `storyglow_visited_${today}`;
    try {
      if (window.sessionStorage.getItem(sessionKey)) return;
      window.sessionStorage.setItem(sessionKey, '1');
    } catch {
      // Proceed even if sessionStorage is restricted
    }

    const dailyRef = doc(db, 'analytics_daily', today);
    void runTransaction(db, async (tx) => {
      const snap = await tx.get(dailyRef);
      if (snap.exists()) {
        const current = Number(snap.data().visits) || 0;
        tx.update(dailyRef, {
          visits: current + 1,
          updatedAt: serverTimestamp(),
        });
      } else {
        tx.set(dailyRef, {
          date: today,
          visits: 1,
          updatedAt: serverTimestamp(),
        });
      }
    }).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.WRITE, `analytics_daily/${today}`);
      } catch {
        // Non-blocking analytics failure
      }
    });
  }, []);

  const recordStoryView = useCallback((storyId: string) => {
    const cleanId = storyId.trim().slice(0, 100);
    if (!/^[a-zA-Z0-9_\-]+$/.test(cleanId)) return;

    const sessionKey = `storyglow_viewed_${cleanId}`;
    try {
      if (window.sessionStorage.getItem(sessionKey)) return;
      window.sessionStorage.setItem(sessionKey, '1');
    } catch {
      // Proceed cleanly
    }

    const storyRef = doc(db, 'analytics_stories', cleanId);
    void runTransaction(db, async (tx) => {
      const snap = await tx.get(storyRef);
      if (snap.exists()) {
        const current = Number(snap.data().views) || 0;
        tx.update(storyRef, {
          views: current + 1,
          updatedAt: serverTimestamp(),
        });
      } else {
        tx.set(storyRef, {
          storyId: cleanId,
          views: 1,
          updatedAt: serverTimestamp(),
        });
      }
    }).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.WRITE, `analytics_stories/${cleanId}`);
      } catch {
        // Non-blocking analytics failure
      }
    });
  }, []);

  return (
    <UserProgressContext.Provider
      value={{
        user,
        authReady,
        authBusy,
        authError,
        completedStoryIds,
        favoriteStoryIds,
        quizScores,
        gameBestScores,
        streakCount,
        lastReadDate,
        readerTheme,
        readerFontSize,
        savedWords,
        signInWithGoogle,
        signOutUser,
        markStoryComplete,
        toggleFavoriteStory,
        isStoryFavorited,
        recordQuizScore,
        updateGameBestScore,
        recordLearningActivity,
        setReaderTheme,
        setReaderFontSize,
        toggleSaveWord,
        isWordSaved,
        toggleMasteredWord,
        setWordMastered,
        addStarterWords,
        recordDailyVisit,
        recordStoryView,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

export function useUserProgress(): UserProgressContextValue {
  const ctx = useContext(UserProgressContext);
  if (!ctx) {
    throw new Error('useUserProgress must be used inside UserProgressProvider');
  }
  return ctx;
}
