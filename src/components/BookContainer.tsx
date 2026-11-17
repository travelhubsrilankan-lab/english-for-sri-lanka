import React, { useState, useEffect, useRef } from 'react';
import { Story, Chapter, VocabularyWord, StorySentence } from '../types/story';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronRight,
  Volume2,
  Gauge,
  ArrowLeft,
  BookMarked,
  Award,
  CheckCircle2,
  X,
  Languages,
  Share2,
  Check,
  Star,
  Mic,
  Sun,
  Moon,
  BookText,
} from 'lucide-react';
import { speechNarrator, soundEffects } from '../utils/audio';
import { VocabularyModal } from './VocabularyModal';
import { QuizModal } from './QuizModal';
import { SpeakingPracticeModal } from './SpeakingPracticeModal';
import { STORIES } from '../data/stories';
import { useUserProgress, ReaderTheme } from '../context/UserProgressContext';

interface BookContainerProps {
  story: Story;
  currentChapterNumber: number;
  onChapterChange: (newChapterNum: number) => void;
  onBackToStories: () => void;
}

interface FlatSentenceItem {
  sentence: StorySentence;
  chapterNumber: number;
  chapterTitleEn: string;
  chapterTitleSi: string;
  globalIndex: number;
}

export const BookContainer: React.FC<BookContainerProps> = ({
  story,
  currentChapterNumber,
  onChapterChange,
  onBackToStories,
}) => {
  const [readMode, setReadMode] = useState<'full' | 'parts'>('full');
  const [showSinhala, setShowSinhala] = useState<boolean>(true);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.85);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [inspectingWord, setInspectingWord] = useState<VocabularyWord | null>(null);
  const [isVocabModalOpen, setIsVocabModalOpen] = useState<boolean>(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [speakingSentence, setSpeakingSentence] = useState<StorySentence | null>(null);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  const {
    readerTheme,
    readerFontSize,
    setReaderTheme,
    setReaderFontSize,
    toggleSaveWord,
    isWordSaved,
    markStoryComplete,
    completedStoryIds,
    recordStoryView,
  } = useUserProgress();

  const isStoryCompleted = completedStoryIds.includes(story.id);

  const isPlayingRef = useRef<boolean>(false);
  const advanceTimerRef = useRef<number | null>(null);

  const currentChapter: Chapter =
    story.chapters.find((c) => c.chapterNumber === currentChapterNumber) || story.chapters[0];

  const activeSentenceItems: FlatSentenceItem[] =
    readMode === 'full'
      ? story.chapters
          .flatMap((chap) =>
            chap.sentences.map((sentence) => ({
              sentence,
              chapterNumber: chap.chapterNumber,
              chapterTitleEn: chap.titleEn,
              chapterTitleSi: chap.titleSi,
              globalIndex: 0,
            }))
          )
          .map((item, idx) => ({ ...item, globalIndex: idx }))
      : currentChapter.sentences.map((sentence, idx) => ({
          sentence,
          chapterNumber: currentChapter.chapterNumber,
          chapterTitleEn: currentChapter.titleEn,
          chapterTitleSi: currentChapter.titleSi,
          globalIndex: idx,
        }));

  const rawVocab: VocabularyWord[] =
    readMode === 'full'
      ? story.chapters.flatMap((c) => c.keyVocabulary)
      : currentChapter.keyVocabulary;
  const visibleVocabulary: VocabularyWord[] = Array.from(
    new Map(rawVocab.map((v) => [v.word.toLowerCase(), v])).values()
  );

  const clearPendingTimer = () => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  useEffect(() => {
    speechNarrator.rate = speechRate;
  }, [speechRate]);

  useEffect(() => {
    clearPendingTimer();
    isPlayingRef.current = false;
    setIsPlaying(false);
    setActiveSentenceIndex(0);
    setIsVoiceActive(false);
    setInspectingWord(null);
    speechNarrator.stop();
  }, [story.id, readMode, currentChapterNumber]);

  useEffect(() => {
    recordStoryView(story.id);
  }, [story.id, recordStoryView]);

  useEffect(() => {
    return () => {
      clearPendingTimer();
      isPlayingRef.current = false;
      speechNarrator.stop();
    };
  }, []);

  const playSentence = (index: number, autoContinue: boolean) => {
    clearPendingTimer();

    if (index >= activeSentenceItems.length) {
      setIsVoiceActive(false);
      if (readMode === 'parts' && currentChapterNumber < story.chapters.length) {
        soundEffects.playPageFlip();
        onChapterChange(currentChapterNumber + 1);
      } else {
        isPlayingRef.current = false;
        setIsPlaying(false);
        markStoryComplete(story.id);
        soundEffects.playCompletionChime();
      }
      return;
    }

    setActiveSentenceIndex(index);
    setIsVoiceActive(true);
    const target = activeSentenceItems[index].sentence;

    speechNarrator.speakText(target.englishText, {
      onEnd: () => {
        setIsVoiceActive(false);
        if (autoContinue && isPlayingRef.current) {
          advanceTimerRef.current = window.setTimeout(() => {
            if (isPlayingRef.current) {
              playSentence(index + 1, true);
            }
          }, 600);
        }
      },
    });
  };

  const handleTogglePlay = () => {
    soundEffects.playClick();
    if (isPlaying) {
      clearPendingTimer();
      isPlayingRef.current = false;
      setIsPlaying(false);
      setIsVoiceActive(false);
      speechNarrator.stop();
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      playSentence(activeSentenceIndex, true);
    }
  };

  const handlePrevSentence = () => {
    soundEffects.playClick();
    const prevIdx = Math.max(0, activeSentenceIndex - 1);
    playSentence(prevIdx, isPlayingRef.current);
  };

  const handleNextSentence = () => {
    soundEffects.playClick();
    const nextIdx = Math.min(activeSentenceItems.length - 1, activeSentenceIndex + 1);
    playSentence(nextIdx, isPlayingRef.current);
  };

  const handleWordClick = (vocab?: VocabularyWord) => {
    if (vocab) {
      soundEffects.playWordTap();
      setInspectingWord(vocab);
      speechNarrator.speakWord(vocab.word);
    }
  };

  const toggleSpeed = () => {
    soundEffects.playClick();
    setSpeechRate((prev) => (prev <= 0.85 ? 1.0 : 0.8));
  };

  const handleShareStory = async () => {
    soundEffects.playClick();
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${story.titleEn} – StoryGlow`,
          text: `${story.titleEn} (${story.titleSi}) - Read in English with Sinhala meanings on StoryGlow`,
          url: shareUrl,
        });
        return;
      }
    } catch {
      // Cancelled native share sheet or unsupported in embedded iframe; fallback to clipboard
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2200);
    } catch {
      // Ignore clipboard failures
    }
  };

  let runningGlobalIndex = 0;

  const enFontClasses = [
    'text-base sm:text-[17px]',
    'text-lg sm:text-[19px]',
    'text-xl sm:text-[22px]',
    'text-[22px] sm:text-[25px]',
  ];
  const siFontClasses = [
    'text-xs sm:text-[13px]',
    'text-sm',
    'text-base',
    'text-base sm:text-[17px]',
  ];
  const activeEnFont = enFontClasses[readerFontSize] || enFontClasses[1];
  const activeSiFont = siFontClasses[readerFontSize] || siFontClasses[1];

  const themePalette: Record<
    ReaderTheme,
    {
      sheet: string;
      borderSubtle: string;
      title: string;
      subtitle: string;
      meta: string;
      accent: string;
      cardIdle: string;
      cardActive: string;
      enText: string;
      siText: string;
      vocabWord: string;
      vocabBox: string;
      vocabTitle: string;
      vocabSi: string;
      comfortBar: string;
      comfortBtnIdle: string;
      speakBtn: string;
    }
  > = {
    night: {
      sheet: 'bg-[rgba(15,23,46,0.94)] border-[rgba(165,180,252,0.2)]',
      borderSubtle: 'border-[rgba(165,180,252,0.16)]',
      title: 'text-[#FFFFFF]',
      subtitle: 'text-[#CBD5E1]',
      meta: 'text-[#94A3B8]',
      accent: 'text-[#8CA8FF]',
      cardIdle:
        'bg-[rgba(18,27,54,0.85)] hover:bg-[#162142] border-[rgba(165,180,252,0.12)]',
      cardActive:
        'bg-[#17244A] border-[#6C7BFF] shadow-[0_0_24px_-6px_rgba(99,102,241,0.35)]',
      enText: 'text-[#F1F5F9]',
      siText: 'text-[#CBD5E1]',
      vocabWord: 'text-[#9CB8FF] decoration-[#657BFF] hover:text-[#FFFFFF]',
      vocabBox:
        'bg-[#121B36] border-[rgba(165,180,252,0.15)] hover:border-[rgba(108,123,255,0.6)]',
      vocabTitle: 'text-[#FFFFFF]',
      vocabSi: 'text-[#9CB8FF]',
      comfortBar: 'bg-[#0B1124] border-[rgba(165,180,252,0.16)]',
      comfortBtnIdle: 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[#182345]',
      speakBtn:
        'bg-[#1A264B] hover:bg-[#243566] text-[#9CB8FF] border border-[rgba(129,140,248,0.25)]',
    },
    light: {
      sheet: 'bg-[#F8FAFC] border-[#CBD5E1]',
      borderSubtle: 'border-[#CBD5E1]',
      title: 'text-[#0F172A]',
      subtitle: 'text-[#334155]',
      meta: 'text-[#475569]',
      accent: 'text-[#4338CA]',
      cardIdle: 'bg-[#FFFFFF] hover:bg-[#F1F5F9] border-[#E2E8F0]',
      cardActive:
        'bg-[#EEF2FF] border-[#4F46E5] shadow-[0_8px_24px_-8px_rgba(79,70,229,0.25)]',
      enText: 'text-[#0F172A]',
      siText: 'text-[#334155]',
      vocabWord: 'text-[#3730A3] decoration-[#4F46E5] hover:text-[#1E1B4B]',
      vocabBox: 'bg-[#FFFFFF] border-[#CBD5E1] hover:border-[#4F46E5]',
      vocabTitle: 'text-[#0F172A]',
      vocabSi: 'text-[#4338CA]',
      comfortBar: 'bg-[#E2E8F0] border-[#CBD5E1]',
      comfortBtnIdle: 'text-[#334155] hover:text-[#0F172A] hover:bg-[#CBD5E1]',
      speakBtn: 'bg-[#E0E7FF] hover:bg-[#C7D2FE] text-[#3730A3] border border-[#A5B4FC]',
    },
    sepia: {
      sheet: 'bg-[#F5EBD6] border-[#D6C3A0]',
      borderSubtle: 'border-[#D6C3A0]',
      title: 'text-[#2C1E12]',
      subtitle: 'text-[#4A3525]',
      meta: 'text-[#6E533E]',
      accent: 'text-[#8B4513]',
      cardIdle: 'bg-[#FAF3E3] hover:bg-[#F2E6CC] border-[#DFCFAF]',
      cardActive:
        'bg-[#EFE1C6] border-[#9A5B25] shadow-[0_8px_24px_-8px_rgba(139,69,19,0.2)]',
      enText: 'text-[#24170D]',
      siText: 'text-[#4A3525]',
      vocabWord: 'text-[#7C2D12] decoration-[#B45309] hover:text-[#451A03]',
      vocabBox: 'bg-[#FAF3E3] border-[#D6C3A0] hover:border-[#9A5B25]',
      vocabTitle: 'text-[#2C1E12]',
      vocabSi: 'text-[#8B4513]',
      comfortBar: 'bg-[#E9DBBF] border-[#D6C3A0]',
      comfortBtnIdle: 'text-[#4A3525] hover:text-[#2C1E12] hover:bg-[#DFCFAF]',
      speakBtn: 'bg-[#EEDEC0] hover:bg-[#E4CFA8] text-[#7C2D12] border border-[#C8AD82]',
    },
  };

  const t = themePalette[readerTheme];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      {/* Top Reader Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              clearPendingTimer();
              isPlayingRef.current = false;
              speechNarrator.stop();
              onBackToStories();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-[#8CA8FF]" />
            <span>පටුනට (Categories)</span>
          </button>

          <button
            type="button"
            onClick={handleShareStory}
            aria-label="Share story link"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              linkCopied
                ? 'bg-[rgba(16,185,129,0.16)] border-[rgba(52,211,153,0.45)] text-[#6EE7B7]'
                : 'bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#CBD5E1] hover:text-[#FFFFFF] border-[rgba(165,180,252,0.22)]'
            }`}
          >
            {linkCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#8CA8FF]" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-[rgba(13,20,41,0.92)] border border-[rgba(165,180,252,0.16)] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setReadMode('full');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                readMode === 'full'
                  ? 'bg-indigo-tab text-[#FFFFFF]'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
              }`}
            >
              තනි පිටුව (Full Story)
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setReadMode('parts');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                readMode === 'parts'
                  ? 'bg-indigo-tab text-[#FFFFFF]'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
              }`}
            >
              කොටස් 4 (Parts)
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setShowSinhala((prev) => !prev);
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              showSinhala
                ? 'bg-[#172347] border-[rgba(108,123,255,0.5)] text-[#AFC4FF]'
                : 'bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] border-[rgba(165,180,252,0.18)] text-[#CBD5E1]'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-[#8CA8FF]" />
            <span>{showSinhala ? 'සිංහල අර්ථ: පෙනේ' : 'සිංහල අර්ථ: සැඟවී'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setIsVocabModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <BookMarked className="w-3.5 h-3.5 text-[#8CA8FF]" />
            <span>වචන කෝෂය</span>
          </button>

          {story.quiz.length > 0 && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setIsQuizModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Award className="w-3.5 h-3.5" />
              <span>ප්‍රශ්න (Quiz)</span>
            </button>
          )}
        </div>
      </div>

      {/* Chapter Sub-Switcher when in Parts Mode */}
      {readMode === 'parts' && (
        <div className="w-full flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-1 bg-[rgba(13,20,41,0.92)] border border-[rgba(165,180,252,0.16)] p-1 rounded-xl">
            {story.chapters.map((chap) => {
              const isCurrent = chap.chapterNumber === currentChapterNumber;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playPageFlip();
                    onChapterChange(chap.chapterNumber);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                    isCurrent
                      ? 'bg-indigo-tab text-[#FFFFFF]'
                      : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
                  }`}
                >
                  0{chap.chapterNumber} කොටස
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reading Comfort & Theme Strip */}
      <div
        className={`w-full mb-4 px-4 py-2.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${t.comfortBar}`}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className={`font-semibold ${t.meta}`}>Text Size:</span>
          <div className="inline-flex items-center gap-1">
            <button
              type="button"
              disabled={readerFontSize <= 0}
              onClick={() => {
                soundEffects.playClick();
                setReaderFontSize(readerFontSize - 1);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold border border-transparent disabled:opacity-40 cursor-pointer ${t.comfortBtnIdle}`}
              title="Smaller text"
            >
              A-
            </button>
            <button
              type="button"
              disabled={readerFontSize >= 3}
              onClick={() => {
                soundEffects.playClick();
                setReaderFontSize(readerFontSize + 1);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold border border-transparent disabled:opacity-40 cursor-pointer ${t.comfortBtnIdle}`}
              title="Larger text"
            >
              A+
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className={`font-semibold mr-1 ${t.meta}`}>Theme:</span>
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setReaderTheme('night');
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
              readerTheme === 'night' ? 'bg-indigo-tab text-[#FFFFFF]' : t.comfortBtnIdle
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Night</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setReaderTheme('light');
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
              readerTheme === 'light' ? 'bg-indigo-tab text-[#FFFFFF]' : t.comfortBtnIdle
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setReaderTheme('sepia');
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
              readerTheme === 'sepia' ? 'bg-indigo-tab text-[#FFFFFF]' : t.comfortBtnIdle
            }`}
          >
            <BookText className="w-3.5 h-3.5" />
            <span>Sepia</span>
          </button>
        </div>
      </div>

      {/* Main Reader Storybook Sheet */}
      <article
        className={`w-full backdrop-blur-md rounded-3xl p-6 sm:p-9 border shadow-[0_24px_70px_-12px_rgba(0,0,0,0.45)] flex flex-col justify-between transition-colors ${t.sheet}`}
      >
        {/* Compact Story Title & Artwork Banner */}
        <header
          className={`pb-5 mb-6 border-b flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 ${t.borderSubtle}`}
        >
          {story.coverImage && (
            <div className="w-28 sm:w-32 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-[rgba(165,180,252,0.22)] bg-[#090F22] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.45)]">
              <img
                src={story.coverImage}
                alt={`${story.titleEn} - ${story.titleSi}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className={`flex flex-wrap items-center gap-2 text-xs font-medium mb-2 ${t.meta}`}>
              <span className={`font-semibold ${t.accent}`}>{story.categoryTitleEn}</span>
              <span aria-hidden="true">·</span>
              <span className="font-sinhala">{story.categoryTitleSi}</span>
              <span aria-hidden="true">·</span>
              <span>{story.level}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{story.estimatedMinutes} min read</span>
              {isStoryCompleted && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 font-sinhala font-bold text-[#10B981]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>කියවා අවසන්</span>
                  </span>
                </>
              )}
            </div>

            <h1 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${t.title}`}>
              {readMode === 'full' ? story.titleEn : currentChapter.titleEn}
            </h1>
            <p
              className={`text-sm sm:text-base font-sinhala font-medium mt-1 tracking-[0.01em] ${t.subtitle}`}
            >
              {readMode === 'full' ? story.titleSi : currentChapter.titleSi}
            </p>
          </div>
        </header>

        {/* Story Body */}
        {readMode === 'full' ? (
          <div className="space-y-8">
            {story.chapters.map((chapter) => (
              <section key={chapter.id} className="space-y-3.5">
                <div className={`flex items-center gap-2 text-xs border-b pb-2 ${t.meta} ${t.borderSubtle}`}>
                  <span className={`font-mono font-semibold tabular-nums ${t.accent}`}>
                    0{chapter.chapterNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className={`font-serif font-semibold ${t.subtitle}`}>{chapter.titleEn}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sinhala">{chapter.titleSi}</span>
                </div>

                <div className="space-y-3">
                  {chapter.sentences.map((sentence) => {
                    const globalIdx = runningGlobalIndex++;
                    const isActive = activeSentenceIndex === globalIdx;

                    return (
                      <div
                        key={sentence.id}
                        onClick={() => {
                          soundEffects.playClick();
                          playSentence(globalIdx, isPlayingRef.current);
                        }}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          isActive ? t.cardActive : t.cardIdle
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p
                            className={`flex-1 font-serif leading-relaxed tracking-[0.005em] ${activeEnFont} ${t.enText}`}
                          >
                            {sentence.words.map((w, wIdx) => {
                              const hasVocab = !!w.vocab;
                              return (
                                <span
                                  key={wIdx}
                                  onClick={(e) => {
                                    if (hasVocab) {
                                      e.stopPropagation();
                                      handleWordClick(w.vocab);
                                    }
                                  }}
                                  className={`inline-block mr-1.5 transition-colors ${
                                    hasVocab
                                      ? `font-medium underline decoration-2 underline-offset-4 cursor-pointer ${t.vocabWord}`
                                      : ''
                                  }`}
                                  title={
                                    hasVocab
                                      ? `සිංහල තේරුම: ${w.vocab?.sinhalaMeaning}`
                                      : undefined
                                  }
                                >
                                  {w.displayWord}
                                </span>
                              );
                            })}
                          </p>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundEffects.playClick();
                              setSpeakingSentence(sentence);
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold shrink-0 transition-colors cursor-pointer ${t.speakBtn}`}
                            title="Practice speaking this sentence"
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Speak</span>
                          </button>
                        </div>

                        {showSinhala && (
                          <p
                            className={`font-sinhala mt-2.5 leading-relaxed tracking-[0.01em] ${activeSiFont} ${t.siText}`}
                          >
                            {sentence.sinhalaTranslation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {currentChapter.sentences.map((sentence, sIdx) => {
              const isActive = activeSentenceIndex === sIdx;

              return (
                <div
                  key={sentence.id}
                  onClick={() => {
                    soundEffects.playClick();
                    playSentence(sIdx, isPlayingRef.current);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive ? t.cardActive : t.cardIdle
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p
                      className={`flex-1 font-serif leading-relaxed tracking-[0.005em] ${activeEnFont} ${t.enText}`}
                    >
                      {sentence.words.map((w, wIdx) => {
                        const hasVocab = !!w.vocab;
                        return (
                          <span
                            key={wIdx}
                            onClick={(e) => {
                              if (hasVocab) {
                                e.stopPropagation();
                                handleWordClick(w.vocab);
                              }
                            }}
                            className={`inline-block mr-1.5 transition-colors ${
                              hasVocab
                                ? `font-medium underline decoration-2 underline-offset-4 cursor-pointer ${t.vocabWord}`
                                : ''
                            }`}
                            title={
                              hasVocab ? `සිංහල තේරුම: ${w.vocab?.sinhalaMeaning}` : undefined
                            }
                          >
                            {w.displayWord}
                          </span>
                        );
                      })}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEffects.playClick();
                        setSpeakingSentence(sentence);
                      }}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold shrink-0 transition-colors cursor-pointer ${t.speakBtn}`}
                      title="Practice speaking this sentence"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Speak</span>
                    </button>
                  </div>

                  {showSinhala && (
                    <p
                      className={`font-sinhala mt-2.5 leading-relaxed tracking-[0.01em] ${activeSiFont} ${t.siText}`}
                    >
                      {sentence.sinhalaTranslation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Key Vocabulary Reference Section */}
        {visibleVocabulary.length > 0 && (
          <div className={`mt-8 pt-6 border-t ${t.borderSubtle}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h2 className={`text-xs font-bold font-sinhala ${t.subtitle}`}>
                ප්‍රධාන ඉංග්‍රීසි වචන ({visibleVocabulary.length})
              </h2>
              <span className={`text-xs font-sinhala ${t.meta}`}>
                ⭐ ඔබේ Wordbook එකට Save කිරීමට තරු සලකුණ ඔබන්න
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {visibleVocabulary.map((vocab) => {
                const saved = isWordSaved(vocab.word);
                return (
                  <div
                    key={vocab.word}
                    onClick={() => handleWordClick(vocab)}
                    className={`p-3 rounded-xl border text-left transition-colors flex items-center justify-between gap-2 cursor-pointer ${t.vocabBox}`}
                  >
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${t.vocabTitle}`}>{vocab.word}</p>
                      <p className={`text-xs font-sinhala font-medium truncate ${t.vocabSi}`}>
                        {vocab.sinhalaMeaning}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEffects.playClick();
                          toggleSaveWord(vocab, story.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-[rgba(251,191,36,0.18)] transition-colors cursor-pointer"
                        title={saved ? 'Remove from Wordbook' : 'Save to Wordbook'}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            saved ? 'fill-[#FBBF24] text-[#FBBF24]' : t.meta
                          }`}
                        />
                      </button>
                      <Volume2 className={`w-3.5 h-3.5 ${t.accent}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Action Row */}
        {readMode === 'parts' && currentChapterNumber < story.chapters.length ? (
          <div className={`mt-8 pt-5 border-t flex justify-end ${t.borderSubtle}`}>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPageFlip();
                onChapterChange(currentChapterNumber + 1);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] font-semibold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <span>ඊළඟ කොටස (Part 0{currentChapterNumber + 1})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            className={`mt-8 pt-5 border-t flex flex-wrap items-center justify-between gap-3 ${t.borderSubtle}`}
          >
            <button
              type="button"
              onClick={() => {
                soundEffects.playCompletionChime();
                markStoryComplete(story.id);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-sinhala transition-colors cursor-pointer ${
                isStoryCompleted
                  ? 'bg-[rgba(16,185,129,0.2)] border border-[rgba(52,211,153,0.45)] text-[#10B981]'
                  : 'bg-[#182242] hover:bg-[#1F2D57] border border-[rgba(165,180,252,0.22)] text-[#E2E8F0]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isStoryCompleted ? 'කියවා අවසන් (Completed ✔)' : 'කතාව අවසන් ලෙස සලකුණු කරන්න ✔'}
              </span>
            </button>

            <div className="flex items-center gap-2">
              {story.quiz.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setIsQuizModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-bold text-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>ප්‍රශ්නාවලිය කරන්න (Take Quiz)</span>
                </button>
              )}
              <button
                type="button"
                onClick={onBackToStories}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#182242] hover:bg-[#1E2B52] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>පටුනට යන්න</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </article>

      {/* Bottom Audio Narration Bar */}
      <div className="sticky bottom-4 w-full max-w-xl mt-5 px-4 py-2.5 rounded-2xl bg-[rgba(15,23,46,0.96)] backdrop-blur-md border border-[rgba(165,180,252,0.22)] shadow-[0_16px_45px_rgba(0,0,0,0.7)] text-[#F1F5F9] flex items-center justify-between gap-3">
        <div className="text-xs tabular-nums">
          <span className="font-bold text-[#9CB8FF]">{activeSentenceIndex + 1}</span>
          <span className="text-[#94A3B8]"> / {activeSentenceItems.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevSentence}
            disabled={activeSentenceIndex === 0}
            className="p-2 rounded-lg bg-[#182242] hover:bg-[#1F2C54] disabled:opacity-30 text-[#E2E8F0] transition-colors cursor-pointer"
            title="කලින් වැකිය (Previous Sentence)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#FFFFFF]" />}
            <span>{isPlaying ? 'නවත්වන්න' : 'අසන්න (Play)'}</span>

            {isVoiceActive && (
              <span className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 bg-[#FFFFFF] rounded-full animate-wave-1" />
                <span className="w-0.5 bg-[#FFFFFF] rounded-full animate-wave-2" />
                <span className="w-0.5 bg-[#FFFFFF] rounded-full animate-wave-3" />
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handleNextSentence}
            disabled={activeSentenceIndex === activeSentenceItems.length - 1}
            className="p-2 rounded-lg bg-[#182242] hover:bg-[#1F2C54] disabled:opacity-30 text-[#E2E8F0] transition-colors cursor-pointer"
            title="ඊළඟ වැකිය (Next Sentence)"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={toggleSpeed}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182242] hover:bg-[#1F2C54] text-[#E2E8F0] border border-[rgba(165,180,252,0.16)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          title="කියවීමේ වේගය"
        >
          <Gauge className="w-3.5 h-3.5 text-[#8CA8FF]" />
          <span>{speechRate <= 0.85 ? 'සෙමින්' : 'සාමාන්‍ය'}</span>
        </button>
      </div>

      {/* Floating Word Meaning Card */}
      {inspectingWord && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm p-4 rounded-2xl bg-[#101830] text-[#F1F5F9] shadow-2xl border border-[rgba(129,140,248,0.35)] flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-serif font-bold text-[#9CB8FF]">
                {inspectingWord.word}
              </h3>
              <span className="text-xs text-[#94A3B8] font-mono">
                {inspectingWord.phonetic}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  toggleSaveWord(inspectingWord, story.id);
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isWordSaved(inspectingWord.word)
                    ? 'bg-[rgba(251,191,36,0.18)] text-[#FCD34D] border border-[rgba(251,191,36,0.4)]'
                    : 'bg-[#1A264B] text-[#CBD5E1] hover:text-[#FFFFFF]'
                }`}
                title="Save word to My Wordbook"
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    isWordSaved(inspectingWord.word) ? 'fill-[#FBBF24] text-[#FBBF24]' : ''
                  }`}
                />
                <span>{isWordSaved(inspectingWord.word) ? 'Saved' : 'Save'}</span>
              </button>
              <button
                type="button"
                onClick={() => speechNarrator.speakWord(inspectingWord.word)}
                className="p-1.5 rounded-lg bg-[#1A264B] text-[#9CB8FF] hover:bg-[#233366] transition-colors cursor-pointer"
                title="නැවත අසන්න"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setInspectingWord(null)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
                aria-label="Close word definition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#172347] border border-[rgba(129,140,248,0.28)]">
            <p className="text-sm font-bold text-[#FFFFFF] font-sinhala">
              {inspectingWord.sinhalaMeaning}
            </p>
          </div>

          <p className="text-xs text-[#CBD5E1] leading-relaxed">
            {inspectingWord.englishDefinition}
          </p>
        </div>
      )}

      {/* Vocabulary, Quiz & Speaking Practice Modals */}
      <VocabularyModal
        isOpen={isVocabModalOpen}
        onClose={() => setIsVocabModalOpen(false)}
        stories={STORIES}
        currentStoryId={story.id}
      />

      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        story={story}
      />

      <SpeakingPracticeModal
        isOpen={!!speakingSentence}
        onClose={() => setSpeakingSentence(null)}
        sentenceText={speakingSentence?.englishText || ''}
        sinhalaTranslation={speakingSentence?.sinhalaTranslation}
      />
    </div>
  );
};
