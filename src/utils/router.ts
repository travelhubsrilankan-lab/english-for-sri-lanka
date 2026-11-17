import { Story, StoryCategoryId } from '../types/story';
import { STORIES, STORY_CATEGORIES } from '../data/stories';

export type ActiveGameId = 'match' | 'scramble' | 'cloze' | 'speed' | 'detective';
export type InfoPageId = 'about' | 'contact' | 'privacy-policy' | 'terms';

export type AppRoute =
  | { view: 'toc'; categoryId: StoryCategoryId | null }
  | { view: 'reader'; storyId: string; chapterNumber: number }
  | { view: 'games'; gameId: ActiveGameId | null }
  | { view: 'wordbook' }
  | { view: 'analytics' }
  | { view: 'info'; page: InfoPageId };

const VALID_CATEGORIES = new Set<StoryCategoryId>([
  'folktales',
  'village',
  'nature',
  'heritage',
]);

const VALID_GAMES = new Set<ActiveGameId>([
  'match',
  'scramble',
  'cloze',
  'speed',
  'detective',
]);

// Convenient short shareable URL aliases so links like /story/sigiriya work too
const STORY_ALIASES: Record<string, string> = {
  sigiriya: 'true-treasure-of-sigiriya',
  'turtle-monkey': 'clever-turtle-greedy-monkey',
  'ctb-bus': 'crazy-ctb-bus-adventure',
  yala: 'giant-with-gentle-heart',
  potter: 'wise-potter-clay-lamp',
  cinnamon: 'golden-cinnamon-loaf',
  rekawa: 'midnight-sea-turtle-rekawa',
  'galle-clock': 'secret-of-galle-clock-tower',
};

function resolveStoryId(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  const aliased = STORY_ALIASES[normalized] || normalized;
  const found = STORIES.find((s) => s.id.toLowerCase() === aliased);
  return found ? found.id : null;
}

export function parseLocationToRoute(
  pathname: string = window.location.pathname,
  search: string = window.location.search
): AppRoute {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean).map((s) => decodeURIComponent(s));

  if (segments.length === 0) {
    return { view: 'toc', categoryId: null };
  }

  const first = segments[0].toLowerCase();

  if (first === 'wordbook' || first === 'flashcards') return { view: 'wordbook' };
  if (first === 'analytics' || first === 'stats') return { view: 'analytics' };
  if (first === 'about') return { view: 'info', page: 'about' };
  if (first === 'contact') return { view: 'info', page: 'contact' };
  if (first === 'privacy-policy' || first === 'privacy') {
    return { view: 'info', page: 'privacy-policy' };
  }
  if (first === 'terms' || first === 'terms-of-use') {
    return { view: 'info', page: 'terms' };
  }

  if (first === 'games') {
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
    if (matchedStoryId) {
      const params = new URLSearchParams(search);
      const partParam = params.get('part') || (segments[2] === 'part' ? segments[3] : null);
      const parsedPart = partParam ? Number.parseInt(partParam, 10) : 1;
      const storyObj = STORIES.find((s) => s.id === matchedStoryId);
      const maxChapters = storyObj ? storyObj.chapters.length : 4;
      const validChapter =
        Number.isFinite(parsedPart) && parsedPart >= 1 && parsedPart <= maxChapters
          ? parsedPart
          : 1;
      return {
        view: 'reader',
        storyId: matchedStoryId,
        chapterNumber: validChapter,
      };
    }
  }

  return { view: 'toc', categoryId: null };
}

export function buildPathFromRoute(route: AppRoute): string {
  switch (route.view) {
    case 'toc':
      return route.categoryId ? `/category/${route.categoryId}` : '/';
    case 'reader':
      return route.chapterNumber > 1
        ? `/story/${route.storyId}?part=${route.chapterNumber}`
        : `/story/${route.storyId}`;
    case 'games':
      return route.gameId ? `/games/${route.gameId}` : '/games';
    case 'wordbook':
      return '/wordbook';
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
  let title = 'StoryGlow – Bilingual English-Sinhala Stories & Games';
  let description =
    'Read Sri Lankan English stories with Sinhala meanings, listen to audio narration, and practice vocabulary with fun word games on StoryGlow.';

  if (route.view === 'toc' && route.categoryId) {
    const cat = STORY_CATEGORIES.find((c) => c.id === route.categoryId);
    if (cat) {
      title = `${cat.titleEn} – StoryGlow`;
      description = `${cat.descriptionSi}. Read bilingual English-Sinhala stories with audio narration and vocabulary help.`;
    }
  } else if (route.view === 'reader' && activeStory) {
    title = `${activeStory.titleEn} – StoryGlow`;
    description = `Read "${activeStory.titleEn}" (${activeStory.titleSi}) in English with Sinhala meanings, audio narration, and quiz on StoryGlow.`;
  } else if (route.view === 'games') {
    const gameLabels: Record<ActiveGameId, string> = {
      match: 'Word Match Memory',
      scramble: 'Word Scramble',
      cloze: 'Missing Word Story',
      speed: 'Speed Spell',
      detective: 'Word Detective',
    };
    if (route.gameId) {
      title = `${gameLabels[route.gameId]} – StoryGlow Games`;
      description = `Play ${gameLabels[route.gameId]} to practice English words from Sri Lankan stories on StoryGlow.`;
    } else {
      title = 'English Word Games – StoryGlow';
      description =
        'Practice English words and sentences from Sri Lankan stories with 5 interactive learning games on StoryGlow.';
    }
  } else if (route.view === 'wordbook') {
    title = 'My Wordbook & Flashcards – StoryGlow';
    description =
      'Review your bookmarked English words and practice Sinhala meanings with interactive flashcards on StoryGlow.';
  } else if (route.view === 'analytics') {
    title = 'Visitor & Reading Analytics – StoryGlow';
    description =
      'View daily StoryGlow visitor statistics, most-read Sri Lankan stories, and personal learning progress.';
  } else if (route.view === 'info') {
    const infoTitles: Record<InfoPageId, { t: string; d: string }> = {
      about: {
        t: 'About StoryGlow – Bilingual English Storybook',
        d: 'Learn how StoryGlow helps Sri Lankan students and English learners improve reading, listening, and vocabulary through stories and games.',
      },
      contact: {
        t: 'Contact Us – StoryGlow',
        d: 'Get in touch with the StoryGlow team for story suggestions, feedback, or support.',
      },
      'privacy-policy': {
        t: 'Privacy Policy – StoryGlow',
        d: 'Read the StoryGlow Privacy Policy covering browser storage, cookies, third-party services, and learner privacy.',
      },
      terms: {
        t: 'Terms of Use – StoryGlow',
        d: 'Review the Terms of Use for reading stories and playing educational games on StoryGlow.',
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
