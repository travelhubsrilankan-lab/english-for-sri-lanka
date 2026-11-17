import { Story, StoryCategoryId } from '../types/story';
import { STORIES } from '../data/stories';
import { CATEGORIES } from '../data/categories';

export type ActiveGameId = 'match' | 'scramble' | 'cloze' | 'speed' | 'detective';
export type InfoPageId = 'about' | 'contact' | 'privacy-policy' | 'terms';

export type AppRoute =
  | { view: 'toc'; categoryId: StoryCategoryId | null }
  | { view: 'reader'; storyId: string }
  | { view: 'games'; gameId: ActiveGameId | null }
  | { view: 'wordbook' }
  | { view: 'analytics' }
  | { view: 'info'; page: InfoPageId };

const VALID_CATEGORIES = new Set<StoryCategoryId>([
  'folktales',
  'village',
  'nature',
  'inspiring-lives',
]);

const VALID_GAMES = new Set<ActiveGameId>([
  'match',
  'scramble',
  'cloze',
  'speed',
  'detective',
]);

function resolveStoryId(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  const found = STORIES.find((s) => s.id.toLowerCase() === normalized);
  return found ? found.id : null;
}

export function parseLocationToRoute(
  pathname: string = window.location.pathname
): AppRoute {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean).map((s) => decodeURIComponent(s));

  if (segments.length === 0) {
    return { view: 'toc', categoryId: null };
  }

  const first = segments[0].toLowerCase();

  if (first === 'my-words' || first === 'wordbook' || first === 'flashcards') {
    return { view: 'wordbook' };
  }
  if (first === 'analytics' || first === 'stats') {
    return { view: 'analytics' };
  }
  if (first === 'about') return { view: 'info', page: 'about' };
  if (first === 'contact') return { view: 'info', page: 'contact' };
  if (first === 'privacy-policy' || first === 'privacy') {
    return { view: 'info', page: 'privacy-policy' };
  }
  if (first === 'terms' || first === 'terms-of-use') {
    return { view: 'info', page: 'terms' };
  }

  if (first === 'practice' || first === 'games') {
    const maybeGame = segments[1]?.toLowerCase() as ActiveGameId | undefined;
    return {
      view: 'games',
      gameId: maybeGame && VALID_GAMES.has(maybeGame) ? maybeGame : null,
    };
  }

  if (first === 'category' && segments[1]) {
    const cat = segments[1].toLowerCase() as StoryCategoryId;
    if (VALID_CATEGORIES.has(cat)) {
      return { view: 'toc', categoryId: cat };
    }
  }

  if (first === 'story' && segments[1]) {
    const matchedStoryId = resolveStoryId(segments[1]);
    return {
      view: 'reader',
      storyId: matchedStoryId || segments[1],
    };
  }

  return { view: 'toc', categoryId: null };
}

export function buildPathFromRoute(route: AppRoute): string {
  switch (route.view) {
    case 'toc':
      return route.categoryId ? `/category/${route.categoryId}` : '/';
    case 'reader':
      return `/story/${route.storyId}`;
    case 'games':
      return route.gameId ? `/practice/${route.gameId}` : '/practice';
    case 'wordbook':
      return '/my-words';
    case 'analytics':
      return '/analytics';
    case 'info':
      return `/${route.page}`;
  }
}

function setMetaTag(selector: string, attribute: 'content' | 'href', value: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attribute, value);
  }
}

export function syncPageSeo(route: AppRoute, activeStory?: Story) {
  let title = 'StoryGlow | ශ්‍රී ලාංකික ඉංග්‍රීසි කතා පුස්තකාලය';
  let description =
    'සිංහල අර්ථ, ශ්‍රව්‍ය උච්චාරණය සහ ක්‍රීඩා සමඟ සරල ඉංග්‍රීසි කතා කියවා ඉගෙන ගන්න. Read bilingual English stories with Sinhala meanings, audio narration, quizzes, and vocabulary practice on StoryGlow.';

  if (route.view === 'toc' && route.categoryId) {
    const cat = CATEGORIES.find((c) => c.id === route.categoryId);
    if (cat) {
      title = `${cat.titleEn} (${cat.titleSi}) | StoryGlow`;
      description = `${cat.descriptionSi}. Read English stories with Sinhala vocabulary and quizzes on StoryGlow.`;
    }
  } else if (route.view === 'reader' && activeStory) {
    title = `${activeStory.title} (${activeStory.titleSi}) | StoryGlow`;
    description = `${activeStory.summarySi} Read "${activeStory.title}" in English with Sinhala word meanings, audio narration, and quiz on StoryGlow.`;
  } else if (route.view === 'games') {
    const gameLabels: Record<ActiveGameId, string> = {
      match: 'Word Match Memory',
      scramble: 'Word Scramble',
      cloze: 'Missing Word Story',
      speed: 'Speed Spell',
      detective: 'Word Detective',
    };
    if (route.gameId) {
      title = `${gameLabels[route.gameId]} | StoryGlow Practice`;
      description = `Play ${gameLabels[route.gameId]} to practice English vocabulary with Sinhala meanings on StoryGlow.`;
    } else {
      title = 'Practice & පුහුණුව | StoryGlow';
      description =
        'Practice English comprehension quizzes and interactive vocabulary games with Sinhala meanings on StoryGlow.';
    }
  } else if (route.view === 'wordbook') {
    title = 'My Words & Flashcards · මගේ වචන | StoryGlow';
    description =
      'Review your saved English words with Sinhala meanings and interactive flashcards on StoryGlow.';
  } else if (route.view === 'analytics') {
    title = 'Visitor & Story Analytics | StoryGlow';
    description =
      'View daily StoryGlow visitor statistics, most-read stories, and your personal reading progress.';
  } else if (route.view === 'info') {
    const infoTitles: Record<InfoPageId, { t: string; d: string }> = {
      about: {
        t: 'About StoryGlow | ශ්‍රී ලාංකික ඉංග්‍රීසි කතා පුස්තකාලය',
        d: 'Learn how StoryGlow helps Sri Lankan students and English learners improve reading, listening, and vocabulary through stories and practice.',
      },
      contact: {
        t: 'Contact Us | StoryGlow',
        d: 'Get in touch with the StoryGlow team for story suggestions, feedback, or support.',
      },
      'privacy-policy': {
        t: 'Privacy Policy | StoryGlow',
        d: 'Read the StoryGlow Privacy Policy covering browser storage, cookies, and learner privacy.',
      },
      terms: {
        t: 'Terms of Use | StoryGlow',
        d: 'Review the Terms of Use for reading stories and practicing English on StoryGlow.',
      },
    };
    title = infoTitles[route.page].t;
    description = infoTitles[route.page].d;
  }

  document.title = title;
  const fullUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
  const ogImageUrl = `${window.location.origin}/og-image.jpg`;

  setMetaTag('meta[name="description"]', 'content', description);
  setMetaTag('meta[property="og:title"]', 'content', title);
  setMetaTag('meta[property="og:description"]', 'content', description);
  setMetaTag('meta[property="og:url"]', 'content', fullUrl);
  setMetaTag('meta[property="og:image"]', 'content', ogImageUrl);
  setMetaTag('meta[name="twitter:title"]', 'content', title);
  setMetaTag('meta[name="twitter:description"]', 'content', description);
  setMetaTag('meta[name="twitter:image"]', 'content', ogImageUrl);

  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.rel = 'canonical';
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.href = fullUrl;
}
