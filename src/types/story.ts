export interface VocabularyWord {
  word: string;
  phonetic: string;
  sinhalaMeaning: string;
  englishDefinition: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition';
  highlight?: boolean;
}

export interface StorySentence {
  id: string;
  englishText: string;
  sinhalaTranslation: string;
  words: {
    cleanWord: string;
    displayWord: string;
    vocab?: VocabularyWord;
  }[];
}

export type SceneType = 'garden_seed' | 'fox_star' | 'ocean_lighthouse' | 'none';

export interface Chapter {
  id: string;
  chapterNumber: number;
  titleEn: string;
  titleSi: string;
  subtitleEn: string;
  subtitleSi: string;
  summaryEn: string;
  summarySi: string;
  sentences: StorySentence[];
  sceneType?: SceneType;
  sceneMood?: string;
  keyVocabulary: VocabularyWord[];
  funFactEn: string;
  funFactSi: string;
}

export interface StoryQuizQuestion {
  id: string;
  questionEn: string;
  questionSi: string;
  options: string[];
  optionsSi: string[];
  correctIndex: number;
  explanationSi: string;
}

export interface StoryCategory {
  id: 'mystery' | 'nature' | 'scifi' | 'kindness';
  titleEn: string;
  titleSi: string;
  descriptionSi: string;
  badgeColor: string;
  coverImage?: string;
}

export interface Story {
  id: string;
  categoryId: 'mystery' | 'nature' | 'scifi' | 'kindness';
  categoryTitleEn: string;
  categoryTitleSi: string;
  titleEn: string;
  titleSi: string;
  level: 'Beginner (A1)' | 'Elementary (A2)' | 'Intermediate (B1)';
  genreEn: string;
  genreSi: string;
  estimatedMinutes: number;
  coverAccent: string;
  coverImage?: string;
  theme: 'nature' | 'mystic' | 'maritime' | 'steampunk' | 'adventure' | 'scifi' | 'community';
  chapters: Chapter[];
  quiz: StoryQuizQuestion[];
}
