import React, { useState, useMemo } from 'react';
import { Story, StoryCategoryId, StoryLevel } from '../types/story';
import { CATEGORIES } from '../data/categories';
import { LEVEL_META } from '../utils/storyHelpers';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Lightbulb,
  Trees,
  Home,
  ScrollText,
  Clock,
  Layers,
  ChevronRight,
  FolderOpen,
  Search,
  CheckCircle2,
  Flame,
  Star,
  Award,
  Heart,
  X,
} from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { useUserProgress } from '../context/UserProgressContext';

interface TableOfContentsPageProps {
  stories: Story[];
  selectedCategoryId: StoryCategoryId | null;
  onSelectCategory: (id: StoryCategoryId | null) => void;
  onSelectStory: (storyId: string) => void;
  onOpenWordbook?: () => void;
}

type LevelFilter = 'all' | StoryLevel;

const LEVEL_OPTIONS: Array<{ id: LevelFilter; labelEn: string; labelSi?: string }> = [
  { id: 'all', labelEn: 'All Levels' },
  { id: 'Beginner', labelEn: 'Beginner', labelSi: 'ආරම්භක' },
  { id: 'Intermediate', labelEn: 'Intermediate', labelSi: 'මධ්‍යම' },
  { id: 'Advanced', labelEn: 'Advanced', labelSi: 'උසස්' },
];

