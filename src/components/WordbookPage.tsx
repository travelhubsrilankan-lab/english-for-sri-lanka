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
} from 'lucide-react';
import { useUserProgress } from '../context/UserProgressContext';
import { STORIES } from '../data/stories';
import { VocabularyWord } from '../types/story';
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
    toggleMasteredWord,
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
        item.englishDefinition.toLowerCase().includes(q)
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
    const starterPool: Array<{ vocab: (typeof STORIES)[0]['chapters'][0]['keyVocabulary'][0]; storyId: string }> = [];
    for (const story of STORIES.slice(0, 4)) {
      const firstTwo = story.chapters[0]?.keyVocabulary.slice(0, 3) || [];
      for (const vocab of firstTwo) {
        starterPool.push({ vocab, storyId: story.id });
      }
    }
    addStarterWords(starterPool);
    recordLearningActivity();
  };

  const getStoryTitle = (storyId: string): string => {
    const found = STORIES.find((s) => s.id === storyId);
    return found ? found.titleEn : '';
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            onBackToStories();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#8CA8FF]" />
          <span>පටුනට (Stories)</span>
        </button>

        {!user && (
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              void signInWithGoogle();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#152042] hover:bg-[#1C2B57] text-[#9CB8FF] border border-[rgba(129,140,248,0.35)] text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sign in with Google to Sync Cloud</span>
          </button>
        )}
      </div>

      {/* Header */}
      <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.2)] p-6 sm:p-8 shadow-[0_18px_48px_rgba(0,0,0,0.5)] mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#8CA8FF] mb-1.5">
              <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
              <span>Personal Vocabulary Notebook</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#FFFFFF]">
              My Wordbook & Flashcards
            </h1>
            <p className="mt-1.5 text-sm font-sinhala text-[#CBD5E1]">
              කතා කියවන විට Save කළ වචන මෙහිදී Flashcards මඟින් පහසුවෙන් මතක තබාගන්න.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs tabular-nums shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] text-center">
              <p className="text-lg font-bold text-[#FFFFFF]">{savedWords.length}</p>
              <p className="text-[#94A3B8]">Saved</p>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] text-center">
              <p className="text-lg font-bold text-[#9CB8FF]">{learningCount}</p>
              <p className="text-[#94A3B8]">Learning</p>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] text-center">
              <p className="text-lg font-bold text-[#6EE7B7]">{masteredCount}</p>
              <p className="text-[#94A3B8]">Mastered</p>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="mt-6 pt-5 border-t border-[rgba(165,180,252,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#0B1124] rounded-xl border border-[rgba(165,180,252,0.16)] self-start">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('list');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
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
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-tab text-[#FFFFFF]'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flashcards Practice</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-[#0B1124] rounded-xl border border-[rgba(165,180,252,0.16)] text-xs">
              {(['all', 'learning', 'mastered'] as const).map((filterKey) => (
                <button
                  key={filterKey}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setStatusFilter(filterKey);
                    setCardIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-3 py-1 rounded-lg font-medium capitalize transition-colors cursor-pointer ${
                    statusFilter === filterKey
                      ? 'bg-[#5B6CFF] text-[#FFFFFF]'
                      : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
                  }`}
                >
                  {filterKey}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {savedWords.length === 0 ? (
        <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] py-14 px-6 text-center shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] flex items-center justify-center text-[#FBBF24] mb-4">
            <Star className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#FFFFFF]">
            Your Wordbook is Empty
          </h2>
          <p className="mt-2 text-sm font-sinhala text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
            කතාවක් කියවන විට වචනයක් මත ක්ලික් කර ⭐ Save බොත්තම ඔබන්න. නැතහොත් පහත බොත්තමෙන් මූලික වචන කිහිපයක් එක් කර Flashcards පුහුණු වන්න.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleLoadStarterWords}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Add 12 Starter Words · මූලික වචන එක් කරන්න</span>
            </button>
            <button
              type="button"
              onClick={onBackToStories}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#182242] hover:bg-[#1F2D57] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#8CA8FF]" />
              <span>Read Stories</span>
            </button>
          </div>
        </div>
      ) : activeTab === 'list' ? (
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your saved words or සිංහල තේරුම්..."
              className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[rgba(15,23,46,0.92)] border border-[rgba(165,180,252,0.2)] text-[#FFFFFF] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[rgba(91,108,255,0.5)]"
            />
          </div>

          {filteredWords.length === 0 ? (
            <div className="p-10 rounded-2xl bg-[rgba(15,23,46,0.88)] border border-[rgba(165,180,252,0.16)] text-center text-sm text-[#94A3B8]">
              No saved words match this filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWords.map((item) => {
                const storyTitle = getStoryTitle(item.storyId);
                return (
                  <div
                    key={item.wordId}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      item.mastered
                        ? 'bg-[rgba(12,31,34,0.85)] border-[rgba(52,211,153,0.35)]'
                        : 'bg-[rgba(15,23,46,0.92)] border-[rgba(165,180,252,0.18)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-serif font-bold text-[#FFFFFF]">
                              {item.word}
                            </h3>
                            {item.phonetic && (
                              <span className="text-xs font-mono text-[#94A3B8]">
                                {item.phonetic}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] capitalize text-[#8CA8FF]">
                            {item.partOfSpeech}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              soundEffects.playWordTap();
                              speechNarrator.speakWord(item.word);
                            }}
                            className="p-2 rounded-lg bg-[#1A264B] hover:bg-[#233466] text-[#9CB8FF] transition-colors cursor-pointer"
                            title="Listen to pronunciation"
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
                                  englishDefinition: item.englishDefinition,
                                  partOfSpeech: item.partOfSpeech as VocabularyWord['partOfSpeech'],
                                },
                                item.storyId
                              );
                            }}
                            className="p-2 rounded-lg bg-[#1A2038] hover:bg-[#3B1828] text-[#94A3B8] hover:text-[#FCA5A5] transition-colors cursor-pointer"
                            title="Remove from Wordbook"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm font-sinhala font-bold text-[#9CB8FF] mb-1">
                        {item.sinhalaMeaning}
                      </p>
                      <p className="text-xs text-[#CBD5E1] leading-relaxed">
                        {item.englishDefinition}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[rgba(165,180,252,0.12)] flex items-center justify-between gap-2">
                      {storyTitle ? (
                        <button
                          type="button"
                          onClick={() => {
                            soundEffects.playClick();
                            onSelectStory(item.storyId);
                          }}
                          className="text-xs text-[#94A3B8] hover:text-[#FFFFFF] truncate max-w-[190px] cursor-pointer"
                        >
                          From: {storyTitle}
                        </button>
                      ) : (
                        <span className="text-xs text-[#64748B]">StoryGlow Word</span>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          soundEffects.playCompletionChime();
                          toggleMasteredWord(item.wordId);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          item.mastered
                            ? 'bg-[rgba(16,185,129,0.2)] text-[#6EE7B7] border border-[rgba(52,211,153,0.45)]'
                            : 'bg-[#182242] hover:bg-[#1F2D57] text-[#E2E8F0] border border-[rgba(165,180,252,0.2)]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.mastered ? 'Mastered' : 'Mark Mastered'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Interactive 3D Flashcards Tab */
        <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-6 sm:p-10 flex flex-col items-center">
          {!activeCard ? (
            <p className="text-sm text-[#94A3B8] py-10">
              No flashcards in this filter. Switch to &ldquo;All&rdquo; to review all saved words.
            </p>
          ) : (
            <div className="w-full max-w-md flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs text-[#94A3B8] mb-3 tabular-nums">
                <span>
                  Card {safeCardIndex + 1} of {filteredWords.length}
                </span>
                <span className="text-[#8CA8FF] font-medium">
                  {activeCard.mastered ? '✔ Mastered' : 'Learning'}
                </span>
              </div>

              {/* 3D Flip Card */}
              <div className="w-full perspective-2000">
                <div
                  onClick={() => {
                    soundEffects.playPageFlip();
                    setIsFlipped((prev) => !prev);
                  }}
                  className={`relative w-full h-64 preserve-3d transition-transform duration-500 cursor-pointer ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front Side (English Word) */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl p-6 bg-[#131D3A] border border-[rgba(108,123,255,0.6)] shadow-[0_14px_40px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-medium text-[#94A3B8] mb-2">
                      English Word · Tap to flip
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-[#FFFFFF] mb-1">
                      {activeCard.word}
                    </h2>
                    {activeCard.phonetic && (
                      <p className="text-xs font-mono text-[#94A3B8] mb-4">
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
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1D2B57] hover:bg-[#263870] text-[#9CB8FF] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Pronounce</span>
                    </button>
                  </div>

                  {/* Back Side (Sinhala Meaning & Definition) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 bg-[#162244] border border-[rgba(52,211,153,0.55)] shadow-[0_14px_40px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-medium text-[#6EE7B7] mb-2">
                      සිංහල තේරුම · Meaning
                    </span>
                    <h3 className="text-2xl font-bold text-[#FFFFFF] font-sinhala mb-2">
                      {activeCard.sinhalaMeaning}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xs leading-relaxed">
                      {activeCard.englishDefinition}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flashcard Controls */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  type="button"
                  disabled={safeCardIndex === 0}
                  onClick={() => {
                    soundEffects.playClick();
                    setCardIndex((prev) => Math.max(0, prev - 1));
                    setIsFlipped(false);
                  }}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#162140] border border-[rgba(165,180,252,0.22)] text-[#E2E8F0] disabled:opacity-40 text-xs font-semibold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playCompletionChime();
                    toggleMasteredWord(activeCard.wordId);
                    if (safeCardIndex < filteredWords.length - 1) {
                      setCardIndex(safeCardIndex + 1);
                      setIsFlipped(false);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full font-bold text-xs cursor-pointer transition-colors ${
                    activeCard.mastered
                      ? 'bg-[rgba(16,185,129,0.24)] border border-[rgba(52,211,153,0.5)] text-[#6EE7B7]'
                      : 'bg-indigo-cta text-[#FFFFFF]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{activeCard.mastered ? 'Mastered ✔' : 'Got it! (Mastered)'}</span>
                </button>

                <button
                  type="button"
                  disabled={safeCardIndex >= filteredWords.length - 1}
                  onClick={() => {
                    soundEffects.playClick();
                    setCardIndex((prev) => Math.min(filteredWords.length - 1, prev + 1));
                    setIsFlipped(false);
                  }}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#162140] border border-[rgba(165,180,252,0.22)] text-[#E2E8F0] disabled:opacity-40 text-xs font-semibold cursor-pointer"
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
