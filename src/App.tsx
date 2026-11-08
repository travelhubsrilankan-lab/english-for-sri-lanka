import React, { useState } from 'react';
import { STORIES } from './data/stories';
import { BookContainer } from './components/BookContainer';
import { TableOfContentsPage } from './components/TableOfContentsPage';
import { soundEffects } from './utils/audio';
import { BookOpen, Compass } from 'lucide-react';

export default function App() {
  // 'toc' view opens first so user sees the list of stories
  const [currentView, setCurrentView] = useState<'toc' | 'reader'>('toc');
  const [currentStoryId, setCurrentStoryId] = useState<string>(STORIES[0].id);
  const [currentChapterNumber, setCurrentChapterNumber] = useState<number>(1);

  const currentStory = STORIES.find((s) => s.id === currentStoryId) || STORIES[0];

  const handleSelectStoryAndChapter = (storyId: string, chapterNumber: number) => {
    setCurrentStoryId(storyId);
    setCurrentChapterNumber(chapterNumber);
    setCurrentView('reader');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans antialiased">
      {/* Simple, Clean Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setCurrentView('toc');
            }}
            className="flex items-center gap-2 text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 font-serif font-bold text-lg flex items-center justify-center shadow-xs">
              S
            </div>
            <div>
              <span className="text-base font-serif font-bold tracking-tight text-stone-900 block leading-tight">
                StoryGlow
              </span>
              <span className="text-[11px] text-stone-500 font-sinhala block">
                ඉංග්‍රීසි පුහුණු කතා
              </span>
            </div>
          </button>

          {/* Simple Navigation Action */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setCurrentView('toc');
            }}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentView === 'toc'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-600" />
            <span>කතා ලැයිස්තුව (Stories)</span>
          </button>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col justify-center items-center py-4 sm:py-6">
        {currentView === 'toc' ? (
          <TableOfContentsPage
            stories={STORIES}
            onSelectStoryAndChapter={handleSelectStoryAndChapter}
          />
        ) : (
          <BookContainer
            story={currentStory}
            currentChapterNumber={currentChapterNumber}
            onChapterChange={setCurrentChapterNumber}
            onBackToStories={() => {
              soundEffects.playClick();
              setCurrentView('toc');
            }}
          />
        )}
      </main>

      {/* Simple Footer */}
      <footer className="py-4 border-t border-stone-200 text-center text-xs text-stone-500 font-sinhala">
        <p>StoryGlow · ඉංග්‍රීසි ඉගෙන ගන්නා ඔබ සඳහා සරල කෙටි කතා</p>
      </footer>
    </div>
  );
}