export const TableOfContentsPage: React.FC<TableOfContentsPageProps> = ({
  stories,
  selectedCategoryId,
  onSelectCategory,
  onSelectStory,
  onOpenWordbook,
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const {
    completedStoryIds,
    favoriteStoryIds,
    toggleFavoriteStory,
    isStoryFavorited,
    quizScores,
    streakCount,
    savedWords,
  } = useUserProgress();

  const getCategoryIcon = (categoryId: StoryCategoryId) => {
    switch (categoryId) {
      case 'folktales':
        return <ScrollText className="w-4 h-4 text-[#8FB4FF]" />;
      case 'village':
        return <Home className="w-4 h-4 text-[#6EE7B7]" />;
      case 'nature':
        return <Trees className="w-4 h-4 text-[#5EEAD4]" />;
      case 'inspiring-lives':
        return <Lightbulb className="w-4 h-4 text-[#FCD34D]" />;
    }
  };

  const getCategoryFallbackClass = (categoryId: StoryCategoryId) => {
    switch (categoryId) {
      case 'folktales':
        return 'cat-fallback-folktales';
      case 'village':
        return 'cat-fallback-village';
      case 'nature':
        return 'cat-fallback-nature';
      case 'inspiring-lives':
        return 'cat-fallback-inspiring-lives';
    }
  };

  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategoryId) || null;
  const isFiltering =
    searchQuery.trim().length > 0 || selectedLevel !== 'all' || favoritesOnly;

  const filteredStories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return stories.filter((story) => {
      if (selectedCategoryId && story.categoryId !== selectedCategoryId) return false;
      if (selectedLevel !== 'all' && story.level !== selectedLevel) return false;
      if (favoritesOnly && !favoriteStoryIds.includes(story.id)) return false;
      if (!q) return true;

      const vocabMatches = (story.vocabulary || []).some(
        (v) =>
          v.word.toLowerCase().includes(q) ||
          v.sinhalaMeaning.toLowerCase().includes(q)
      );

      return (
        story.title.toLowerCase().includes(q) ||
        story.titleSi.toLowerCase().includes(q) ||
        story.summarySi.toLowerCase().includes(q) ||
        vocabMatches
      );
    });
  }, [stories, selectedCategoryId, selectedLevel, favoritesOnly, favoriteStoryIds, searchQuery]);

  const readCountInLibrary = useMemo(() => {
    const existingIds = new Set(stories.map((s) => s.id));
    return completedStoryIds.filter((id) => existingIds.has(id)).length;
  }, [stories, completedStoryIds]);

  const clearAllFilters = () => {
    soundEffects.playClick();
    setSearchQuery('');
    setSelectedLevel('all');
    setFavoritesOnly(false);
  };

  const renderStoryCard = (story: Story, sIndex: number) => {
    const isCompleted = completedStoryIds.includes(story.id);
    const isFavorited = isStoryFavorited(story.id);
    const quizScore = quizScores[story.id];
    const levelInfo = LEVEL_META[story.level] || LEVEL_META.Beginner;
    const catInfo = CATEGORIES.find((c) => c.id === story.categoryId);
    const coverImgFailed = failedImages[`story-${story.id}`];

    return (
      <article
        key={story.id}
        onClick={() => {
          soundEffects.playPageFlip();
          onSelectStory(story.id);
        }}
        className="group relative p-4 sm:p-5 rounded-2xl bg-[rgba(15,23,46,0.92)] hover:bg-[#141F3D] border border-[rgba(165,180,252,0.16)] hover:border-[rgba(108,123,255,0.65)] shadow-[0_14px_34px_rgba(0,0,0,0.45)] hover:shadow-[0_0_28px_-8px_rgba(99,102,241,0.3)] transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 min-w-0">
          {/* Story Cover Thumbnail */}
          <div className="relative w-full sm:w-28 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-[rgba(199,210,254,0.2)] bg-[#090F22]">
            {story.coverImage && !coverImgFailed ? (
              <img
                src={story.coverImage}
                alt={story.title}
                referrerPolicy="no-referrer"
                onError={() =>
                  setFailedImages((prev) => ({ ...prev, [`story-${story.id}`]: true }))
                }
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center font-serif font-bold text-lg ${getCategoryFallbackClass(
                  story.categoryId
                )}`}
              >
                0{sIndex + 1}
              </div>
            )}

            {/* Favorite (Heart) Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundEffects.playClick();
                toggleFavoriteStory(story.id);
              }}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              title={isFavorited ? 'Remove from My Favorites' : 'Save to My Favorites'}
              className={`absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
                isFavorited
                  ? 'bg-[rgba(159,18,57,0.88)] border-[rgba(251,113,133,0.75)] text-[#FFE4E6]'
                  : 'bg-[rgba(8,13,28,0.78)] hover:bg-[rgba(15,23,46,0.95)] border-[rgba(255,255,255,0.25)] text-[#E2E8F0]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#FB7185] text-[#FB7185]' : ''}`} />
            </button>
          </div>

          {/* Card Text & Metadata */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg font-semibold ${levelInfo.badgeClass}`}>
                <span>{levelInfo.labelEn}</span>
                <span aria-hidden="true">·</span>
                <span lang="si" className="font-sinhala">
                  {levelInfo.labelSi}
                </span>
              </span>

              <span className="inline-flex items-center gap-1 text-[#94A3B8] tabular-nums">
                <Clock className="w-3.5 h-3.5 text-[#8CA8FF]" />
                <span>{story.readingMinutes} min</span>
              </span>

              {story.hasAudio && (
                <span
                  className="inline-flex items-center gap-1 text-[#9CB8FF]"
                  title="Audio narration included"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Audio</span>
                </span>
              )}

              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[#6EE7B7] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Finished</span>
                </span>
              )}

              {typeof quizScore === 'number' && (
                <span className="inline-flex items-center gap-1 text-[#FCD34D] font-semibold tabular-nums">
                  <Award className="w-3.5 h-3.5" />
                  <span>{quizScore}%</span>
                </span>
              )}
            </div>

            <h3 className="text-lg font-serif font-bold text-[#FFFFFF] group-hover:text-[#9CB8FF] transition-colors leading-snug">
              {story.title}
            </h3>
            <p lang="si" className="text-sm font-sinhala text-[#CBD5E1] font-medium mt-0.5">
              {story.titleSi}
            </p>
            <p lang="si" className="text-xs text-[#94A3B8] font-sinhala mt-2 leading-relaxed line-clamp-2">
              {story.summarySi}
            </p>
          </div>
        </div>

        {/* Bottom Card Bar */}
        <div className="pt-3 border-t border-[rgba(165,180,252,0.12)] flex items-center justify-between gap-3">
          <span className="text-xs text-[#94A3B8] truncate">
            {catInfo ? (
              <>
                {catInfo.titleEn} ·{' '}
                <span lang="si" className="font-sinhala">
                  {catInfo.titleSi}
                </span>
              </>
            ) : null}
          </span>

          <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-semibold text-xs transition-all whitespace-nowrap min-h-[38px] shrink-0">
            <BookOpen className="w-3.5 h-3.5" />
            <span lang="si" className="font-sinhala">
              කියවන්න
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </article>
    );
  };

  const renderFriendlyEmptyState = (isFilteredEmpty: boolean) => (
    <div className="bg-[rgba(15,23,46,0.9)] rounded-2xl border border-[rgba(165,180,252,0.16)] py-12 px-5 sm:px-8 text-center shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
      <div className="w-12 h-12 mx-auto rounded-xl bg-[#162140] text-[#8CA8FF] border border-[rgba(165,180,252,0.22)] flex items-center justify-center mb-4">
        <FolderOpen className="w-6 h-6" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF]">
        <span lang="si" className="font-sinhala">
          කතා ඉක්මනින් එනවා
        </span>{' '}
        <span className="text-[#8CA8FF]">·</span> Stories coming soon
      </h3>
      <p lang="si" className="mt-2 text-xs sm:text-sm font-sinhala text-[#94A3B8] max-w-md mx-auto leading-relaxed">
        {isFilteredEmpty
          ? 'මෙම සෙවුමට හෝ මට්ටමට ගැලපෙන කතා දැනට නොමැත. පෙරහන් ඉවත් කර නැවත පරීක්ෂා කරන්න.'
          : 'මෙම කාණ්ඩයට අලුත් ඉංග්‍රීසි කතා ඉක්මනින් එකතු වනු ඇත.'}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        {isFilteredEmpty && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-semibold cursor-pointer min-h-[44px]"
          >
            <span>Clear Filters · සියල්ල පෙන්වන්න</span>
          </button>
        )}
        {selectedCategoryId !== null && (
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onSelectCategory(null);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#182242] hover:bg-[#1E2B52] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span lang="si" className="font-sinhala">
              අනෙක් කාණ්ඩ බලන්න
            </span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10 overflow-x-hidden">
      {/* Hero & Progress Header */}
      <div className="text-center mb-7">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium tracking-wide text-[#8CA8FF] mb-2">
            <span lang="si" className="font-sinhala">
              ශ්‍රී ලාංකික ඉංග්‍රීසි කතා පුස්තකාලය
            </span>
            <span aria-hidden="true">·</span>
            <span>Sri Lankan Story Library</span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-serif font-bold tracking-tight [text-wrap:balance]">
            <span className="text-[#FFFFFF]">StoryGlow · </span>
            <span className="text-indigo-gradient" lang="si">
              කතා පුස්තකාලය
            </span>
          </h1>

          <p
            lang="si"
            className="mt-3 text-[#CBD5E1] text-xs sm:text-base font-sinhala leading-relaxed tracking-[0.01em]"
          >
            {currentCategory
              ? `${currentCategory.titleSi} (${currentCategory.titleEn}) කාණ්ඩයේ කතා පහතින් තෝරා කියවන්න.`
              : 'සරල ඉංග්‍රීසි කතා කියවමින් සිංහල අර්ථ, ශ්‍රව්‍ය උච්චාරණය සහ නව වචන පහසුවෙන් ඉගෙන ගන්න.'}
          </p>
        </div>

        {/* Library Reading Progress, Streak & My Words Summary */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[rgba(15,23,46,0.92)] border border-[rgba(165,180,252,0.18)] text-[#E2E8F0] tabular-nums min-h-[40px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
            <span>
              <strong className="text-[#FFFFFF]">{readCountInLibrary}</strong> of{' '}
              <strong className="text-[#FFFFFF]">{stories.length}</strong> stories read
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[rgba(15,23,46,0.92)] border border-[rgba(165,180,252,0.18)] text-[#E2E8F0] tabular-nums min-h-[40px]">
            <Flame className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
            <span>
              Streak: <strong className="text-[#FCD34D]">{streakCount}</strong>{' '}
              {streakCount === 1 ? 'day' : 'days'}
            </span>
          </div>

          {onOpenWordbook && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onOpenWordbook();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[rgba(22,33,66,0.95)] hover:bg-[#1E2E5C] border border-[rgba(129,140,248,0.32)] text-[#9CB8FF] font-semibold transition-colors cursor-pointer tabular-nums min-h-[40px]"
            >
              <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
              <span>My Words ({savedWords.length})</span>
            </button>
          )}
        </div>

        {/* Horizontally Scrollable Category Filter Chips on Mobile */}
        <div className="mt-6 w-full overflow-x-auto no-scrollbar pb-1">
          <div className="inline-flex sm:flex-wrap items-center justify-start sm:justify-center gap-1.5 p-1.5 bg-[rgba(13,20,41,0.92)] rounded-xl border border-[rgba(165,180,252,0.18)] shadow-[0_12px_32px_rgba(0,0,0,0.45)] min-w-max sm:min-w-0">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onSelectCategory(null);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 min-h-[40px] ${
                selectedCategoryId === null
                  ? 'bg-indigo-tab text-[#FFFFFF]'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.06)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span lang="si" className="font-sinhala">
                සියලු කාණ්ඩ ({CATEGORIES.length})
              </span>
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              const imgFailed = failedImages[`tab-${cat.id}`];

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectCategory(cat.id);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0 min-h-[40px] ${
                    isSelected
                      ? 'bg-indigo-tab text-[#FFFFFF]'
                      : 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.06)]'
                  }`}
                >
                  {!imgFailed ? (
                    <img
                      src={cat.image}
                      alt={cat.titleEn}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [`tab-${cat.id}`]: true }))
                      }
                      className="w-5 h-5 rounded-md object-cover border border-[rgba(255,255,255,0.22)] shrink-0"
                    />
                  ) : (
                    <span className="w-5 h-5 rounded-md bg-[#1E1B4B] flex items-center justify-center shrink-0">
                      {getCategoryIcon(cat.id)}
                    </span>
                  )}
                  <span lang="si" className="font-sinhala">
                    {cat.titleSi}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input + Combined Level & Favorites Filter Strip */}
        <div className="mt-4 max-w-4xl mx-auto space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by English title, සිංහල මාතෘකාව, or vocabulary word..."
              aria-label="Search stories by title or vocabulary"
              className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm rounded-xl bg-[rgba(15,23,46,0.92)] border border-[rgba(165,180,252,0.22)] text-[#FFFFFF] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[rgba(91,108,255,0.5)] min-h-[44px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-[#94A3B8] hover:text-[#FFFFFF] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="w-full overflow-x-auto no-scrollbar pb-1">
            <div className="inline-flex sm:flex-wrap items-center justify-start sm:justify-center gap-1.5 p-1.5 rounded-xl bg-[rgba(13,20,41,0.92)] border border-[rgba(165,180,252,0.18)] min-w-max sm:min-w-0">
              {LEVEL_OPTIONS.map((lvl) => {
                const count =
                  lvl.id === 'all'
                    ? stories.filter((s) => !selectedCategoryId || s.categoryId === selectedCategoryId).length
                    : stories.filter(
                        (s) =>
                          s.level === lvl.id &&
                          (!selectedCategoryId || s.categoryId === selectedCategoryId)
                      ).length;

                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedLevel(lvl.id);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap tabular-nums min-h-[38px] ${
                      selectedLevel === lvl.id
                        ? 'bg-[#5B6CFF] text-[#FFFFFF]'
                        : 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    <span>{lvl.labelEn}</span>
                    {lvl.labelSi && (
                      <span lang="si" className="font-sinhala ml-1 opacity-90">
                        · {lvl.labelSi}
                      </span>
                    )}{' '}
                    ({count})
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setFavoritesOnly((prev) => !prev);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 min-h-[38px] ${
                  favoritesOnly
                    ? 'bg-[rgba(190,18,60,0.85)] text-[#FFFFFF] border border-[rgba(251,113,133,0.65)]'
                    : 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.06)]'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    favoritesOnly ? 'fill-[#FFFFFF] text-[#FFFFFF]' : 'text-[#FB7185]'
                  }`}
                />
                <span>My Favorites</span>
                <span lang="si" className="font-sinhala hidden sm:inline">
                  · මගේ ප්‍රියතම
                </span>
                <span className="tabular-nums">({favoriteStoryIds.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 1: Active Search / Level / Favorites Filtered Results */}
      {isFiltering ? (
        <section className="space-y-4" aria-label="Filtered Stories">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(165,180,252,0.14)] pb-3">
            <h2 lang="si" className="text-sm font-semibold text-[#E2E8F0] font-sinhala">
              සෙවුම් ප්‍රතිඵල · Results ({filteredStories.length})
            </h2>
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#8CA8FF] hover:text-[#FFFFFF] cursor-pointer py-1"
            >
              Clear Filters · සියල්ල පෙන්වන්න
            </button>
          </div>

          {filteredStories.length === 0 ? (
            renderFriendlyEmptyState(true)
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStories.map((story, idx) => renderStoryCard(story, idx))}
            </div>
          )}
        </section>
      ) : selectedCategoryId === null ? (
        /* VIEW 2: 4 Story Category Cards + Library Empty Notice if empty */
        <section aria-label="Story Categories" className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(165,180,252,0.14)] pb-3 mb-5">
              <h2 lang="si" className="text-sm font-semibold text-[#E2E8F0] font-sinhala tracking-[0.01em]">
                01 – 04 · ප්‍රධාන කතා කාණ්ඩ හතර
              </h2>
              <span lang="si" className="text-xs text-[#94A3B8] font-sinhala">
                කැමති කාණ්ඩයක් තෝරන්න
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {CATEGORIES.map((cat, idx) => {
                const catStories = stories.filter((s) => s.categoryId === cat.id);
                const count = catStories.length;
                const completedInCat = catStories.filter((s) =>
                  completedStoryIds.includes(s.id)
                ).length;
                const imgFailed = failedImages[`card-${cat.id}`];

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playPageFlip();
                      onSelectCategory(cat.id);
                    }}
                    className="group text-left bg-[rgba(15,23,46,0.92)] hover:bg-[#141F3D] rounded-2xl border border-[rgba(165,180,252,0.16)] hover:border-[rgba(108,123,255,0.65)] p-4 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.65)] hover:shadow-[0_0_32px_-8px_rgba(99,102,241,0.3)] transition-all duration-200 cursor-pointer flex items-center gap-3.5 sm:gap-4"
                  >
                    {/* Compact 4:3 Category Cover Image */}
                    <div className="relative w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-[rgba(199,210,254,0.18)] bg-[#090F22]">
                      {!imgFailed ? (
                        <img
                          src={cat.image}
                          alt={`${cat.titleEn} - ${cat.titleSi}`}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [`card-${cat.id}`]: true }))
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div
                          className={`w-full h-full ${getCategoryFallbackClass(
                            cat.id
                          )} flex flex-col items-center justify-center p-2`}
                        >
                          {getCategoryIcon(cat.id)}
                        </div>
                      )}
                    </div>

                    {/* Category Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-[#94A3B8] tabular-nums mb-1">
                        <span className="font-mono font-semibold text-[#8CA8FF]">0{idx + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span lang="si" className="font-sinhala">
                          කතා {count}ක්
                        </span>
                        {completedInCat > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#6EE7B7] font-semibold">
                              ✔ {completedInCat}/{count}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-serif font-bold text-[#FFFFFF] group-hover:text-[#9CB8FF] transition-colors truncate">
                        {cat.titleEn}
                      </h3>

                      <p
                        lang="si"
                        className="text-sm font-sinhala font-semibold text-[#E2E8F0] truncate mt-0.5 tracking-[0.01em]"
                      >
                        {cat.titleSi}
                      </p>

                      <p
                        lang="si"
                        className="text-xs font-sinhala text-[#94A3B8] line-clamp-2 mt-1.5 leading-relaxed"
                      >
                        {cat.descriptionSi}
                      </p>

                      <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#84A2FF] group-hover:text-[#B4C8FF]">
                        <span lang="si" className="font-sinhala">
                          කාණ්ඩය විවෘත කරන්න
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    <div className="shrink-0 text-[#64748B] group-hover:text-[#84A2FF] transition-colors hidden sm:block">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {stories.length === 0 ? (
            renderFriendlyEmptyState(false)
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(165,180,252,0.14)] pb-3">
                <h2 className="text-sm font-semibold text-[#E2E8F0]">
                  All Stories ({stories.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stories.map((story, idx) => renderStoryCard(story, idx))}
              </div>
            </div>
          )}
        </section>
      ) : (
        /* VIEW 3: Inside a Selected Category */
        <section className="space-y-6" aria-label={currentCategory?.titleEn}>
          {/* Selected Category Banner */}
          <div className="bg-[rgba(15,23,46,0.92)] rounded-2xl border border-[rgba(165,180,252,0.18)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              {currentCategory && (
                <div className="w-14 sm:w-16 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-[rgba(199,210,254,0.2)] bg-[#090F22]">
                  {!failedImages[`banner-${currentCategory.id}`] ? (
                    <img
                      src={currentCategory.image}
                      alt={currentCategory.titleEn}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [`banner-${currentCategory.id}`]: true,
                        }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full ${getCategoryFallbackClass(
                        currentCategory.id
                      )} flex items-center justify-center`}
                    >
                      {getCategoryIcon(currentCategory.id)}
                    </div>
                  )}
                </div>
              )}

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] mb-0.5">
                  <span className="font-semibold text-[#8CA8FF]">{currentCategory?.titleEn}</span>
                  <span aria-hidden="true">·</span>
                  <span lang="si" className="font-sinhala">
                    කතා {filteredStories.length}ක්
                  </span>
                </div>
                <h2
                  lang="si"
                  className="text-lg sm:text-xl font-sinhala font-bold text-[#FFFFFF] tracking-[0.01em]"
                >
                  {currentCategory?.titleSi}
                </h2>
                <p lang="si" className="text-xs text-[#CBD5E1] font-sinhala mt-1">
                  {currentCategory?.descriptionSi}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onSelectCategory(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#182242] hover:bg-[#1E2B52] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-center min-h-[40px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span lang="si" className="font-sinhala">
                සියලු කාණ්ඩ 4ට
              </span>
            </button>
          </div>

          {filteredStories.length === 0 ? (
            renderFriendlyEmptyState(false)
          ) : (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-[rgba(165,180,252,0.14)] pb-2">
                <h3 lang="si" className="text-xs font-semibold text-[#94A3B8] font-sinhala">
                  කාණ්ඩයේ ඇති කතා ({filteredStories.length})
                </h3>
                <span lang="si" className="text-xs text-[#94A3B8] font-sinhala">
                  කියවීමට කතාවක් තෝරන්න
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStories.map((story, sIndex) => renderStoryCard(story, sIndex))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
