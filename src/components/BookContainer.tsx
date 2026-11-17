import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Story, StorySentence, VocabularyWord } from '../types/story';
import { CATEGORIES } from '../data/categories';
import { STORIES } from '../data/stories';
import {
  LEVEL_META,
  extractStorySentences,
  getStoryVocabWords,
} from '../utils/storyHelpers';
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
  Lightbulb,
  Heart,
  Clock,
  FolderOpen,
} from 'lucide-react';
import { speechNarrator, soundEffects } from '../utils/audio';
import { VocabularyModal } from './VocabularyModal';
import { QuizModal } from './QuizModal';
import { SpeakingPracticeModal } from './SpeakingPracticeModal';
import { useUserProgress, ReaderTheme } from '../context/UserProgressContext';

interface BookContainerProps {
  story?: Story;
  onBackToStories: () => void;
}

export const BookContainer: React.FC<BookContainerProps> = ({
  story,
  onBackToStories,
}) => {
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
    toggleFavoriteStory,
    isStoryFavorited,
    recordStoryView,
  } = useUserProgress();

  const isPlayingRef = useRef<boolean>(false);
  const advanceTimerRef = useRef<number | null>(null);

  const sentences = useMemo(
    () => (story ? extractStorySentences(story) : []),
    [story]
  );

  const visibleVocabulary = useMemo(
    () => (story ? getStoryVocabWords(story) : []),
    [story]
  );

  const categoryInfo = useMemo(
    () => (story ? CATEGORIES.find((c) => c.id === story.categoryId) : undefined),
    [story]
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
  }, [story?.id]);

  useEffect(() => {
    if (story?.id) {
      recordStoryView(story.id);
    }
  }, [story?.id, recordStoryView]);

  useEffect(() => {
    return () => {
      clearPendingTimer();
      isPlayingRef.current = false;
      speechNarrator.stop();
    };
  }, []);

  if (!story) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-8 text-center shadow-[0_18px_48px_rgba(0,0,0,0.5)]">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#162140] text-[#8CA8FF] border border-[rgba(165,180,252,0.22)] flex items-center justify-center mb-4">
            <FolderOpen className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#FFFFFF]">
            <span lang="si" className="font-sinhala">
              කතා ඉක්මනින් එනවා
            </span>{' '}
            · Stories coming soon
          </h1>
          <p lang="si" className="mt-2 text-xs sm:text-sm font-sinhala text-[#94A3B8] max-w-md mx-auto">
            ඔබ සෙවූ කතාව දැනට පුස්තකාලයේ නොමැත. මුල් පිටුවට ගොස් කතා කාණ්ඩ බලන්න.
          </p>
          <button
            type="button"
            onClick={onBackToStories}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-semibold cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home / මුල් පිටුව</span>
          </button>
        </div>
      </div>
    );
  }

  const isStoryCompleted = completedStoryIds.includes(story.id);
  const isFavorited = isStoryFavorited(story.id);
  const levelInfo = LEVEL_META[story.level] || LEVEL_META.Beginner;
  const hasSinhalaParagraphs = Boolean(story.paragraphsSi && story.paragraphsSi.length > 0);

  const playSentence = (index: number, autoContinue: boolean) => {
    clearPendingTimer();

    if (sentences.length === 0) return;

    if (index >= sentences.length) {
      setIsVoiceActive(false);
      isPlayingRef.current = false;
      setIsPlaying(false);
      markStoryComplete(story.id);
      soundEffects.playCompletionChime();
      return;
    }

    setActiveSentenceIndex(index);
    setIsVoiceActive(true);
    const target = sentences[index];

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
    const nextIdx = Math.min(sentences.length - 1, activeSentenceIndex + 1);
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

  const handleSpeakMoral = () => {
    if (!story.moral) return;
    soundEffects.playClick();
    clearPendingTimer();
    isPlayingRef.current = false;
    setIsPlaying(false);
    setIsVoiceActive(true);
    speechNarrator.speakText(story.moral.messageEn, {
      onEnd: () => setIsVoiceActive(false),
    });
  };

  const handleShareStory = async () => {
    soundEffects.playClick();
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${story.title} – StoryGlow`,
          text: `${story.title} (${story.titleSi}) - Read in English with Sinhala meanings on StoryGlow`,
          url: shareUrl,
        });
        return;
      }
    } catch {
      // Cancelled native share or blocked in iframe; fall back to clipboard
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2200);
    } catch {
      // Ignore clipboard failures
    }
  };

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
      moralCard: string;
      moralBadge: string;
      moralAdviceBox: string;
      moralAdviceText: string;
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
      moralCard:
        'bg-[rgba(24,35,70,0.92)] border-[rgba(251,191,36,0.35)] shadow-[0_12px_32px_-12px_rgba(251,191,36,0.18)]',
      moralBadge:
        'bg-[rgba(251,191,36,0.14)] text-[#FCD34D] border border-[rgba(251,191,36,0.3)]',
      moralAdviceBox: 'bg-[rgba(15,23,46,0.75)] border-[rgba(165,180,252,0.16)]',
      moralAdviceText: 'text-[#E2E8F0]',
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
      moralCard:
        'bg-[#FFFBEB] border-[#FCD34D] shadow-[0_10px_28px_-10px_rgba(217,119,6,0.16)]',
      moralBadge: 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]',
      moralAdviceBox: 'bg-[#FFFFFF] border-[#FDE68A]',
      moralAdviceText: 'text-[#1E293B]',
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
      moralCard:
        'bg-[#EFE1C6] border-[#B45309] shadow-[0_10px_28px_-10px_rgba(139,69,19,0.18)]',
      moralBadge: 'bg-[#E5CFA3] text-[#78350F] border border-[#C8AD82]',
      moralAdviceBox: 'bg-[#FAF3E3] border-[#D6C3A0]',
      moralAdviceText: 'text-[#2C1E12]',
    },
  };

  const t = themePalette[readerTheme];

  return (
    <div className="w-full max-w-4xl mx-auto px-3.5 sm:px-6 py-5 sm:py-7 flex flex-col items-center">
      {/* Top Reader Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              clearPendingTimer();
              isPlayingRef.current = false;
              speechNarrator.stop();
              onBackToStories();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8CA8FF]" />
            <span>Home / <span lang="si" className="font-sinhala">මුල් පිටුව</span></span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              toggleFavoriteStory(story.id);
            }}
            aria-label={isFavorited ? 'Remove story from favorites' : 'Favorite this story'}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
              isFavorited
                ? 'bg-[rgba(159,18,57,0.75)] border-[rgba(251,113,133,0.65)] text-[#FFE4E6]'
                : 'bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#CBD5E1] hover:text-[#FFFFFF] border-[rgba(165,180,252,0.22)]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#FB7185] text-[#FB7185]' : 'text-[#FB7185]'}`} />
            <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            type="button"
            onClick={handleShareStory}
            aria-label="Share story link"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
              linkCopied
                ? 'bg-[rgba(16,185,129,0.16)] border-[rgba(52,211,153,0.45)] text-[#6EE7B7]'
                : 'bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#CBD5E1] hover:text-[#FFFFFF] border-[rgba(165,180,252,0.22)]'
            }`}
          >
            {linkCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span>Copied!</span>
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
          {hasSinhalaParagraphs && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setShowSinhala((prev) => !prev);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
                showSinhala
                  ? 'bg-[#172347] border-[rgba(108,123,255,0.5)] text-[#AFC4FF]'
                  : 'bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] border-[rgba(165,180,252,0.18)] text-[#CBD5E1]'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-[#8CA8FF]" />
              <span lang="si" className="font-sinhala">
                {showSinhala ? 'සිංහල: පෙනේ' : 'සිංහල: සැඟවී'}
              </span>
            </button>
          )}

          {visibleVocabulary.length > 0 && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setIsVocabModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
            >
              <BookMarked className="w-3.5 h-3.5 text-[#8CA8FF]" />
              <span lang="si" className="font-sinhala">
                වචන ({visibleVocabulary.length})
              </span>
            </button>
          )}

          {story.quiz.length > 0 && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setIsQuizModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[40px]"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Quiz · ප්‍රශ්න</span>
            </button>
          )}
        </div>
      </div>

      {/* Reading Comfort & Theme Strip */}
      <div
        className={`w-full mb-4 px-3.5 sm:px-4 py-2.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${t.comfortBar}`}
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
              className={`px-3 py-1.5 rounded-lg font-bold border border-transparent disabled:opacity-40 cursor-pointer min-h-[36px] ${t.comfortBtnIdle}`}
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
              className={`px-3 py-1.5 rounded-lg font-bold border border-transparent disabled:opacity-40 cursor-pointer min-h-[36px] ${t.comfortBtnIdle}`}
              title="Larger text"
            >
              A+
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 text-xs">
          <span className={`font-semibold mr-1 ${t.meta}`}>Theme:</span>
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setReaderTheme('night');
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors min-h-[36px] ${
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
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors min-h-[36px] ${
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
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors min-h-[36px] ${
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
        className={`w-full backdrop-blur-md rounded-3xl p-4 sm:p-8 border shadow-[0_24px_70px_-12px_rgba(0,0,0,0.45)] flex flex-col justify-between transition-colors ${t.sheet}`}
      >
        {/* Story Title & Metadata Banner */}
        <header
          className={`pb-5 mb-6 border-b flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 ${t.borderSubtle}`}
        >
          {story.coverImage && (
            <div className="w-full sm:w-36 aspect-[16/9] sm:aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-[rgba(165,180,252,0.22)] bg-[#090F22] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.45)]">
              <img
                src={story.coverImage}
                alt={`${story.title} - ${story.titleSi}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className={`flex flex-wrap items-center gap-2 text-xs font-medium mb-2.5 ${t.meta}`}>
              {categoryInfo && (
                <>
                  <span className={`font-semibold ${t.accent}`}>{categoryInfo.titleEn}</span>
                  <span aria-hidden="true">·</span>
                </>
              )}

              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg font-semibold ${levelInfo.badgeClass}`}>
                <span>{levelInfo.labelEn}</span>
                <span aria-hidden="true">·</span>
                <span lang="si" className="font-sinhala">
                  {levelInfo.labelSi}
                </span>
              </span>

              <span className="inline-flex items-center gap-1 tabular-nums">
                <Clock className="w-3.5 h-3.5" />
                <span>{story.readingMinutes} min read</span>
              </span>

              {story.hasAudio && (
                <span className="inline-flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audio</span>
                </span>
              )}

              {isStoryCompleted && (
                <span className="inline-flex items-center gap-1 font-bold text-[#10B981]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Finished ✔</span>
                </span>
              )}
            </div>

            <h1 className={`text-xl sm:text-3xl font-serif font-bold tracking-tight ${t.title}`}>
              {story.title}
            </h1>
            <p
              lang="si"
              className={`text-sm sm:text-base font-sinhala font-medium mt-1 tracking-[0.01em] ${t.subtitle}`}
            >
              {story.titleSi}
            </p>
            <p lang="si" className={`text-xs font-sinhala mt-2 leading-relaxed ${t.meta}`}>
              {story.summarySi}
            </p>
          </div>
        </header>

        {/* Interactive Clickable Sentences Body */}
        <div className="space-y-3">
          {sentences.map((sentence, sIdx) => {
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
                <div className="flex items-start justify-between gap-2.5 sm:gap-3">
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
                    className={`inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer min-h-[36px] ${t.speakBtn}`}
                    title="Practice speaking this sentence"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Speak</span>
                  </button>
                </div>

                {showSinhala && sentence.sinhalaTranslation && (
                  <p
                    lang="si"
                    className={`font-sinhala mt-2.5 leading-relaxed tracking-[0.01em] ${activeSiFont} ${t.siText}`}
                  >
                    {sentence.sinhalaTranslation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Optional Story Ending Moral Card */}
        {story.moral && (
          <section
            aria-label="Story message and life advice"
            className={`mt-8 p-5 sm:p-6 rounded-2xl border transition-colors ${t.moralCard}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-sinhala ${t.moralBadge}`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span lang="si">කතාවෙන් ගත හැකි පණිවිඩය · Story Moral</span>
              </div>

              <button
                type="button"
                onClick={handleSpeakMoral}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${t.speakBtn}`}
                title="Listen to the story moral in English"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>

            <p className={`font-serif font-semibold leading-relaxed ${activeEnFont} ${t.enText}`}>
              &ldquo;{story.moral.messageEn}&rdquo;
            </p>

            <p
              lang="si"
              className={`font-sinhala font-medium mt-2 leading-relaxed ${activeSiFont} ${t.siText}`}
            >
              {story.moral.messageSi}
            </p>

            <div className={`mt-4 p-3.5 sm:p-4 rounded-xl border ${t.moralAdviceBox}`}>
              <p lang="si" className={`text-xs font-bold font-sinhala mb-1 ${t.accent}`}>
                ජීවිතයට වටිනා උපදේශය (Practical Advice)
              </p>
              <p lang="si" className={`font-sinhala leading-relaxed ${activeSiFont} ${t.moralAdviceText}`}>
                {story.moral.adviceSi}
              </p>
            </div>
          </section>
        )}

        {/* Key Vocabulary Reference Section */}
        {visibleVocabulary.length > 0 && (
          <div className={`mt-8 pt-6 border-t ${t.borderSubtle}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h2 lang="si" className={`text-xs font-bold font-sinhala ${t.subtitle}`}>
                ප්‍රධාන ඉංග්‍රීසි වචන ({visibleVocabulary.length})
              </h2>
              <span lang="si" className={`text-xs font-sinhala ${t.meta}`}>
                ⭐ My Words වෙත Save කිරීමට තරු සලකුණ ඔබන්න
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
                      <p lang="si" className={`text-xs font-sinhala font-medium truncate ${t.vocabSi}`}>
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
                        className="p-2 rounded-lg hover:bg-[rgba(251,191,36,0.18)] transition-colors cursor-pointer"
                        title={saved ? 'Remove from My Words' : 'Save to My Words'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            saved ? 'fill-[#FBBF24] text-[#FBBF24]' : t.meta
                          }`}
                        />
                      </button>
                      <Volume2 className={`w-4 h-4 ${t.accent}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Completion & Navigation Row */}
        <div
          className={`mt-8 pt-5 border-t flex flex-wrap items-center justify-between gap-3 ${t.borderSubtle}`}
        >
          <button
            type="button"
            onClick={() => {
              soundEffects.playCompletionChime();
              markStoryComplete(story.id);
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold font-sinhala transition-colors cursor-pointer min-h-[42px] ${
              isStoryCompleted
                ? 'bg-[rgba(16,185,129,0.2)] border border-[rgba(52,211,153,0.45)] text-[#10B981]'
                : 'bg-[#182242] hover:bg-[#1F2D57] border border-[rgba(165,180,252,0.22)] text-[#E2E8F0]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span lang="si">
              {isStoryCompleted ? 'කියවා අවසන් (Finished ✔)' : 'කතාව අවසන් ලෙස සලකුණු කරන්න ✔'}
            </span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {story.quiz.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setIsQuizModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] font-bold text-xs transition-all cursor-pointer whitespace-nowrap min-h-[42px]"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Take Quiz · ප්‍රශ්නාවලිය</span>
              </button>
            )}
            <button
              type="button"
              onClick={onBackToStories}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#182242] hover:bg-[#1E2B52] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap min-h-[42px]"
            >
              <span>Home / මුල් පිටුව</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      {/* Bottom Audio Narration Bar */}
      {story.hasAudio && sentences.length > 0 && (
        <div className="sticky bottom-3 w-full max-w-xl mt-5 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-[rgba(15,23,46,0.96)] backdrop-blur-md border border-[rgba(165,180,252,0.22)] shadow-[0_16px_45px_rgba(0,0,0,0.7)] text-[#F1F5F9] flex items-center justify-between gap-2 sm:gap-3">
          <div className="text-xs tabular-nums">
            <span className="font-bold text-[#9CB8FF]">{activeSentenceIndex + 1}</span>
            <span className="text-[#94A3B8]"> / {sentences.length}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handlePrevSentence}
              disabled={activeSentenceIndex === 0}
              className="p-2.5 rounded-lg bg-[#182242] hover:bg-[#1F2C54] disabled:opacity-30 text-[#E2E8F0] transition-colors cursor-pointer"
              title="Previous Sentence"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleTogglePlay}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap min-h-[40px]"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#FFFFFF]" />}
              <span lang="si" className="font-sinhala">
                {isPlaying ? 'නවත්වන්න' : 'අසන්න'}
              </span>

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
              disabled={activeSentenceIndex === sentences.length - 1}
              className="p-2.5 rounded-lg bg-[#182242] hover:bg-[#1F2C54] disabled:opacity-30 text-[#E2E8F0] transition-colors cursor-pointer"
              title="Next Sentence"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={toggleSpeed}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-lg bg-[#182242] hover:bg-[#1F2C54] text-[#E2E8F0] border border-[rgba(165,180,252,0.16)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[38px]"
            title="Speech speed"
          >
            <Gauge className="w-3.5 h-3.5 text-[#8CA8FF]" />
            <span lang="si" className="font-sinhala">
              {speechRate <= 0.85 ? 'සෙමින්' : 'සාමාන්‍ය'}
            </span>
          </button>
        </div>
      )}

      {/* Floating Word Meaning Popup with "Save to My Words" Button */}
      {inspectingWord && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md p-4 rounded-2xl bg-[#101830] text-[#F1F5F9] shadow-2xl border border-[rgba(129,140,248,0.4)] flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#9CB8FF]">
                {inspectingWord.word}
              </h3>
              {inspectingWord.phonetic && (
                <span className="text-xs text-[#94A3B8] font-mono">
                  {inspectingWord.phonetic}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => speechNarrator.speakWord(inspectingWord.word)}
                className="p-2 rounded-lg bg-[#1A264B] text-[#9CB8FF] hover:bg-[#233366] transition-colors cursor-pointer"
                title="Listen pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setInspectingWord(null)}
                className="p-2 rounded-lg text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
                aria-label="Close word definition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#172347] border border-[rgba(129,140,248,0.28)]">
            <p lang="si" className="text-sm font-bold text-[#FFFFFF] font-sinhala">
              {inspectingWord.sinhalaMeaning}
            </p>
          </div>

          {inspectingWord.example && (
            <p className="text-xs text-[#CBD5E1] leading-relaxed italic">
              &ldquo;{inspectingWord.example}&rdquo;
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              toggleSaveWord(inspectingWord, story.id);
            }}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer min-h-[42px] ${
              isWordSaved(inspectingWord.word)
                ? 'bg-[rgba(251,191,36,0.18)] text-[#FCD34D] border border-[rgba(251,191,36,0.45)]'
                : 'bg-indigo-cta text-[#FFFFFF]'
            }`}
          >
            <Star
              className={`w-4 h-4 ${
                isWordSaved(inspectingWord.word) ? 'fill-[#FBBF24] text-[#FBBF24]' : ''
              }`}
            />
            <span>
              {isWordSaved(inspectingWord.word)
                ? 'Saved to My Words ✔'
                : 'Save to My Words'}
            </span>
          </button>
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
