import React, { useState } from 'react';
import { Story, StoryCategory } from '../types/story';
import { STORY_CATEGORIES } from '../data/stories';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Volume2,
  Compass,
  Trees,
  Cpu,
  HeartHandshake,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface TableOfContentsPageProps {
  stories: Story[];
  onSelectStoryAndChapter: (storyId: string, chapterNumber: number) => void;
}

export const TableOfContentsPage: React.FC<TableOfContentsPageProps> = ({
  stories,
  onSelectStoryAndChapter,
}) => {
  // If null, show the 4 compact category boxes.
  // If a category id is set, show the title-wise stories under that category.
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Category Icon Resolver
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'mystery':
        return <Compass className="w-4 h-4 text-amber-700" />;
      case 'nature':
        return <Trees className="w-4 h-4 text-emerald-700" />;
      case 'scifi':
        return <Cpu className="w-4 h-4 text-sky-700" />;
      case 'kindness':
        return <HeartHandshake className="w-4 h-4 text-rose-700" />;
      default:
        return <BookOpen className="w-4 h-4 text-amber-700" />;
    }
  };

  const getCategoryThemeColors = (categoryId: string) => {
    switch (categoryId) {
      case 'mystery':
        return {
          border: 'border-amber-300 hover:border-amber-500',
          bgBadge: 'bg-amber-100 text-amber-900',
          accent: 'text-amber-700',
          glow: 'hover:shadow-amber-100',
        };
      case 'nature':
        return {
          border: 'border-emerald-300 hover:border-emerald-500',
          bgBadge: 'bg-emerald-100 text-emerald-900',
          accent: 'text-emerald-700',
          glow: 'hover:shadow-emerald-100',
        };
      case 'scifi':
        return {
          border: 'border-sky-300 hover:border-sky-500',
          bgBadge: 'bg-sky-100 text-sky-900',
          accent: 'text-sky-700',
          glow: 'hover:shadow-sky-100',
        };
      case 'kindness':
        return {
          border: 'border-rose-300 hover:border-rose-500',
          bgBadge: 'bg-rose-100 text-rose-900',
          accent: 'text-rose-700',
          glow: 'hover:shadow-rose-100',
        };
      default:
        return {
          border: 'border-stone-300 hover:border-stone-500',
          bgBadge: 'bg-stone-100 text-stone-900',
          accent: 'text-stone-700',
          glow: 'hover:shadow-stone-100',
        };
    }
  };

  const currentCategory = STORY_CATEGORIES.find((c) => c.id === selectedCategoryId);
  const currentCategoryStories = selectedCategoryId
    ? stories.filter((s) => s.categoryId === selectedCategoryId)
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>ඉංග්‍රීසි පුහුණු පුස්තකාලය · English Stories Library</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          පටුන · Table of Contents
        </h1>
        <p className="mt-1 text-stone-600 text-xs sm:text-sm max-w-lg mx-auto font-sinhala">
          {selectedCategoryId
            ? 'තෝරාගත් කාණ්ඩයේ කතා පහතින් බලන්න. කියවීම ආරම්භ කිරීමට කතාවක් තෝරන්න.'
            : 'කියවීමට කැමති කාණ්ඩය තෝරන්න. එක් එක් කාණ්ඩය යටතේ විශේෂ කතා 2 බැගින් ඇත.'}
        </p>

        {/* 4 Quick Matching Tabs at the Top */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
          <button
            onClick={() => {
              soundEffects.playClick();
              setSelectedCategoryId(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategoryId === null
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>සියලු කාණ්ඩ (4 Categories)</span>
          </button>

          {STORY_CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedCategoryId(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {cat.coverImage && (
                  <img
                    src={cat.coverImage}
                    alt={cat.titleEn}
                    className="w-4 h-4 rounded-full object-cover border border-stone-300"
                  />
                )}
                <span>
                  {idx + 1}. {cat.titleEn.split('&')[0].trim()}
                </span>
                <span className="opacity-75 font-sinhala text-[11px] hidden sm:inline">
                  ({cat.titleSi.split('සහ')[0].trim()})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: 4 Small Category Boxes with Images (No stories listed upfront) */}
      {selectedCategoryId === null ? (
        <div className="space-y-4">
          <div className="text-center sm:text-left flex items-center justify-between pb-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              කාණ්ඩ 4 · 4 Main Categories
            </h2>
            <span className="text-xs text-stone-400 font-sinhala">
              කාණ්ඩයක් තෝරා කතා බලන්න
            </span>
          </div>

          {/* 4 Small Boxes (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STORY_CATEGORIES.map((cat, idx) => {
              const theme = getCategoryThemeColors(cat.id);
              const catStoriesCount = stories.filter((s) => s.categoryId === cat.id).length;

              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    soundEffects.playPageFlip();
                    setSelectedCategoryId(cat.id);
                  }}
                  className={`group relative overflow-hidden rounded-2xl bg-white border ${theme.border} shadow-xs hover:shadow-md ${theme.glow} transition-all duration-300 cursor-pointer p-3.5 flex items-center gap-3.5`}
                >
                  {/* Category Image Box */}
                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100 shadow-2xs">
                    {cat.coverImage ? (
                      <img
                        src={cat.coverImage}
                        alt={cat.titleEn}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-amber-50">
                        {getCategoryIcon(cat.id)}
                      </div>
                    )}
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-stone-900/70 text-white font-mono text-[10px] font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Category Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {getCategoryIcon(cat.id)}
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${theme.bgBadge}`}>
                        කතා {catStoriesCount}ක් · {catStoriesCount} Stories
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors truncate">
                      {cat.titleEn}
                    </h3>
                    <p className="text-xs font-sinhala font-medium text-stone-600 truncate mt-0.5">
                      {cat.titleSi}
                    </p>

                    <div className="mt-2 flex items-center text-xs font-semibold text-amber-700 group-hover:text-amber-800 gap-1 font-sinhala">
                      <span>කතා බලන්න</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Subtle chevron */}
                  <div className="shrink-0 text-stone-300 group-hover:text-amber-600 transition-colors pr-1">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW 2: Inside Category - Stories Displayed Title-wise */
        <div className="space-y-6">
          {/* Back Button & Current Category Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs">
            <div className="flex items-center gap-3.5">
              {currentCategory?.coverImage && (
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-2xs">
                  <img
                    src={currentCategory.coverImage}
                    alt={currentCategory.titleEn}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                    {currentCategory?.titleEn}
                  </h2>
                  <span className="text-stone-300">·</span>
                  <span className="text-sm font-sinhala font-semibold text-amber-800">
                    {currentCategory?.titleSi}
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-sinhala mt-0.5">
                  {currentCategory?.descriptionSi}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                setSelectedCategoryId(null);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all cursor-pointer self-start sm:self-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>සියලු කාණ්ඩ 4ට (All 4)</span>
            </button>
          </div>

          {/* Stories List (Title-wise under this Category) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                කාණ්ඩයේ ඇති කතා · Stories ({currentCategoryStories.length})
              </h3>
              <span className="text-xs text-stone-400 font-sinhala">
                කියවීමට කතාවක් ක්ලික් කරන්න
              </span>
            </div>

            {currentCategoryStories.map((story, sIndex) => {
              return (
                <div
                  key={story.id}
                  onClick={() => {
                    soundEffects.playPageFlip();
                    onSelectStoryAndChapter(story.id, 1);
                  }}
                  className="group p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Illustration Photo & Title Details */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Story Cover Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100 shadow-xs">
                      {story.coverImage ? (
                        <img
                          src={story.coverImage}
                          alt={story.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-serif font-bold text-xl text-amber-700 bg-amber-50">
                          0{sIndex + 1}
                        </div>
                      )}
                      <span className="absolute top-1 left-1 w-5 h-5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center justify-center">
                        {sIndex + 1}
                      </span>
                    </div>

                    {/* Title & Sinhala Information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                          {story.genreSi}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          {story.estimatedMinutes} mins
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                          {story.level.split(' ')[0]}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {story.titleEn}
                      </h4>
                      <p className="text-sm font-sinhala text-stone-600 font-medium mt-0.5">
                        {story.titleSi}
                      </p>

                      <p className="text-xs text-stone-500 font-sinhala mt-1.5 line-clamp-1 leading-relaxed">
                        {story.chapters[0].summarySi}
                      </p>
                    </div>
                  </div>

                  {/* Right: Audio Indicator & Read Button */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-400">
                      <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>ශබ්ද නඟා කියවීම</span>
                    </span>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-500 group-hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs transition-all pointer-events-none"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>කියවන්න</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
