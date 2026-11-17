import {
  Story,
  StoryLevel,
  StorySentence,
  StoryVocabularyItem,
  StoryWordToken,
  VocabularyWord,
} from '../types/story';

export const LEVEL_META: Record<
  StoryLevel,
  { labelEn: StoryLevel; labelSi: string; shortLabel: string; badgeClass: string }
> = {
  Beginner: {
    labelEn: 'Beginner',
    labelSi: 'ආරම්භක',
    shortLabel: 'Beginner · ආරම්භක',
    badgeClass:
      'bg-[rgba(16,185,129,0.14)] text-[#6EE7B7] border border-[rgba(52,211,153,0.35)]',
  },
  Intermediate: {
    labelEn: 'Intermediate',
    labelSi: 'මධ්‍යම',
    shortLabel: 'Intermediate · මධ්‍යම',
    badgeClass:
      'bg-[rgba(99,102,241,0.16)] text-[#9CB8FF] border border-[rgba(129,140,248,0.38)]',
  },
  Advanced: {
    labelEn: 'Advanced',
    labelSi: 'උසස්',
    shortLabel: 'Advanced · උසස්',
    badgeClass:
      'bg-[rgba(245,158,11,0.14)] text-[#FCD34D] border border-[rgba(251,191,36,0.35)]',
  },
};

export function maskWordInExample(example: string, word: string): string {
  const safeExample = (example || '').trim();
  const safeWord = (word || '').trim();
  if (!safeExample || !safeWord) {
    return safeExample || 'Read the letters and choose the matching word.';
  }
  const escaped = safeWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`\\b${escaped}(?:s|es|ed|ing)?\\b`, 'gi');
  const masked = safeExample.replace(pattern, '_____');
  return masked;
}

export function toVocabularyWord(item: StoryVocabularyItem): VocabularyWord {
  const cleanExample = (item.example || '').trim();
  return {
    word: item.word,
    sinhalaMeaning: item.sinhalaMeaning,
    example: cleanExample,
    englishDefinition: cleanExample ? maskWordInExample(cleanExample, item.word) : item.word,
    phonetic: item.phonetic || '',
    partOfSpeech: item.partOfSpeech || 'word',
  };
}

export function getStoryVocabWords(story: Story): VocabularyWord[] {
  const seen = new Set<string>();
  const result: VocabularyWord[] = [];
  for (const item of story.vocabulary || []) {
    const key = item.word.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(toVocabularyWord(item));
  }
  return result;
}

function buildVocabLookup(vocabulary: StoryVocabularyItem[]): Map<string, VocabularyWord> {
  const map = new Map<string, VocabularyWord>();
  for (const item of vocabulary || []) {
    const normalized = toVocabularyWord(item);
    const key = normalized.word.trim().toLowerCase();
    if (key) {
      map.set(key, normalized);
    }
  }
  return map;
}

function findMatchingVocab(
  cleanedToken: string,
  lookup: Map<string, VocabularyWord>
): VocabularyWord | undefined {
  if (!cleanedToken) return undefined;
  const exact = lookup.get(cleanedToken);
  if (exact) return exact;

  // Match simple plural / verb endings back to base vocabulary word
  for (const [key, vocab] of lookup.entries()) {
    if (
      cleanedToken === `${key}s` ||
      cleanedToken === `${key}es` ||
      cleanedToken === `${key}ed` ||
      cleanedToken === `${key}ing` ||
      cleanedToken === `${key}d`
    ) {
      return vocab;
    }
  }
  return undefined;
}

export function tokenizeSentenceText(
  englishText: string,
  vocabulary: StoryVocabularyItem[]
): StoryWordToken[] {
  const lookup = buildVocabLookup(vocabulary);
  return englishText
    .split(/\s+/)
    .filter(Boolean)
    .map((displayWord) => {
      const cleanWord = displayWord
        .replace(/^[“"‘'(`—–-]+|[”"’'.,!?;:)—–-]+$/g, '')
        .toLowerCase();
      return {
        cleanWord,
        displayWord,
        vocab: findMatchingVocab(cleanWord, lookup),
      };
    });
}

export function extractStorySentences(story: Story): StorySentence[] {
  const sentences: StorySentence[] = [];
  const paragraphs = story.paragraphs || [];

  paragraphs.forEach((paragraphText, pIndex) => {
    const trimmedParagraph = paragraphText.trim();
    if (!trimmedParagraph) return;

    const rawSentences =
      trimmedParagraph.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [trimmedParagraph];

    rawSentences.forEach((rawSentence, sIndex) => {
      const englishText = rawSentence.trim();
      if (!englishText) return;

      const isLastInParagraph = sIndex === rawSentences.length - 1;
      const sinhalaTranslation = isLastInParagraph ? story.paragraphsSi?.[pIndex] : undefined;

      sentences.push({
        id: `${story.id}-p${pIndex + 1}-s${sIndex + 1}`,
        paragraphIndex: pIndex,
        englishText,
        sinhalaTranslation,
        words: tokenizeSentenceText(englishText, story.vocabulary || []),
      });
    });
  });

  return sentences;
}
