import React, { useState, useMemo } from 'react';
import {
  Star,
  Volume2,
  Search,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Trash2,
  Layers,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { useUserProgress } from '../context/UserProgressContext';
import { STORIES } from '../data/stories';
import { VocabularyWord } from '../types/story';
import { getStoryVocabWords } from '../utils/storyHelpers';
import { speechNarrator, soundEffects } from '../utils/audio';

interface WordbookPageProps {
  onBackToStories: () => void;
  onSelectStory: (storyId: string) => void;
}

export const WordbookPage: React.FC<WordbookPageProps> = ({
  onBackToStories,
  onSelectStory,
}) => {
  const {
    user,
    savedWords,
    toggleSaveWord,
    setWordMastered,
    addStarterWords,
    recordLearningActivity,
    signInWithGoogle,
  } = useUserProgress();

  const [activeTab, setActiveTab] = useState<'list' | 'flashcards'>('list');
  const [statusFilter, setStatusFilter] = useState<'all' | 'learning' | 'mastered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredWords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return savedWords.filter((item) => {
      if (statusFilter === 'learning' && item.mastered) return false;
      if (statusFilter === 'mastered' && !item.mastered) return false;
      if (!q) return true;
      return (
        item.word.toLowerCase().includes(q) ||
        item.sinhalaMeaning.toLowerCase().includes(q) ||
        (item.example || item.englishDefinition || '').toLowerCase().includes(q)
      );
    });
  }, [savedWords, statusFilter, searchQuery]);

  const safeCardIndex =
    filteredWords.length > 0 ? Math.min(cardIndex, filteredWords.length - 1) : 0;
  const activeCard = filteredWords[safeCardIndex] || null;

  const masteredCount = savedWords.filter((w) => w.mastered).length;
  const learningCount = savedWords.length - masteredCount;

  const handleLoadStarterWords = () => {
    soundEffects.playCompletionChime();
    const starterPool: Array<{ vocab: VocabularyWord; storyId: string }> = [];
    for (const story of STORIES.slice(0, 4)) {
      const words = getStoryVocabWords(story).slice(0, 3);
      for (const vocab of words) {
        starterPool.push({ vocab, storyId: story.id });
      }
    }
    if (starterPool.length > 0) {
      addStarterWords(starterPool);
      recordLearningActivity();
    }
  };

  const getStoryInfo = (storyId: string): { title: string; titleSi: string } | null => {
    const found = STORIES.find((s) => s.id === storyId);
    return found ? { title: found.title, titleSi: found.titleSi } : null;
  };

  const advanceFlashcard = () => {
    setIsFlipped(false);
    if (filteredWords.length <= 1) return;
    if (safeCardIndex < filteredWords.length - 1) {
      setCardIndex(safeCardIndex + 1);
    } else {
      setCardIndex(0);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10 overflow-x-hidden">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5">
        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            onBackToStories();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4 text-[#8CA8FF]" />
          <span>Home / <span lang="si" className="font-sinhala">මුල් පිටුව</span></span>
        </button>

        {!user && (
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              void signInWithGoogle();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#152042] hover:bg-[#1C2B57] text-[#9CB8FF] border border-[rgba(129,140,248,0.35)] text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sign in to Sync Cloud</span>
          </button>
        )}
      </div>

      {/* Header */}
      <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.2)] p-5 sm:p-8 shadow-[0_18px_48px_rgba(0,0,0,0.5)] mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#8CA8FF] mb-1.5">
              <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
              <span>Personal Vocabulary Notebook</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#FFFFFF]">
              My Words ·{' '}
              <span lang="si" className="font-sinhala text-indigo-gradient">
                මගේ වචන
              </span>
            </h1>
            <p lang="si" className="mt-1.5 text-xs sm:text-sm font-sinhala text-[#CBD5E1] leading-relaxed">
              කතා කියවන විට Save කළ වචන සහ ඒවායේ සිංහල තේරුම් මෙහිදී Flashcards මඟින් පුහුණු වන්න.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-xs tabular-nums shrink-0">
            <div className="px-3 sm:px-4 py-2.5 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] text-center">
              <p className="text-base sm:text-lg font-bold text-[#FFFFFF]">{savedWords.length}</p>
              <p className="text-[#94A3B8]">Saved</p>
            </div>
            <div className="px-3 sm:px-4 py-2.5 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] text-center">
              <p className="text-base sm:text-lg font-bold text-[#9CB8FF]">{learningCount}</p>
              <p className="text-[#94A3B8]">Review</p>
            </div>
            <div className="px-3 sm:px-4 py-2.5 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] text-center">
              <p className="text-base sm:text-lg font-bold text-[#6EE7B7]">{masteredCount}</p>
              <p className="text-[#94A3B8]">Known</p>
            </div>
          </div>
        </div>

        {/* Mode & Status Filter Bar */}
        <div className="mt-6 pt-5 border-t border-[rgba(165,180,252,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#0B1124] rounded-xl border border-[rgba(165,180,252,0.16)] self-start overflow-x-auto no-scrollbar max-w-full">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('list');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap min-h-[38px] ${
                activeTab === 'list'
                  ? 'bg-indigo-tab text-[#FFFFFF]'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Word List ({filteredWords.length})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('flashcards');
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap min-h-[38px] ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-tab text-[#FFFFFF]'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flashcards Mode</span>
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#0B1124] rounded-xl border border-[rgba(165,180,252,0.16)] text-xs self-start sm:self-auto">
            {([
              { id: 'all', label: 'All' },
              { id: 'learning', label: 'Review again' },
              { id: 'mastered', label: 'I know it' },
            ] as const).map((filterItem) => (
              <button
                key={filterItem.id}
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setStatusFilter(filterItem.id);
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[36px] ${
                  statusFilter === filterItem.id
                    ? 'bg-[#5B6CFF] text-[#FFFFFF]'
                    : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
                }`}
              >
                {filterItem.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {savedWords.length === 0 ? (
        <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] py-12 px-5 sm:px-6 text-center shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] flex items-center justify-center text-[#FBBF24] mb-4">
            <Star className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#FFFFFF]">
            No Saved Words Yet
          </h2>
          <p lang="si" className="mt-2 text-xs sm:text-sm font-sinhala text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
            කතාවක් කියවන විට වචනයක් මත ක්ලික් කර <strong>Save to My Words</strong> බොත්තම ඔබන්න. ඔබ Save කළ සියලු වචන Flashcards ලෙස මෙහිදී පුහුණු විය හැක.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {STORIES.length > 0 && (
              <button
                type="button"
                onClick={handleLoadStarterWords}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold cursor-pointer min-h-[44px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Add Starter Words</span>
              </button>
            )}
            <button
              type="button"
              onClick={onBackToStories}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#182242] hover:bg-[#1F2D57] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold cursor-pointer min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 text-[#8CA8FF]" />
              <span>Browse Library · කතා පුස්තකාලයට</span>
            </button>
          </div>
        </div>
      ) : activeTab === 'list' ? (
        <div className="space-y-4">
          {/* Search Saved Words */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your saved words or සිංහල තේරුම්..."
              className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[rgba(15,23,46,0.92)] border border-[rgba(165,180,252,0.2)] text-[#FFFFFF] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[rgba(91,108,255,0.5)] min-h-[46px]"
            />
          </div>

          {filteredWords.length === 0 ? (
            <div className="p-10 rounded-2xl bg-[rgba(15,23,46,0.88)] border border-[rgba(165,180,252,0.16)] text-center text-sm text-[#94A3B8]">
              No saved words match this filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWords.map((item) => {
                const storyInfo = getStoryInfo(item.storyId);
                const exampleText = item.example || item.englishDefinition;

                return (
                  <div
                    key={item.wordId}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      item.mastered
                        ? 'bg-[rgba(12,31,34,0.85)] border-[rgba(52,211,153,0.35)]'
                        : 'bg-[rgba(15,23,46,0.92)] border-[rgba(165,180,252,0.18)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-serif font-bold text-[#FFFFFF]">
                              {item.word}
                            </h3>
                            {item.phonetic && (
                              <span className="text-xs font-mono text-[#94A3B8]">
                                {item.phonetic}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              soundEffects.playWordTap();
                              speechNarrator.speakWord(item.word);
                            }}
                            className="p-2.5 rounded-lg bg-[#1A264B] hover:bg-[#233466] text-[#9CB8FF] transition-colors cursor-pointer"
                            title="Listen pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              soundEffects.playClick();
                              toggleSaveWord(
                                {
                                  word: item.word,
                                  phonetic: item.phonetic,
                                  sinhalaMeaning: item.sinhalaMeaning,
                                  example: exampleText,
                                  englishDefinition: item.englishDefinition,
                                  partOfSpeech: item.partOfSpeech,
                                },
                                item.storyId
                              );
                            }}
                            className="p-2.5 rounded-lg bg-[#1A2038] hover:bg-[#3B1828] text-[#94A3B8] hover:text-[#FCA5A5] transition-colors cursor-pointer"
                            title="Remove word"
                            aria-label={`Remove ${item.word}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p lang="si" className="text-sm font-sinhala font-bold text-[#9CB8FF] mb-1.5">
                        {item.sinhalaMeaning}
                      </p>
                      {exampleText && (
                        <p className="text-xs text-[#CBD5E1] leading-relaxed italic">
                          &ldquo;{exampleText}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[rgba(165,180,252,0.12)] flex flex-wrap items-center justify-between gap-2">
                      {storyInfo ? (
                        <button
                          type="button"
                          onClick={() => {
                            soundEffects.playClick();
                            onSelectStory(item.storyId);
                          }}
                          className="text-xs text-[#94A3B8] hover:text-[#FFFFFF] truncate max-w-[200px] cursor-pointer text-left"
                        >
                          Story: {storyInfo.title}
                        </button>
                      ) : (
                        <span className="text-xs text-[#64748B]">
                          {item.storyId ? `Story ID: ${item.storyId}` : 'Saved Word'}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          soundEffects.playCompletionChime();
                          setWordMastered(item.wordId, !item.mastered);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer min-h-[36px] ${
                          item.mastered
                            ? 'bg-[rgba(16,185,129,0.2)] text-[#6EE7B7] border border-[rgba(52,211,153,0.45)]'
                            : 'bg-[#182242] hover:bg-[#1F2D57] text-[#E2E8F0] border border-[rgba(165,180,252,0.2)]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.mastered ? 'I know it ✔' : 'Mark Known'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Interactive 3D Flashcards Review Mode */
        <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-5 sm:p-10 flex flex-col items-center">
          {!activeCard ? (
            <p className="text-sm text-[#94A3B8] py-10 text-center">
              No flashcards in this filter. Switch to &ldquo;All&rdquo; to review all saved words.
            </p>
          ) : (
            <div className="w-full max-w-md flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs text-[#94A3B8] mb-3 tabular-nums">
                <span>
                  Card {safeCardIndex + 1} of {filteredWords.length}
                </span>
                <span className={`font-semibold ${activeCard.mastered ? 'text-[#6EE7B7]' : 'text-[#8CA8FF]'}`}>
                  {activeCard.mastered ? '✔ I know it' : 'Reviewing'}
                </span>
              </div>

              {/* 3D Flip Card */}
              <div className="w-full perspective-2000">
                <div
                  onClick={() => {
                    soundEffects.playPageFlip();
                    setIsFlipped((prev) => !prev);
                  }}
                  className={`relative w-full h-64 sm:h-72 preserve-3d transition-transform duration-500 cursor-pointer ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front Side (English Word) */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl p-5 sm:p-6 bg-[#131D3A] border border-[rgba(108,123,255,0.6)] shadow-[0_14px_40px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-medium text-[#94A3B8] mb-2">
                      English Word · Tap card to flip
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF] mb-1">
                      {activeCard.word}
                    </h2>
                    {activeCard.phonetic && (
                      <p className="text-xs font-mono text-[#94A3B8] mb-3">
                        {activeCard.phonetic}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEffects.playWordTap();
                        speechNarrator.speakWord(activeCard.word);
                      }}
                      className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1D2B57] hover:bg-[#263870] text-[#9CB8FF] text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Pronounce</span>
                    </button>
                  </div>

                  {/* Back Side (Sinhala Meaning + Example + Story) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-5 sm:p-6 bg-[#162244] border border-[rgba(52,211,153,0.55)] shadow-[0_14px_40px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center text-center">
                    <span lang="si" className="text-xs font-medium text-[#6EE7B7] mb-2">
                      සිංහල තේරුම · Meaning
                    </span>
                    <h3 lang="si" className="text-xl sm:text-2xl font-bold text-[#FFFFFF] font-sinhala mb-2">
                      {activeCard.sinhalaMeaning}
                    </h3>
                    {(activeCard.example || activeCard.englishDefinition) && (
                      <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xs leading-relaxed italic">
                        &ldquo;{activeCard.example || activeCard.englishDefinition}&rdquo;
                      </p>
                    )}
                    {getStoryInfo(activeCard.storyId) && (
                      <p className="mt-3 text-[11px] text-[#94A3B8]">
                        From: {getStoryInfo(activeCard.storyId)?.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Flashcard Review Action Buttons: Review Again / I Know It */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setWordMastered(activeCard.wordId, false);
                    advanceFlashcard();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#182242] hover:bg-[#22315E] border border-[rgba(251,191,36,0.4)] text-[#FCD34D] font-bold text-xs cursor-pointer transition-colors min-h-[44px]"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Review again</span>
                  <span lang="si" className="font-sinhala opacity-90">
                    · නැවත
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playCompletionChime();
                    setWordMastered(activeCard.wordId, true);
                    advanceFlashcard();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-indigo-cta text-[#FFFFFF] font-bold text-xs cursor-pointer transition-all min-h-[44px]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I know it</span>
                  <span lang="si" className="font-sinhala opacity-95">
                    · දන්නවා ✔
                  </span>
                </button>
              </div>

              {/* Card Index Navigation */}
              <div className="flex items-center justify-between w-full mt-4 pt-4 border-t border-[rgba(165,180,252,0.12)]">
                <button
                  type="button"
                  disabled={safeCardIndex === 0}
                  onClick={() => {
                    soundEffects.playClick();
                    setCardIndex((prev) => Math.max(0, prev - 1));
                    setIsFlipped(false);
                  }}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#162140] border border-[rgba(165,180,252,0.22)] text-[#E2E8F0] disabled:opacity-40 text-xs font-semibold cursor-pointer min-h-[40px]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    toggleSaveWord(
                      {
                        word: activeCard.word,
                        phonetic: activeCard.phonetic,
                        sinhalaMeaning: activeCard.sinhalaMeaning,
                        example: activeCard.example || activeCard.englishDefinition,
                        englishDefinition: activeCard.englishDefinition,
                        partOfSpeech: activeCard.partOfSpeech,
                      },
                      activeCard.storyId
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1A2038] hover:bg-[#3B1828] text-[#94A3B8] hover:text-[#FCA5A5] text-xs font-medium cursor-pointer min-h-[40px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>

                <button
                  type="button"
                  disabled={safeCardIndex >= filteredWords.length - 1}
                  onClick={() => {
                    soundEffects.playClick();
                    setCardIndex((prev) => Math.min(filteredWords.length - 1, prev + 1));
                    setIsFlipped(false);
                  }}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#162140] border border-[rgba(165,180,252,0.22)] text-[#E2E8F0] disabled:opacity-40 text-xs font-semibold cursor-pointer min-h-[40px]"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
