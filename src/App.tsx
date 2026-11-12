import React, { useState } from 'react';
import { STORIES } from './data/stories';
import { BookContainer } from './components/BookContainer';
import { TableOfContentsPage } from './components/TableOfContentsPage';
import { GamesPage } from './components/GamesPage';
import { soundEffects } from './utils/audio';
import { BookOpen, Gamepad2 } from 'lucide-react';
import { StoryCategoryId } from './types/story';

export default function App() {
  const [currentView, setCurrentView] = useState<'toc' | 'reader' | 'games'>('toc');
  const [selectedCategoryId, setSelectedCategoryId] = useState<StoryCategoryId | null>(null);
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(STORIES[0]?.id ?? null);
  const [currentChapterNumber, setCurrentChapterNumber] = useState<number>(1);

  const currentStory = currentStoryId
    ? STORIES.find((s) => s.id === currentStoryId)
    : STORIES[0];

  const handleSelectStoryAndChapter = (storyId: string, chapterNumber: number) => {
    setCurrentStoryId(storyId);
    setCurrentChapterNumber(chapterNumber);
    setCurrentView('reader');
  };

  const handleGoHome = () => {
    soundEffects.playClick();
    setSelectedCategoryId(null);
    setCurrentView('toc');
  };

  const handleOpenGames = () => {
    soundEffects.playClick();
    setCurrentView('games');
  };

  return (
    <div className="min-h-screen midnight-indigo-backdrop text-[#F1F5F9] flex flex-col font-sans antialiased">
      {/* Clean Three-Zone Midnight Glass Top Navigation */}
      <header className="sticky top-0 z-40 bg-[rgba(8,13,28,0.88)] backdrop-blur-md border-b border-[rgba(165,180,252,0.14)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={handleGoHome}
            className="text-xl font-serif font-bold tracking-tight text-[#FFFFFF] whitespace-nowrap shrink-0 cursor-pointer hover:text-[#8FB4FF] transition-colors"
          >
            StoryGlow
          </button>

          {/* Zone 2: Concise Single-Line Category & Games Navigation Links */}
          <nav className="hidden md:flex items-center gap-3.5 lg:gap-6 text-xs lg:text-sm font-medium text-[#CBD5E1]">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setSelectedCategoryId('folktales');
                setCurrentView('toc');
              }}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                currentView === 'toc' && selectedCategoryId === 'folktales'
                  ? 'text-[#8CA8FF] font-semibold underline decoration-[#5B6CFF] underline-offset-4'
                  : 'text-[#CBD5E1]'
              }`}
            >
              ජන කතා
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setSelectedCategoryId('village');
                setCurrentView('toc');
              }}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                currentView === 'toc' && selectedCategoryId === 'village'
                  ? 'text-[#8CA8FF] font-semibold underline decoration-[#5B6CFF] underline-offset-4'
                  : 'text-[#CBD5E1]'
              }`}
            >
              ගැමි ජීවිතය
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setSelectedCategoryId('nature');
                setCurrentView('toc');
              }}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                currentView === 'toc' && selectedCategoryId === 'nature'
                  ? 'text-[#8CA8FF] font-semibold underline decoration-[#5B6CFF] underline-offset-4'
                  : 'text-[#CBD5E1]'
              }`}
            >
              සොබාදහම
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setSelectedCategoryId('heritage');
                setCurrentView('toc');
              }}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                currentView === 'toc' && selectedCategoryId === 'heritage'
                  ? 'text-[#8CA8FF] font-semibold underline decoration-[#5B6CFF] underline-offset-4'
                  : 'text-[#CBD5E1]'
              }`}
            >
              උරුමය හා ඉතිහාසය
            </button>
            <button
              type="button"
              onClick={handleOpenGames}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                currentView === 'games'
                  ? 'text-[#8CA8FF] font-semibold underline decoration-[#5B6CFF] underline-offset-4'
                  : 'text-[#CBD5E1]'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-[#8CA8FF]" />
              <span>Games</span>
            </button>
          </nav>

          {/* Zone 3: Mobile Games Link + Primary Contents Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOpenGames}
              className={`md:hidden inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                currentView === 'games' ? 'text-[#8CA8FF] underline underline-offset-4' : 'text-[#CBD5E1]'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#8CA8FF]" />
              <span>Games</span>
            </button>

            <button
              type="button"
              onClick={handleGoHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>පටුන (Contents)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {currentView === 'games' ? (
          <GamesPage stories={STORIES} onBackToToc={handleGoHome} />
        ) : currentView === 'toc' || !currentStory ? (
          <TableOfContentsPage
            stories={STORIES}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
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

      {/* Quiet Editorial Footer */}
      <footer className="py-5 bg-[rgba(7,11,24,0.82)] border-t border-[rgba(165,180,252,0.12)] text-center text-xs text-[#94A3B8] font-sinhala">
        <p>StoryGlow · ශ්‍රී ලාංකික පාඨකයන් සඳහා සරල ඉංග්‍රීසි කතා පුස්තකාලය</p>
      </footer>
    </div>
  );
}
