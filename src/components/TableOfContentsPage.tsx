import React, { useState } from 'react';
import { Story, StoryCategoryId } from '../types/story';
import { STORY_CATEGORIES } from '../data/stories';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Landmark,
  Trees,
  Home,
  ScrollText,
  Clock,
  Layers,
  ChevronRight,
  FolderOpen,
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface TableOfContentsPageProps {
  stories: Story[];
  selectedCategoryId: StoryCategoryId | null;
  onSelectCategory: (id: StoryCategoryId | null) => void;
  onSelectStoryAndChapter: (storyId: string, chapterNumber: number) => void;
}

export const TableOfContentsPage: React.FC<TableOfContentsPageProps> = ({
  stories,
  selectedCategoryId,
  onSelectCategory,
  onSelectStoryAndChapter,
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const getCategoryIcon = (categoryId: StoryCategoryId) => {
    switch (categoryId) {
      case 'folktales':
        return <ScrollText className="w-4 h-4 text-[#8FB4FF]" />;
      case 'village':
        return <Home className="w-4 h-4 text-[#6EE7B7]" />;
      case 'nature':
        return <Trees className="w-4 h-4 text-[#5EEAD4]" />;
      case 'heritage':
        return <Landmark className="w-4 h-4 text-[#A5B4FC]" />;
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
      case 'heritage':
        return 'cat-fallback-heritage';
    }
  };

  const currentCategory = STORY_CATEGORIES.find((c) => c.id === selectedCategoryId) || null;
  const currentCategoryStories = selectedCategoryId
    ? stories.filter((s) => s.categoryId === selectedCategoryId)
    : [];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Editorial Hero Title Block matching luminous cobalt-indigo theme */}
      <div className="text-center mb-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-[#8CA8FF] mb-2.5">
            <span>ශ්‍රී ලාංකික කතා පුස්තකාලය</span>
            <span aria-hidden="true">·</span>
            <span>Sri Lankan Story Library</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight [text-wrap:balance]">
            <span className="text-[#FFFFFF]">පටුන · </span>
            <span className="text-indigo-gradient">Table of Contents</span>
          </h1>

          <p className="mt-3.5 text-[#CBD5E1] text-sm sm:text-base font-sinhala leading-relaxed tracking-[0.01em]">
            {currentCategory
              ? `${currentCategory.titleSi} (${currentCategory.titleEn}) කාණ්ඩය යටතේ ඇති කතා පහතින් තෝරා කියවන්න.`
              : 'ලංකාවට ගැලපෙන කතා කාණ්ඩ 4 පහතින් දැක්වේ. කැමති කාණ්ඩයක් තෝරා එතුළ ඇති කතා කියවන්න.'}
          </p>
        </div>

        {/* Interactive 4 Matching Category Tabs with Thumbnails */}
        <div className="mt-7 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[rgba(13,20,41,0.92)] rounded-xl border border-[rgba(165,180,252,0.18)] shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onSelectCategory(null);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                selectedCategoryId === null
                  ? 'bg-indigo-tab text-[#FFFFFF]'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.06)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>සියලු කාණ්ඩ (4)</span>
            </button>

            {STORY_CATEGORIES.map((cat) => {
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-indigo-tab text-[#FFFFFF]'
                      : 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.06)]'
                  }`}
                >
                  {!imgFailed ? (
                    <img
                      src={cat.coverImage}
                      alt={cat.titleEn}
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImages((prev) => ({ ...prev, [`tab-${cat.id}`]: true }))}
                      className="w-5 h-5 rounded-md object-cover border border-[rgba(255,255,255,0.22)] shrink-0"
                    />
                  ) : (
                    <span className="w-5 h-5 rounded-md bg-[#1E1B4B] flex items-center justify-center shrink-0">
                      {getCategoryIcon(cat.id)}
                    </span>
                  )}
                  <span className="font-sinhala">{cat.shortLabelSi}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* VIEW 1: 4 Sri Lankan Category Boxes with Illustrations (No stories listed upfront) */}
      {selectedCategoryId === null ? (
        <section aria-label="Story Categories">
          <div className="flex items-center justify-between border-b border-[rgba(165,180,252,0.14)] pb-3 mb-5">
            <h2 className="text-sm font-semibold text-[#E2E8F0] font-sinhala tracking-[0.01em]">
              01 – 04 · ලංකාවට ගැලපෙන ප්‍රධාන කාණ්ඩ හතර
            </h2>
            <span className="text-xs text-[#94A3B8] font-sinhala">
              කාණ්ඩයක් තෝරන්න
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STORY_CATEGORIES.map((cat, idx) => {
              const count = stories.filter((s) => s.categoryId === cat.id).length;
              const imgFailed = failedImages[`card-${cat.id}`];

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playPageFlip();
                    onSelectCategory(cat.id);
                  }}
                  className="group text-left bg-[rgba(15,23,46,0.9)] hover:bg-[#141F3D] rounded-2xl border border-[rgba(165,180,252,0.16)] hover:border-[rgba(108,123,255,0.65)] p-4 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.65)] hover:shadow-[0_0_32px_-8px_rgba(99,102,241,0.3)] transition-all duration-200 cursor-pointer flex items-center gap-4"
                >
                  {/* 4:3 Illustration Box */}
                  <div className="relative w-28 sm:w-32 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-[rgba(199,210,254,0.18)] bg-[#090F22]">
                    {!imgFailed ? (
                      <img
                        src={cat.coverImage}
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

                  {/* Category Details (Zero-Pill Clean Metadata) */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8] tabular-nums mb-1">
                      <span className="font-mono font-semibold text-[#8CA8FF]">0{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-sinhala">
                        {count > 0 ? `කතා ${count}ක්` : 'කතා එක් කිරීමට සූදානම්'}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#FFFFFF] group-hover:text-[#9CB8FF] transition-colors truncate">
                      {cat.titleEn}
                    </h3>

                    <p className="text-sm font-sinhala font-semibold text-[#E2E8F0] truncate mt-0.5 tracking-[0.01em]">
                      {cat.titleSi}
                    </p>

                    <p className="text-xs font-sinhala text-[#94A3B8] line-clamp-2 mt-1.5 leading-relaxed">
                      {cat.descriptionSi}
                    </p>

                    <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#84A2FF] group-hover:text-[#B4C8FF] font-sinhala">
                      <span>කාණ්ඩය විවෘත කරන්න</span>
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
        </section>
      ) : (
        /* VIEW 2: Inside a Selected Sri Lankan Category */
        <section className="space-y-6" aria-label={currentCategory?.titleEn}>
          {/* Selected Category Header Banner */}
          <div className="bg-[rgba(15,23,46,0.92)] rounded-2xl border border-[rgba(165,180,252,0.18)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-4">
              {currentCategory && (
                <div className="w-20 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-[rgba(199,210,254,0.2)] bg-[#090F22]">
                  {!failedImages[`banner-${currentCategory.id}`] ? (
                    <img
                      src={currentCategory.coverImage}
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

              <div>
                <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-0.5">
                  <span className="font-semibold text-[#8CA8FF]">{currentCategory?.titleEn}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sinhala">කතා {currentCategoryStories.length}ක්</span>
                </div>
                <h2 className="text-xl font-sinhala font-bold text-[#FFFFFF] tracking-[0.01em]">
                  {currentCategory?.titleSi}
                </h2>
                <p className="text-xs text-[#CBD5E1] font-sinhala mt-1">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#182242] hover:bg-[#1E2B52] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>සියලු කාණ්ඩ 4ට</span>
            </button>
          </div>

          {/* Empty State vs Story Title List */}
          {currentCategoryStories.length === 0 ? (
            <div className="bg-[rgba(15,23,46,0.9)] rounded-2xl border border-[rgba(165,180,252,0.16)] py-14 px-6 text-center shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#162140] text-[#8CA8FF] border border-[rgba(165,180,252,0.22)] flex items-center justify-center mb-4">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-sinhala font-bold text-[#FFFFFF]">
                මෙම කාණ්ඩයේ තවමත් කතා ඇතුළත් කර නැත
              </h3>
              <p className="mt-2 text-sm font-sinhala text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
                ඔබ ලබාදෙන නව කතා මෙම <span className="font-semibold text-[#FFFFFF]">{currentCategory?.titleSi}</span> කාණ්ඩය යටතේ මාතෘකා අනුව ඇතුළත් කිරීමට සූදානම්ව පවතී.
              </p>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onSelectCategory(null);
                }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-semibold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>අනෙක් කාණ්ඩ බලන්න</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-[rgba(165,180,252,0.14)] pb-2">
                <h3 className="text-xs font-semibold text-[#94A3B8] font-sinhala">
                  කාණ්ඩයේ ඇති කතා ({currentCategoryStories.length})
                </h3>
                <span className="text-xs text-[#94A3B8] font-sinhala">
                  කියවීමට කතාවක් තෝරන්න
                </span>
              </div>

              {currentCategoryStories.map((story, sIndex) => (
                <div
                  key={story.id}
                  onClick={() => {
                    soundEffects.playPageFlip();
                    onSelectStoryAndChapter(story.id, 1);
                  }}
                  className="group p-4 sm:p-5 rounded-2xl bg-[rgba(15,23,46,0.9)] hover:bg-[#141F3D] border border-[rgba(165,180,252,0.16)] hover:border-[rgba(108,123,255,0.65)] shadow-[0_14px_34px_rgba(0,0,0,0.45)] hover:shadow-[0_0_28px_-8px_rgba(99,102,241,0.3)] transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="relative w-24 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-[rgba(199,210,254,0.2)] bg-[#090F22]">
                      {story.coverImage ? (
                        <img
                          src={story.coverImage}
                          alt={story.titleEn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-serif font-bold text-lg text-[#8CA8FF] bg-[#162140]">
                          0{sIndex + 1}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
                        <span className="font-mono font-semibold text-[#8CA8FF]">0{sIndex + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-sinhala">{story.genreSi}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 tabular-nums">
                          <Clock className="w-3 h-3 text-[#94A3B8]" />
                          {story.estimatedMinutes} min
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{story.level.split(' ')[0]}</span>
                      </div>

                      <h4 className="text-lg font-serif font-bold text-[#FFFFFF] group-hover:text-[#9CB8FF] transition-colors">
                        {story.titleEn}
                      </h4>
                      <p className="text-sm font-sinhala text-[#CBD5E1] font-medium mt-0.5">
                        {story.titleSi}
                      </p>

                      {story.chapters[0]?.summarySi && (
                        <p className="text-xs text-[#94A3B8] font-sinhala mt-1.5 line-clamp-1">
                          {story.chapters[0].summarySi}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[rgba(165,180,252,0.12)]">
                    <span className="inline-flex items-center gap-1 text-xs text-[#94A3B8] font-sinhala">
                      <Volume2 className="w-3.5 h-3.5 text-[#8CA8FF]" />
                      <span>ශබ්ද නඟා කියවීම</span>
                    </span>

                    <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-semibold text-xs transition-all whitespace-nowrap">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>කියවන්න</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
