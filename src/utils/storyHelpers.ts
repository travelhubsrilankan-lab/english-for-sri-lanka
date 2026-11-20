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

const IRREGULAR_BASE_MAP: Record<string, string> = {
  gave: 'give',
  given: 'give',
  went: 'go',
  gone: 'go',
  saw: 'see',
  seen: 'see',
  heard: 'hear',
  took: 'take',
  taken: 'take',
  found: 'find',
  became: 'become',
  said: 'say',
  knew: 'know',
  known: 'know',
  ran: 'run',
  made: 'make',
  came: 'come',
  kept: 'keep',
  won: 'win',
  ate: 'eat',
  drank: 'drink',
  brought: 'bring',
  thought: 'think',
  told: 'tell',
  wrote: 'write',
  read: 'read',
  spent: 'spend',
  began: 'begin',
  grew: 'grow',
  held: 'hold',
};

function findMatchingVocab(
  cleanedToken: string,
  lookup: Map<string, VocabularyWord>
): VocabularyWord | undefined {
  if (!cleanedToken) return undefined;
  const exact = lookup.get(cleanedToken);
  if (exact) return exact;

  const irregularBase = IRREGULAR_BASE_MAP[cleanedToken];
  if (irregularBase && lookup.has(irregularBase)) {
    return lookup.get(irregularBase);
  }

  // Match simple plural / verb endings back to base vocabulary word
  for (const [key, vocab] of lookup.entries()) {
    const stemY = key.endsWith('y') ? key.slice(0, -1) : null;
    const stemE = key.endsWith('e') ? key.slice(0, -1) : null;
    if (
      cleanedToken === `${key}s` ||
      cleanedToken === `${key}es` ||
      cleanedToken === `${key}ed` ||
      cleanedToken === `${key}ing` ||
      cleanedToken === `${key}d` ||
      (stemY && (cleanedToken === `${stemY}ied` || cleanedToken === `${stemY}ies`)) ||
      (stemE && cleanedToken === `${stemE}ing`)
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
  const rawTokens = englishText.split(/\s+/).filter(Boolean);
  const cleanTokens = rawTokens.map((t) =>
    t.replace(/^[“"‘'(`—–-]+|[”"’'.,!?;:)—–-]+$/g, '').toLowerCase()
  );

  // Collect multi-word vocab phrases (longest first)
  const multiWordKeys = Array.from(lookup.keys())
    .filter((k) => k.includes(' '))
    .sort((a, b) => b.split(' ').length - a.split(' ').length);

  const result: StoryWordToken[] = [];
  let i = 0;

  while (i < rawTokens.length) {
    let matchedPhrase: { length: number; vocab: VocabularyWord } | null = null;

    for (const phraseKey of multiWordKeys) {
      const phraseParts = phraseKey.split(' ');
      if (i + phraseParts.length > rawTokens.length) continue;

      const slice = cleanTokens.slice(i, i + phraseParts.length);
      const isMatch = phraseParts.every((part, idx) => {
        const tok = slice[idx];
        if (tok === part) return true;
        if (idx === 0 && IRREGULAR_BASE_MAP[tok] === part) return true;
        if (idx === phraseParts.length - 1) {
          return tok === `${part}s` || tok === `${part}es` || tok === `${part}ed`;
        }
        return false;
      });

      if (isMatch) {
        matchedPhrase = { length: phraseParts.length, vocab: lookup.get(phraseKey)! };
        break;
      }
    }

    if (matchedPhrase) {
      const combinedDisplay = rawTokens.slice(i, i + matchedPhrase.length).join(' ');
      const combinedClean = cleanTokens.slice(i, i + matchedPhrase.length).join(' ');
      result.push({
        cleanWord: combinedClean,
        displayWord: combinedDisplay,
        vocab: matchedPhrase.vocab,
      });
      i += matchedPhrase.length;
      continue;
    }

    const displayWord = rawTokens[i];
    const cleanWord = cleanTokens[i];
    result.push({
      cleanWord,
      displayWord,
      vocab: findMatchingVocab(cleanWord, lookup),
    });
    i += 1;
  }

  return result;
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
