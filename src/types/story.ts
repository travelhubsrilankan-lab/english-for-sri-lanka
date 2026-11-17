export type StoryCategoryId = 'folktales' | 'village' | 'nature' | 'inspiring-lives';

export type StoryLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StoryCategory {
  id: StoryCategoryId;
  titleEn: string;
  titleSi: string;
  descriptionSi: string;
  image: string;
}

export interface StoryVocabularyItem {
  word: string;
  sinhalaMeaning: string;
  example: string;
  phonetic?: string;
  partOfSpeech?: string;
}

export interface StoryQuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StoryMoral {
  messageEn: string;
  messageSi: string;
  adviceSi: string;
}

export interface Story {
  id: string;
  categoryId: StoryCategoryId;
  title: string;
  titleSi: string;
  summarySi: string;
  level: StoryLevel;
  readingMinutes: number;
  hasAudio: boolean;
  coverImage: string;
  paragraphs: string[];
  paragraphsSi?: string[];
  vocabulary: StoryVocabularyItem[];
  quiz: StoryQuizItem[];
  moral?: StoryMoral;
}

export interface VocabularyWord {
  word: string;
  sinhalaMeaning: string;
  example: string;
  englishDefinition: string;
  phonetic?: string;
  partOfSpeech?: string;
}

export interface StoryWordToken {
  cleanWord: string;
  displayWord: string;
  vocab?: VocabularyWord;
}

export interface StorySentence {
  id: string;
  paragraphIndex: number;
  englishText: string;
  sinhalaTranslation?: string;
  words: StoryWordToken[];
}
