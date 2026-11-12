import React, { useState, useEffect } from 'react';
import { Story, VocabularyWord } from '../types/story';
import { WordMatchGame } from './games/WordMatchGame';
import { WordScrambleGame } from './games/WordScrambleGame';
import { StoryFillBlankGame } from './games/StoryFillBlankGame';
import { soundEffects } from '../utils/audio';
import {
  ArrowLeft,
  ArrowRight,
  Grid2X2,
  SpellCheck2,
  BookOpenCheck,
  Layers,
  Gamepad2,
  Trophy,
} from 'lucide-react';

interface GamesPageProps {
  stories: Story[];
  onBackToToc: () => void;
}

type ActiveGameId = 'match' | 'scramble' | 'cloze' | null;

interface BestScores {
  match: number;
  scramble: number;
  cloze: number;
}

const STORAGE_KEY = 'storyglow_game_best_scores';

export const GamesPage: React.FC<GamesPageProps> = ({ stories, onBackToToc }) => {
  const [activeGame, setActiveGame] = useState<ActiveGameId>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string>('all');
  const [bestScores, setBestScores] = useState<BestScores>({
    match: 0,
    scramble: 0,
    cloze: 0,
  });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<BestScores>;
        setBestScores({
          match: Number(parsed.match) || 0,
          scramble: Number(parsed.scramble) || 0,
          cloze: Number(parsed.cloze) || 0,
        });
      }
    } catch {
      // Ignore storage access restrictions
    }
  }, []);

  const updateBestScore = (game: keyof BestScores, newScore: number) => {
    setBestScores((prev) => {
      if (newScore <= prev[game]) return prev;
      const updated = { ...prev, [game]: newScore };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage restrictions
      }
      return updated;
    });
  };

  // Build deduplicated vocabulary pool across selected stories or all stories
  const selectedStories =
    selectedStoryId === 'all'
      ? stories
      : stories.filter((s) => s.id === selectedStoryId);

  const extractUniqueVocab = (list: Story[]): VocabularyWord[] => {
    const raw = list.flatMap((s) => s.chapters.flatMap((c) => c.keyVocabulary));
    return Array.from(new Map(raw.map((v) => [v.word.toLowerCase(), v])).values());
  };

  const activeVocabPool = extractUniqueVocab(selectedStories);
  const allVocabPool = extractUniqueVocab(stories);

  const selectedStoryObj =
    selectedStoryId === 'all'
      ? null
      : stories.find((s) => s.id === selectedStoryId) || null;

  const storyLabel = selectedStoryObj
    ? selectedStoryObj.titleEn
    : `All ${stories.length} Stories`;

  const sentenceCount = selectedStories.reduce(
    (sum, s) =>
      sum +
      s.chapters.reduce(
        (cSum, c) =>
          cSum + c.sentences.filter((sent) => sent.words.some((w) => !!w.vocab)).length,
        0
      ),
    0
  );

  const gameMeta = [
    {
      id: 'match' as const,
      num: '01',
      titleEn: 'Word Match Memory',
      subtitleEn: 'Word to Meaning Pairs',
      descEn:
        'Flip cards to match each English word with its English clue. Sinhala meanings unlock once a pair is matched.',
      badgeInfo: '6 – 10 Pairs',
      bestScore: bestScores.match,
      icon: Grid2X2,
    },
    {
      id: 'scramble' as const,
      num: '02',
      titleEn: 'Word Scramble',
      subtitleEn: 'Letter Tile Builder',
      descEn:
        'Arrange shuffled letters to spell the English word from its definition and audio clue. Reveals Sinhala meaning on solve.',
      badgeInfo: '8 Words',
      bestScore: bestScores.scramble,
      icon: SpellCheck2,
    },
    {
      id: 'cloze' as const,
      num: '03',
      titleEn: 'Missing Word Story',
      subtitleEn: 'Context Sentence Challenge',
      descEn:
        'Pick the missing English word to complete real story sentences. Full Sinhala translation appears after answering.',
      badgeInfo: '8 Sentences',
      bestScore: bestScores.cloze,
      icon: BookOpenCheck,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Header (English Only Before Gameplay) */}
      <div className="text-center mb-9">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-[#8CA8FF] mb-2.5">
            <span>English Practice Games</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Vocabulary & Context</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight [text-wrap:balance]">
            <span className="text-[#FFFFFF]">StoryGlow </span>
            <span className="text-indigo-gradient">Games</span>
          </h1>

          <p className="mt-3.5 text-[#CBD5E1] text-sm sm:text-base leading-relaxed tracking-[0.01em]">
            Practice English words and real story sentences through interactive challenges. Sinhala meanings appear after you answer.
          </p>
        </div>

        {/* Story Pack Filter Strip */}
        <div className="mt-7 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[rgba(13,20,41,0.92)] rounded-xl border border-[rgba(165,180,252,0.18)] shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setSelectedStoryId('all');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                selectedStoryId === 'all'
                  ? 'bg-indigo-tab text-[#FFFFFF]'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.06)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Stories ({stories.length})</span>
            </button>

            {stories.map((s) => {
              const isSelected = selectedStoryId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedStoryId(s.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-indigo-tab text-[#FFFFFF]'
                      : 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.06)]'
                  }`}
                >
                  {s.coverImage && (
                    <img
                      src={s.coverImage}
                      alt={s.titleEn}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-md object-cover border border-[rgba(255,255,255,0.22)] shrink-0"
                    />
                  )}
                  <span className="truncate max-w-[155px]">{s.titleEn.replace(/^The\s+/i, '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Unboxed Active Pool Metadata */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#94A3B8] tabular-nums">
          <span>{storyLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{activeVocabPool.length} Words</span>
          <span aria-hidden="true">·</span>
          <span>{sentenceCount} Sentences</span>
        </div>
      </div>

      {/* Main Games Hub vs Active Game Canvas */}
      {activeGame === null ? (
        <section aria-label="Game Selection">
          <div className="flex items-center justify-between border-b border-[rgba(165,180,252,0.14)] pb-3 mb-5">
            <h2 className="text-sm font-semibold text-[#E2E8F0] tracking-[0.01em]">
              01 – 03 · Choose a Practice Game
            </h2>
            <button
              type="button"
              onClick={onBackToToc}
              className="inline-flex items-center gap-1.5 text-xs text-[#8CA8FF] hover:text-[#B4C8FF] cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Contents</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {gameMeta.map((g) => {
              const IconComp = g.icon;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playPageFlip();
                    setActiveGame(g.id);
                  }}
                  className="group text-left bg-[rgba(15,23,46,0.92)] hover:bg-[#141F3D] rounded-2xl border border-[rgba(165,180,252,0.16)] hover:border-[rgba(108,123,255,0.65)] p-5 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.65)] hover:shadow-[0_0_32px_-8px_rgba(99,102,241,0.3)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Preview Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] text-[#8CA8FF] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="text-right text-xs tabular-nums">
                        <span className="font-mono font-semibold text-[#8CA8FF]">{g.num}</span>
                        <span className="mx-1.5 text-[#64748B]" aria-hidden="true">·</span>
                        <span className="text-[#94A3B8]">{g.badgeInfo}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#FFFFFF] group-hover:text-[#9CB8FF] transition-colors">
                      {g.titleEn}
                    </h3>
                    <p className="text-xs font-medium text-[#9CB8FF] mt-0.5">
                      {g.subtitleEn}
                    </p>

                    <p className="text-xs text-[#94A3B8] mt-2.5 leading-relaxed">
                      {g.descEn}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[rgba(165,180,252,0.12)] flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#CBD5E1] tabular-nums">
                      <Trophy className="w-3.5 h-3.5 text-[#8CA8FF]" />
                      <span>{g.bestScore > 0 ? `Best: ${g.bestScore}` : 'Ready to play'}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-semibold text-xs whitespace-nowrap">
                      <span>Play Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="space-y-5" aria-label="Active Game Arena">
          {/* Game Sub-Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveGame(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#8CA8FF]" />
              <span>All Games</span>
            </button>

            <div className="flex flex-wrap items-center gap-1 p-1 bg-[rgba(13,20,41,0.92)] border border-[rgba(165,180,252,0.16)] rounded-xl">
              {gameMeta.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setActiveGame(g.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 ${
                    activeGame === g.id
                      ? 'bg-indigo-tab text-[#FFFFFF]'
                      : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>{g.titleEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Game Workspace */}
          {activeGame === 'match' && (
            <WordMatchGame
              vocabPool={activeVocabPool}
              storyLabel={storyLabel}
              onSaveBestScore={(s) => updateBestScore('match', s)}
            />
          )}

          {activeGame === 'scramble' && (
            <WordScrambleGame
              vocabPool={activeVocabPool}
              storyLabel={storyLabel}
              onSaveBestScore={(s) => updateBestScore('scramble', s)}
            />
          )}

          {activeGame === 'cloze' && (
            <StoryFillBlankGame
              stories={selectedStories}
              allVocabPool={allVocabPool}
              storyLabel={storyLabel}
              onSaveBestScore={(s) => updateBestScore('cloze', s)}
            />
          )}
        </section>
      )}
    </div>
  );
};
