import React from 'react';
import { Story } from '../types/story';
import { BookOpen, ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface TableOfContentsPageProps {
  stories: Story[];
  onSelectStoryAndChapter: (storyId: string, chapterNumber: number) => void;
}

export const TableOfContentsPage: React.FC<TableOfContentsPageProps> = ({
  stories,
  onSelectStoryAndChapter,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Simple, welcoming header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>ඉංග්‍රීසි පුහුණු පොත් පෙළ · English Stories</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          කතාවක් තෝරන්න
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          පහසුවෙන් ඉංග්‍රීසි ඉගෙන ගැනීමට සහ අසා පුරුදු වීමට සකස් කළ සරල කෙටි කතා 5ක්. කතාවේ පින්තූරය හෝ නම මත ක්ලික් කර කියවීම අරඹන්න.
        </p>
      </div>

      {/* 5 Simple, Beautiful Story Cards with Illustrations */}
      <div className="space-y-4">
        {stories.map((story, index) => {
          return (
            <div
              key={story.id}
              onClick={() => {
                soundEffects.playPageFlip();
                onSelectStoryAndChapter(story.id, 1);
              }}
              className="group p-4 sm:p-5 rounded-3xl bg-white border border-stone-200/90 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-5 overflow-hidden"
            >
              {/* Left Side: Thumbnail Image + Story Details */}
              <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                {/* Story Main Meaning Illustration */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-28 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-stone-200/80 bg-stone-100">
                  {story.coverImage ? (
                    <img
                      src={story.coverImage}
                      alt={story.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-serif font-bold text-xl text-amber-700 bg-amber-50">
                      0{index + 1}
                    </div>
                  )}
                  {/* Floating Number Badge on image */}
                  <span className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono font-bold flex items-center justify-center">
                    0{index + 1}
                  </span>
                </div>

                {/* Story Titles and Sinhala Explanation */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 font-sans">
                      {story.genreSi}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-[11px] text-stone-500 font-sans">
                      {story.level.split(' ')[0]}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
                    {story.titleEn}
                  </h2>
                  <p className="text-sm font-sinhala text-stone-600 font-medium mt-0.5 truncate">
                    {story.titleSi}
                  </p>

                  <p className="text-xs text-stone-500 font-sinhala mt-2 line-clamp-2 leading-relaxed">
                    {story.chapters[0].summarySi}
                  </p>
                </div>
              </div>

              {/* Right Side: Action Button */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <span className="inline-flex items-center gap-1 text-[11px] text-stone-400">
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>ශබ්ද නඟා කියවීම</span>
                </span>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 group-hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs transition-all pointer-events-none"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>කියවන්න</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
