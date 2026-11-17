import React, { useState, useEffect, useCallback } from 'react';
import { STORIES } from './data/stories';
import { BookContainer } from './components/BookContainer';
import { TableOfContentsPage } from './components/TableOfContentsPage';
import { GamesPage } from './components/GamesPage';
import { WordbookPage } from './components/WordbookPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { InfoPages } from './components/InfoPages';
import { UserProgressProvider, useUserProgress } from './context/UserProgressContext';
import { soundEffects } from './utils/audio';
import {
  BookOpen,
  Gamepad2,
  Star,
  BarChart3,
  Flame,
  LogIn,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { StoryCategoryId } from './types/story';
import {
  AppRoute,
  ActiveGameId,
  InfoPageId,
  parseLocationToRoute,
  buildPathFromRoute,
  syncPageSeo,
} from './utils/router';

function AppShell() {
  const [route, setRoute] = useState<AppRoute>(() =>
    parseLocationToRoute(window.location.pathname, window.location.search)
  );
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const {
    user,
    authBusy,
    authError,
    savedWords,
    streakCount,
    signInWithGoogle,
    signOutUser,
    recordDailyVisit,
  } = useUserProgress();

  useEffect(() => {
    recordDailyVisit();
  }, [recordDailyVisit]);

  const navigateTo = useCallback((nextRoute: AppRoute, replace = false) => {
    const nextPath = buildPathFromRoute(nextRoute);
    const currentFull = `${window.location.pathname}${window.location.search}`;
    if (nextPath !== currentFull) {
      if (replace) {
        window.history.replaceState(null, '', nextPath);
      } else {
        window.history.pushState(null, '', nextPath);
      }
    }
    setRoute(nextRoute);
    setAccountMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseLocationToRoute(window.location.pathname, window.location.search));
      setAccountMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentStory =
    route.view === 'reader'
      ? STORIES.find((s) => s.id === route.storyId) || STORIES[0]
      : STORIES[0];

  useEffect(() => {
    syncPageSeo(route, route.view === 'reader' ? currentStory : undefined);
  }, [route, currentStory]);

  const selectedCategoryId: StoryCategoryId | null =
    route.view === 'toc' ? route.categoryId : null;

  const handleSelectCategory = (categoryId: StoryCategoryId | null) => {
    navigateTo({ view: 'toc', categoryId });
  };

  const handleSelectStoryAndChapter = (storyId: string, chapterNumber: number) => {
    navigateTo({ view: 'reader', storyId, chapterNumber });
  };

  const handleChapterChange = (newChapterNum: number) => {
    if (route.view === 'reader') {
      navigateTo({
        view: 'reader',
        storyId: route.storyId,
        chapterNumber: newChapterNum,
      });
    }
  };

  const handleGoHome = () => {
    soundEffects.playClick();
    navigateTo({ view: 'toc', categoryId: null });
  };

  const handleOpenGames = (gameId: ActiveGameId | null = null) => {
    soundEffects.playClick();
    navigateTo({ view: 'games', gameId });
  };

  const handleOpenWordbook = () => {
    soundEffects.playClick();
    navigateTo({ view: 'wordbook' });
  };

  const handleOpenAnalytics = () => {
    soundEffects.playClick();
    navigateTo({ view: 'analytics' });
  };

  const handleSelectInfoPage = (page: InfoPageId) => {
    soundEffects.playClick();
    navigateTo({ view: 'info', page });
  };

  const userInitial = (user?.displayName || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen midnight-indigo-backdrop text-[#F1F5F9] flex flex-col font-sans antialiased">
      {/* Clean Three-Zone Midnight Glass Top Navigation */}
      <header className="sticky top-0 z-40 bg-[rgba(8,13,28,0.88)] backdrop-blur-md border-b border-[rgba(165,180,252,0.14)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 lg:gap-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={handleGoHome}
            className="text-xl font-serif font-bold tracking-tight text-[#FFFFFF] whitespace-nowrap shrink-0 cursor-pointer hover:text-[#8FB4FF] transition-colors"
          >
            StoryGlow
          </button>

          {/* Zone 2: Concise Single-Line Category, Games & Wordbook Links */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-5 text-xs lg:text-sm font-medium text-[#CBD5E1]">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                handleSelectCategory('folktales');
              }}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                route.view === 'toc' && selectedCategoryId === 'folktales'
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
                handleSelectCategory('village');
              }}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                route.view === 'toc' && selectedCategoryId === 'village'
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
                handleSelectCategory('nature');
              }}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                route.view === 'toc' && selectedCategoryId === 'nature'
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
                handleSelectCategory('heritage');
              }}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                route.view === 'toc' && selectedCategoryId === 'heritage'
                  ? 'text-[#8CA8FF] font-semibold underline decoration-[#5B6CFF] underline-offset-4'
                  : 'text-[#CBD5E1]'
              }`}
            >
              උරුමය
            </button>
            <button
              type="button"
              onClick={() => handleOpenGames(null)}
              className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                route.view === 'games'
                  ? 'text-[#8CA8FF] font-semibold underline decoration-[#5B6CFF] underline-offset-4'
                  : 'text-[#CBD5E1]'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-[#8CA8FF]" />
              <span>Games</span>
            </button>
            <button
              type="button"
              onClick={handleOpenWordbook}
              className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#FFFFFF] ${
                route.view === 'wordbook'
                  ? 'text-[#FCD34D] font-semibold underline decoration-[#FBBF24] underline-offset-4'
                  : 'text-[#CBD5E1]'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>Wordbook{savedWords.length > 0 ? ` (${savedWords.length})` : ''}</span>
            </button>
          </nav>

          {/* Zone 3: Mobile Shortcuts + Google Account / Contents CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenGames(null)}
              className={`md:hidden inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                route.view === 'games' ? 'text-[#8CA8FF] underline underline-offset-4' : 'text-[#CBD5E1]'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#8CA8FF]" />
              <span>Games</span>
            </button>

            <button
              type="button"
              onClick={handleOpenWordbook}
              className={`md:hidden inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                route.view === 'wordbook' ? 'text-[#FCD34D] underline underline-offset-4' : 'text-[#CBD5E1]'
              }`}
              title="My Wordbook"
            >
              <Star className="w-3.5 h-3.5 text-[#FBBF24]" />
              {savedWords.length > 0 && <span>{savedWords.length}</span>}
            </button>

            {/* Google Account / Cloud Sync Menu */}
            <div className="relative">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setAccountMenuOpen((prev) => !prev);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#152042] hover:bg-[#1C2B57] border border-[rgba(165,180,252,0.25)] text-xs font-semibold text-[#FFFFFF] cursor-pointer whitespace-nowrap"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Learner'}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-[#5B6CFF] text-[#FFFFFF] flex items-center justify-center text-[11px] font-bold">
                      {userInitial}
                    </span>
                  )}
                  <span className="hidden sm:inline max-w-[90px] truncate">
                    {user.displayName?.split(' ')[0] || 'Account'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={authBusy}
                  onClick={() => {
                    soundEffects.playClick();
                    void signInWithGoogle();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#152042] hover:bg-[#1C2B57] border border-[rgba(165,180,252,0.25)] text-xs font-semibold text-[#E2E8F0] hover:text-[#FFFFFF] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap"
                  title="Sign in with Google to save progress across devices"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#8CA8FF]" />
                  <span>{authBusy ? 'Signing in...' : 'Sign In'}</span>
                </button>
              )}

              {user && accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0F172E] border border-[rgba(165,180,252,0.24)] shadow-2xl p-2 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-[rgba(165,180,252,0.14)] mb-1">
                    <p className="font-bold text-[#FFFFFF] truncate">
                      {user.displayName || 'StoryGlow Learner'}
                    </p>
                    <p className="text-[11px] text-[#94A3B8] truncate">{user.email}</p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[#FCD34D] font-semibold">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{streakCount} Day Streak · Cloud Synced</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenWordbook}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#18244A] text-[#E2E8F0] flex items-center gap-2 cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 text-[#FBBF24]" />
                    <span>My Wordbook ({savedWords.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenAnalytics}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#18244A] text-[#E2E8F0] flex items-center gap-2 cursor-pointer"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-[#8CA8FF]" />
                    <span>Visitor & Story Stats</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setAccountMenuOpen(false);
                      void signOutUser();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[rgba(76,5,25,0.55)] text-[#FDA4AF] flex items-center gap-2 cursor-pointer mt-1 border-t border-[rgba(165,180,252,0.12)]"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleGoHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">පටුන (Contents)</span>
              <span className="sm:hidden">පටුන</span>
            </button>
          </div>
        </div>

        {authError && (
          <div className="bg-[rgba(76,5,25,0.9)] border-t border-[rgba(251,113,133,0.4)] px-4 py-2 text-center text-xs text-[#FFE4E6]">
            {authError}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {route.view === 'games' ? (
          <GamesPage
            stories={STORIES}
            selectedGameId={route.gameId}
            onSelectGame={(gameId) => navigateTo({ view: 'games', gameId })}
            onBackToToc={handleGoHome}
          />
        ) : route.view === 'wordbook' ? (
          <WordbookPage
            onBackToStories={handleGoHome}
            onSelectStory={(storyId) => handleSelectStoryAndChapter(storyId, 1)}
          />
        ) : route.view === 'analytics' ? (
          <AnalyticsPage
            onBackHome={handleGoHome}
            onSelectStory={(storyId) => handleSelectStoryAndChapter(storyId, 1)}
          />
        ) : route.view === 'info' ? (
          <InfoPages
            page={route.page}
            onNavigateInfo={handleSelectInfoPage}
            onBackHome={handleGoHome}
          />
        ) : route.view === 'toc' ? (
          <TableOfContentsPage
            stories={STORIES}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
            onSelectStoryAndChapter={handleSelectStoryAndChapter}
            onOpenWordbook={handleOpenWordbook}
          />
        ) : (
          <BookContainer
            story={currentStory}
            currentChapterNumber={route.chapterNumber}
            onChapterChange={handleChapterChange}
            onBackToStories={handleGoHome}
          />
        )}
      </main>

      {/* Editorial & Legal Launch Footer */}
      <footer className="py-7 px-4 bg-[rgba(7,11,24,0.88)] border-t border-[rgba(165,180,252,0.12)] text-xs text-[#94A3B8]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-[#CBD5E1] font-medium font-sinhala">
              StoryGlow · ශ්‍රී ලාංකික පාඨකයන් සඳහා සරල ඉංග්‍රීසි කතා පුස්තකාලය
            </p>
            <p className="text-[11px] text-[#64748B] mt-1">
              © {new Date().getFullYear()} StoryGlow. Free bilingual reading & vocabulary games.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#CBD5E1]"
          >
            <button
              type="button"
              onClick={handleGoHome}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Stories
            </button>
            <button
              type="button"
              onClick={() => handleOpenGames(null)}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Games
            </button>
            <button
              type="button"
              onClick={handleOpenWordbook}
              className={`hover:text-[#FFFFFF] transition-colors cursor-pointer ${
                route.view === 'wordbook' ? 'text-[#FCD34D] font-semibold' : ''
              }`}
            >
              Wordbook
            </button>
            <button
              type="button"
              onClick={handleOpenAnalytics}
              className={`hover:text-[#FFFFFF] transition-colors cursor-pointer ${
                route.view === 'analytics' ? 'text-[#8CA8FF] font-semibold' : ''
              }`}
            >
              Visitor Analytics
            </button>
            <button
              type="button"
              onClick={() => handleSelectInfoPage('about')}
              className={`hover:text-[#FFFFFF] transition-colors cursor-pointer ${
                route.view === 'info' && route.page === 'about' ? 'text-[#8CA8FF] font-semibold' : ''
              }`}
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => handleSelectInfoPage('contact')}
              className={`hover:text-[#FFFFFF] transition-colors cursor-pointer ${
                route.view === 'info' && route.page === 'contact' ? 'text-[#8CA8FF] font-semibold' : ''
              }`}
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => handleSelectInfoPage('privacy-policy')}
              className={`hover:text-[#FFFFFF] transition-colors cursor-pointer ${
                route.view === 'info' && route.page === 'privacy-policy'
                  ? 'text-[#8CA8FF] font-semibold'
                  : ''
              }`}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => handleSelectInfoPage('terms')}
              className={`hover:text-[#FFFFFF] transition-colors cursor-pointer ${
                route.view === 'info' && route.page === 'terms' ? 'text-[#8CA8FF] font-semibold' : ''
              }`}
            >
              Terms of Use
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <UserProgressProvider>
      <AppShell />
    </UserProgressProvider>
  );
}

