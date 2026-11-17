import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VocabularyWord } from '../../types/story';
import { soundEffects, speechNarrator } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Zap,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Flame,
} from 'lucide-react';

interface SpeedSpellGameProps {
  vocabPool: VocabularyWord[];
  storyLabel: string;
  onSaveBestScore: (score: number) => void;
}

type GameState = 'TITLE_MENU' | 'PLAYING' | 'ROUND_SUMMARY';

interface SpellWordQuestion {
  vocab: VocabularyWord;
  letterBank: string[];
}

function shuffleLetters(word: string): string[] {
  const letters = word.toUpperCase().split('');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const distractorsCount = letters.length <= 6 ? 2 : 1;
  for (let i = 0; i < distractorsCount; i++) {
    const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
    letters.push(randomChar);
  }
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

export const SpeedSpellGame: React.FC<SpeedSpellGameProps> = ({
  vocabPool,
  storyLabel,
  onSaveBestScore,
}) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [questions, setQuestions] = useState<SpellWordQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [letterBankRemaining, setLetterBankRemaining] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [wordsSolved, setWordsSolved] = useState<number>(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [solvedVocabHistory, setSolvedVocabHistory] = useState<VocabularyWord[]>([]);

  const scoreRef = useRef<number>(0);
  const advanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    setGameState('TITLE_MENU');
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    speechNarrator.stop();
  }, [storyLabel]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current !== null) {
        window.clearTimeout(advanceTimerRef.current);
      }
      speechNarrator.stop();
    };
  }, []);

  const setupQuestion = useCallback(
    (q: SpellWordQuestion) => {
      setTypedLetters([]);
      setLetterBankRemaining([...q.letterBank]);
      setFeedback('idle');
      if (voiceEnabled) {
        speechNarrator.speakWord(q.vocab.word);
      }
    },
    [voiceEnabled]
  );

  const endGame = useCallback(
    (finalScore?: number) => {
      if (advanceTimerRef.current !== null) {
        window.clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = null;
      }
      const total = finalScore ?? scoreRef.current;
      soundEffects.playCompletionChime();
      setGameState('ROUND_SUMMARY');
      onSaveBestScore(total);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
    },
    [onSaveBestScore]
  );

  const startNewGame = () => {
    soundEffects.playClick();
    if (vocabPool.length === 0) return;

    const shuffled = [...vocabPool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 15).map((vocab) => ({
      vocab,
      letterBank: shuffleLetters(vocab.word),
    }));

    scoreRef.current = 0;
    setQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setWordsSolved(0);
    setSolvedVocabHistory([]);
    setFeedback('idle');
    setTimeLeft(45);
    setGameState('PLAYING');

    setupQuestion(selected[0]);
  };

  // Clean 1-second timer countdown
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const id = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'PLAYING' && timeLeft === 0) {
      endGame();
    }
  }, [gameState, timeLeft, endGame]);

  const currentQ = questions[currentIndex];

  const advanceNextWord = useCallback(
    (latestScore: number) => {
      const nextIdx = currentIndex + 1;
      if (nextIdx >= questions.length) {
        endGame(latestScore);
      } else {
        setCurrentIndex(nextIdx);
        setupQuestion(questions[nextIdx]);
      }
    },
    [currentIndex, questions, endGame, setupQuestion]
  );

  const handlePickLetter = useCallback(
    (letter: string, indexInRemaining: number) => {
      if (feedback !== 'idle' || !currentQ) return;
      soundEffects.playClick();

      const newTyped = [...typedLetters, letter];
      const newRemaining = [...letterBankRemaining];
      newRemaining.splice(indexInRemaining, 1);

      setTypedLetters(newTyped);
      setLetterBankRemaining(newRemaining);

      const targetWord = currentQ.vocab.word.toUpperCase();
      if (newTyped.length === targetWord.length) {
        const spelled = newTyped.join('');
        if (spelled === targetWord) {
          soundEffects.playWordTap();
          setFeedback('correct');
          const points = 100 + (streak + 1) * 20;
          const newScore = score + points;
          const newStreak = streak + 1;
          scoreRef.current = newScore;
          setScore(newScore);
          setStreak(newStreak);
          setBestStreak((prev) => Math.max(prev, newStreak));
          setWordsSolved((prev) => prev + 1);
          setSolvedVocabHistory((prev) => [currentQ.vocab, ...prev]);

          setTimeLeft((prev) => Math.min(60, prev + 3));

          advanceTimerRef.current = window.setTimeout(() => {
            advanceNextWord(newScore);
          }, 650);
        } else {
          soundEffects.playClick();
          setFeedback('wrong');
          setStreak(0);
          advanceTimerRef.current = window.setTimeout(() => {
            setTypedLetters([]);
            setLetterBankRemaining([...currentQ.letterBank]);
            setFeedback('idle');
          }, 700);
        }
      }
    },
    [feedback, currentQ, typedLetters, letterBankRemaining, streak, score, advanceNextWord]
  );

  const handleBackspace = useCallback(() => {
    if (typedLetters.length === 0 || feedback !== 'idle') return;
    soundEffects.playClick();
    const removedLetter = typedLetters[typedLetters.length - 1];
    setTypedLetters((prev) => prev.slice(0, -1));
    setLetterBankRemaining((prev) => [...prev, removedLetter]);
  }, [typedLetters, feedback]);

  const handleSkip = () => {
    soundEffects.playClick();
    setStreak(0);
    const nextIdx = currentIndex + 1;
    if (nextIdx >= questions.length) {
      endGame();
    } else {
      setCurrentIndex(nextIdx);
      setupQuestion(questions[nextIdx]);
    }
  };

  useEffect(() => {
    if (gameState !== 'PLAYING' || !currentQ || feedback !== 'idle') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        const char = e.key.toUpperCase();
        const foundIdx = letterBankRemaining.indexOf(char);
        if (foundIdx !== -1) {
          e.preventDefault();
          handlePickLetter(char, foundIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, letterBankRemaining, feedback, currentQ, handleBackspace, handlePickLetter]);

  return (
    <div className="w-full bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* TITLE MENU */}
      {gameState === 'TITLE_MENU' && (
        <div className="max-w-xl mx-auto text-center py-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1C2852] border border-[rgba(129,140,248,0.3)] text-[#8CA8FF] flex items-center justify-center mb-4">
            <Zap className="w-7 h-7 text-[#F59E0B]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182348] border border-[rgba(165,180,252,0.2)] text-xs text-[#8CA8FF] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Fast Spelling Game</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF] tracking-tight">
            Speed Spell
          </h2>
          <p className="mt-2 text-sm text-[#CBD5E1] leading-relaxed">
            Spell as many words as you can in 45 seconds. Tap the letters or type on your keyboard. Every right word gives +3 seconds! Sinhala meanings appear after you solve.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[#94A3B8] tabular-nums">
            <span>Story: {storyLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{vocabPool.length} Words</span>
          </div>

          <button
            type="button"
            onClick={startNewGame}
            className="mt-7 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-indigo-cta text-[#FFFFFF] text-sm font-bold shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-[#FFFFFF]" />
            <span>Start Game</span>
          </button>
        </div>
      )}

      {/* PLAYING ARENA */}
      {gameState === 'PLAYING' && currentQ && (
        <div className="max-w-2xl mx-auto">
          {/* Top Score & Timer Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[rgba(165,180,252,0.14)]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#182348] border border-[rgba(165,180,252,0.2)] text-xs font-bold text-[#F59E0B] tabular-nums">
                <Flame className="w-4 h-4 text-[#F59E0B]" />
                <span>Streak {streak}x</span>
              </div>
              <div className="text-xs text-[#CBD5E1] tabular-nums">
                Score: <span className="font-bold text-[#FFFFFF]">{score}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl border text-sm font-bold tabular-nums transition-colors ${
                  timeLeft <= 10
                    ? 'bg-[#451212] border-[#EF4444] text-[#FCA5A5]'
                    : 'bg-[#182348] border-[rgba(165,180,252,0.2)] text-[#8CA8FF]'
                }`}
              >
                <span>{timeLeft}s</span>
              </div>

              <button
                type="button"
                onClick={() => setVoiceEnabled((prev) => !prev)}
                className="p-2 rounded-lg bg-[#182348] text-[#CBD5E1] hover:text-[#FFFFFF] cursor-pointer"
                title="Sound On or Off"
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Word Clue Box (Strictly English Only Before Solving) */}
          <div className="p-5 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2 text-xs text-[#8CA8FF]">
              <span className="font-mono font-bold uppercase tracking-wider">
                {currentQ.vocab.partOfSpeech || 'Word'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{currentQ.vocab.word.length} Letters</span>
            </div>

            <p className="text-base sm:text-lg font-serif text-[#F1F5F9] leading-relaxed">
              "{currentQ.vocab.englishDefinition}"
            </p>

            <button
              type="button"
              onClick={() => speechNarrator.speakWord(currentQ.vocab.word)}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C2A54] hover:bg-[#25366D] text-xs text-[#8CA8FF] font-semibold transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Hear Word</span>
            </button>
          </div>

          {/* Letter Slots */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 min-h-[58px]">
            {Array.from({ length: currentQ.vocab.word.length }).map((_, idx) => {
              const letter = typedLetters[idx];
              const isFilled = letter !== undefined;

              return (
                <div
                  key={idx}
                  className={`w-11 h-12 sm:w-12 sm:h-14 rounded-xl border flex items-center justify-center font-mono text-xl sm:text-2xl font-bold transition-all ${
                    isFilled
                      ? feedback === 'correct'
                        ? 'bg-[#064E3B] border-[#10B981] text-[#A7F3D0] shadow-[0_0_16px_rgba(16,185,129,0.4)]'
                        : feedback === 'wrong'
                        ? 'bg-[#4C1D1D] border-[#EF4444] text-[#FECACA]'
                        : 'bg-[#1E2B54] border-[#6C7BFF] text-[#FFFFFF]'
                      : 'bg-[#0F172E] border-[rgba(165,180,252,0.2)] text-[#475569]'
                  }`}
                >
                  {letter || ''}
                </div>
              );
            })}
          </div>

          {/* Letter Bank */}
          <div className="p-4 rounded-2xl bg-[#0D152C] border border-[rgba(165,180,252,0.14)] mb-5">
            <div className="text-center text-xs text-[#94A3B8] mb-3">
              Tap or type letters:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {letterBankRemaining.map((letter, idx) => (
                <button
                  key={`${letter}-${idx}`}
                  type="button"
                  onClick={() => handlePickLetter(letter, idx)}
                  className="w-10 h-11 sm:w-11 sm:h-12 rounded-xl bg-[#1B274F] hover:bg-[#25366D] active:bg-[#324891] border border-[rgba(165,180,252,0.24)] text-[#FFFFFF] font-mono text-base sm:text-lg font-bold transition-all shadow-md cursor-pointer flex items-center justify-center"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Controls: Delete & Skip */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBackspace}
              disabled={typedLetters.length === 0}
              className="px-4 py-2 rounded-xl bg-[#182348] hover:bg-[#1E2B52] disabled:opacity-40 text-xs text-[#CBD5E1] border border-[rgba(165,180,252,0.18)] font-semibold cursor-pointer"
            >
              ⌫ Delete
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="px-4 py-2 rounded-xl bg-[#182348] hover:bg-[#1E2B52] text-xs text-[#94A3B8] hover:text-[#CBD5E1] border border-[rgba(165,180,252,0.18)] cursor-pointer"
            >
              Skip →
            </button>
          </div>

          {/* Solved Words Ribbon (Reveals Sinhala Meaning ONLY after solving) */}
          {solvedVocabHistory.length > 0 && (
            <div className="mt-7 pt-5 border-t border-[rgba(165,180,252,0.14)]">
              <div className="text-xs text-[#94A3B8] mb-2">Words you spelled:</div>
              <div className="flex flex-wrap gap-2">
                {solvedVocabHistory.slice(0, 5).map((v) => (
                  <span
                    key={v.word}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0F2D3A] border border-[rgba(45,212,191,0.3)] text-xs text-[#5EEAD4]"
                  >
                    <span className="font-bold text-[#FFFFFF]">{v.word}</span>
                    <span className="text-[#94A3B8]">·</span>
                    <span className="font-sinhala text-[#A7F3D0]">{v.sinhalaMeaning}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ROUND SUMMARY */}
      {gameState === 'ROUND_SUMMARY' && (
        <div className="max-w-xl mx-auto text-center py-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#1C2852] border border-[rgba(129,140,248,0.3)] text-[#F59E0B] flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF] tracking-tight">
            Time Is Up!
          </h2>
          <p className="mt-1 text-sm text-[#CBD5E1]">
            Great job! Here is your score:
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#121B36] border border-[rgba(165,180,252,0.15)]">
              <div className="text-xs text-[#94A3B8]">Score</div>
              <div className="text-xl font-bold text-[#8CA8FF] mt-1 tabular-nums">{score}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#121B36] border border-[rgba(165,180,252,0.15)]">
              <div className="text-xs text-[#94A3B8]">Words Right</div>
              <div className="text-xl font-bold text-[#34D399] mt-1 tabular-nums">{wordsSolved}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#121B36] border border-[rgba(165,180,252,0.15)]">
              <div className="text-xs text-[#94A3B8]">Best Streak</div>
              <div className="text-xl font-bold text-[#F59E0B] mt-1 tabular-nums">{bestStreak}x</div>
            </div>
          </div>

          {/* Solved Words Review with Sinhala Meanings */}
          {solvedVocabHistory.length > 0 && (
            <div className="mt-6 text-left p-4 rounded-2xl bg-[#101830] border border-[rgba(165,180,252,0.14)]">
              <div className="text-xs font-bold text-[#CBD5E1] mb-2.5">
                Words & Sinhala Meanings:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {solvedVocabHistory.map((v) => (
                  <div
                    key={v.word}
                    className="p-2.5 rounded-xl bg-[#162142] border border-[rgba(165,180,252,0.12)] flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#FFFFFF]">{v.word}</div>
                      <div className="text-xs font-sinhala text-[#8CA8FF]">
                        {v.sinhalaMeaning}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speechNarrator.speakWord(v.word)}
                      className="p-1 rounded bg-[#1C2A54] text-[#9CB8FF] hover:text-[#FFFFFF] cursor-pointer"
                      aria-label={`Listen to ${v.word}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={startNewGame}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
