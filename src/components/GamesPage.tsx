import React, { useState } from 'react';
import { Story, VocabularyWord } from '../types/story';
import { extractStorySentences, getStoryVocabWords } from '../utils/storyHelpers';
import { WordMatchGame } from './games/WordMatchGame';
import { WordScrambleGame } from './games/WordScrambleGame';
import { StoryFillBlankGame } from './games/StoryFillBlankGame';
import { SpeedSpellGame } from './games/SpeedSpellGame';
import { MeaningDetectiveGame } from './games/MeaningDetectiveGame';
import { QuizModal } from './QuizModal';
import { soundEffects } from '../utils/audio';
import { ActiveGameId } from '../utils/router';
import { useUserProgress } from '../context/UserProgressContext';
import {
  ArrowLeft,
  ArrowRight,
  Grid2X2,
  SpellCheck2,
  BookOpenCheck,
  Zap,
  Search,
  Layers,
  Gamepad2,
  Trophy,
  Share2,
  Check,
  Award,
  FolderOpen,
  Sparkles,
} from 'lucide-react';

interface GamesPageProps {
  stories: Story[];
  selectedGameId?: ActiveGameId | null;
  onSelectGame?: (gameId: ActiveGameId | null) => void;
  onBackToToc: () => void;
}

interface BestScores {
  match: number;
  scramble: number;
  cloze: number;
  speed: number;
  detective: number;
}

export const GamesPage: React.FC<GamesPageProps> = ({
  stories,
  selectedGameId,
  onSelectGame,
  onBackToToc,
}) => {
  const { gameBestScores, updateGameBestScore, quizScores } = useUserProgress();
  const [internalActiveGame, setInternalActiveGame] = useState<ActiveGameId | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeQuizStory, setActiveQuizStory] = useState<Story | null>(null);

  const activeGame = onSelectGame ? (selectedGameId ?? null) : internalActiveGame;

  const selectGame = (gameId: ActiveGameId | null) => {
    if (onSelectGame) {
      onSelectGame(gameId);
    } else {
      setInternalActiveGame(gameId);
    }
  };

  const handleSharePractice = async () => {
    soundEffects.playClick();
    const shareUrl = window.location.href;
    const shareTitle = activeGame
      ? 'StoryGlow Practice Activity'
      : 'StoryGlow Practice – Quizzes & Vocabulary Games';
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: 'Practice English quizzes and vocabulary games with Sinhala meanings on StoryGlow!',
          url: shareUrl,
        });
        return;
      }
    } catch {
      // Cancelled native share or fallback to clipboard
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // Ignore clipboard failures
    }
  };

  const [selectedStoryId, setSelectedStoryId] = useState<string>('all');
  const bestScores: BestScores = {
    match: Number(gameBestScores.match) || 0,
    scramble: Number(gameBestScores.scramble) || 0,
    cloze: Number(gameBestScores.cloze) || 0,
    speed: Number(gameBestScores.speed) || 0,
    detective: Number(gameBestScores.detective) || 0,
  };

  const updateBestScore = (game: keyof BestScores, newScore: number) => {
    updateGameBestScore(game, newScore);
  };

  const selectedStories =
    selectedStoryId === 'all'
      ? stories
      : stories.filter((s) => s.id === selectedStoryId);

  const extractUniqueVocab = (list: Story[]): VocabularyWord[] => {
    const raw = list.flatMap((s) => getStoryVocabWords(s));
    return Array.from(new Map(raw.map((v) => [v.word.toLowerCase(), v])).values());
  };

  const activeVocabPool = extractUniqueVocab(selectedStories);
  const allVocabPool = extractUniqueVocab(stories);

  const selectedStoryObj =
    selectedStoryId === 'all'
      ? null
      : stories.find((s) => s.id === selectedStoryId) || null;

  const storyLabel = selectedStoryObj
    ? selectedStoryObj.title
    : `All ${stories.length} Stories`;

  const sentenceCount = selectedStories.reduce(
    (sum, s) =>
      sum +
      extractStorySentences(s).filter((sent) => sent.words.some((w) => !!w.vocab)).length,
    0
  );

  const storiesWithQuizzes = selectedStories.filter((s) => s.quiz && s.quiz.length > 0);
  const hasEnoughVocab = activeVocabPool.length >= 4;

  const gameMeta = [
    {
      id: 'match' as const,
      num: '01',
      titleEn: 'Word Match Memory',
      subtitleEn: 'Match Words & Clues',
      descEn:
        'Tap two cards to match a word with its sentence clue. Sinhala meaning shows after you match.',
      badgeInfo: '6 – 10 Pairs',
      bestScore: bestScores.match,
      icon: Grid2X2,
    },
    {
      id: 'scramble' as const,
      num: '02',
      titleEn: 'Word Scramble',
      subtitleEn: 'Put Letters in Order',
      descEn:
        'Read the example clue or listen, then tap letters to build the word. Sinhala meaning shows after.',
      badgeInfo: '8 Words',
      bestScore: bestScores.scramble,
      icon: SpellCheck2,
    },
    {
      id: 'cloze' as const,
      num: '03',
      titleEn: 'Missing Word Story',
      subtitleEn: 'Finish the Sentence',
      descEn:
        'Pick the right word to complete a story sentence. Sinhala meaning shows after you answer.',
      badgeInfo: '8 Sentences',
      bestScore: bestScores.cloze,
      icon: BookOpenCheck,
    },
    {
      id: 'speed' as const,
      num: '04',
      titleEn: 'Speed Spell',
      subtitleEn: 'Fast 45-Second Game',
      descEn:
        'Spell as many words as you can in 45 seconds. Right answers give +3 seconds!',
      badgeInfo: '45 Seconds',
      bestScore: bestScores.speed,
      icon: Zap,
    },
    {
      id: 'detective' as const,
      num: '05',
      titleEn: 'Word Detective',
      subtitleEn: 'Guess from 3 Hints',
      descEn:
        'Use 1 to 3 easy hints to find the right word. Sinhala meaning shows after you answer.',
      badgeInfo: '8 Words',
      bestScore: bestScores.detective,
      icon: Search,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10 overflow-x-hidden">
      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-[#8CA8FF] mb-2">
            <span>Quizzes &amp; Vocabulary Games</span>
            <span aria-hidden="true">·</span>
            <span lang="si" className="font-sinhala">
              පුහුණුව
            </span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-serif font-bold tracking-tight [text-wrap:balance]">
            <span className="text-[#FFFFFF]">Practice · </span>
            <span lang="si" className="text-indigo-gradient font-sinhala">
              පුහුණුව
            </span>
          </h1>

          <p lang="si" className="mt-3 text-[#CBD5E1] text-xs sm:text-base font-sinhala leading-relaxed tracking-[0.01em]">
            කතා ප්‍රශ්නාවලි සහ ඉංග්‍රීසි වචන ක්‍රීඩා මඟින් ඔබේ දැනුම පරීක්ෂා කරගන්න.
          </p>
        </div>

        {/* Story Filter Strip (Scrollable on Mobile) */}
        {stories.length > 0 && (
          <>
            <div className="mt-6 w-full overflow-x-auto no-scrollbar pb-1">
              <div className="inline-flex sm:flex-wrap items-center justify-start sm:justify-center gap-1.5 p-1.5 bg-[rgba(13,20,41,0.92)] rounded-xl border border-[rgba(165,180,252,0.18)] shadow-[0_12px_32px_rgba(0,0,0,0.45)] min-w-max sm:min-w-0">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedStoryId('all');
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 min-h-[38px] ${
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0 min-h-[38px] ${
                        isSelected
                          ? 'bg-indigo-tab text-[#FFFFFF]'
                          : 'text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.06)]'
                      }`}
                    >
                      {s.coverImage && (
                        <img
                          src={s.coverImage}
                          alt={s.title}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-md object-cover border border-[rgba(255,255,255,0.22)] shrink-0"
                        />
                      )}
                      <span className="truncate max-w-[155px]">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3.5 flex items-center justify-center gap-2 text-xs text-[#94A3B8] tabular-nums">
              <span>{storyLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{activeVocabPool.length} Words</span>
              <span aria-hidden="true">·</span>
              <span>{sentenceCount} Sentences</span>
            </div>
          </>
        )}
      </div>

      {/* Main Practice Hub vs Active Game Canvas */}
      {activeGame === null ? (
        <div className="space-y-10">
          {/* SECTION 1: Story Comprehension Quizzes */}
          <section aria-label="Story Comprehension Quizzes">
            <div className="flex flex-wrap items-center justify-between border-b border-[rgba(165,180,252,0.14)] pb-3 mb-5 gap-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FCD34D]" />
                <h2 className="text-sm font-semibold text-[#E2E8F0] tracking-[0.01em]">
                  Story Comprehension Quizzes ·{' '}
                  <span lang="si" className="font-sinhala">
                    කතා ප්‍රශ්නාවලි
                  </span>
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSharePractice}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                    copiedLink ? 'text-[#6EE7B7]' : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#6EE7B7]" />
                      <span>Link copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#8CA8FF]" />
                      <span>Share Practice</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onBackToToc}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8CA8FF] hover:text-[#B4C8FF] cursor-pointer whitespace-nowrap"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Home / මුල් පිටුව</span>
                </button>
              </div>
            </div>

            {storiesWithQuizzes.length === 0 ? (
              <div className="bg-[rgba(15,23,46,0.9)] rounded-2xl border border-[rgba(165,180,252,0.16)] p-6 sm:p-8 text-center">
                <div className="w-11 h-11 mx-auto rounded-xl bg-[#162140] text-[#FCD34D] border border-[rgba(165,180,252,0.2)] flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-[#FFFFFF]">
                  <span lang="si" className="font-sinhala">
                    කතා ඉක්මනින් එනවා
                  </span>{' '}
                  · Stories coming soon
                </p>
                <p lang="si" className="mt-1.5 text-xs font-sinhala text-[#94A3B8] max-w-md mx-auto">
                  නව කතා පුස්තකාලයට එක් කළ විගස සෑම කතාවකම ප්‍රශ්නාවලි මෙහි දිස්වේ.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {storiesWithQuizzes.map((story) => {
                  const bestPct = quizScores[story.id];
                  return (
                    <button
                      key={story.id}
                      type="button"
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveQuizStory(story);
                      }}
                      className="group text-left bg-[rgba(15,23,46,0.92)] hover:bg-[#141F3D] rounded-2xl border border-[rgba(165,180,252,0.16)] hover:border-[rgba(108,123,255,0.65)] p-4 sm:p-5 transition-all cursor-pointer flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2">
                          <span>{story.quiz.length} Questions</span>
                          {typeof bestPct === 'number' && (
                            <span className="text-[#6EE7B7] font-bold">Best: {bestPct}%</span>
                          )}
                        </div>
                        <h3 className="text-base font-serif font-bold text-[#FFFFFF] group-hover:text-[#9CB8FF]">
                          {story.title}
                        </h3>
                        <p lang="si" className="text-xs font-sinhala text-[#CBD5E1] mt-1">
                          {story.titleSi}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[rgba(165,180,252,0.12)] flex items-center justify-end">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-semibold text-xs">
                          <span>Start Quiz</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* SECTION 2: 5 Vocabulary Practice Games */}
          <section aria-label="Vocabulary Games">
            <div className="flex flex-wrap items-center justify-between border-b border-[rgba(165,180,252,0.14)] pb-3 mb-5 gap-2">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-[#8CA8FF]" />
                <h2 className="text-sm font-semibold text-[#E2E8F0] tracking-[0.01em]">
                  01 – 05 · Vocabulary Word Games ·{' '}
                  <span lang="si" className="font-sinhala">
                    වචන ක්‍රීඩා
                  </span>
                </h2>
              </div>
              <span className="text-xs text-[#94A3B8] tabular-nums">
                {activeVocabPool.length} Words Ready
              </span>
            </div>

            {!hasEnoughVocab && (
              <div className="mb-5 bg-[rgba(15,23,46,0.9)] rounded-2xl border border-[rgba(165,180,252,0.16)] p-6 text-center">
                <div className="w-11 h-11 mx-auto rounded-xl bg-[#162140] text-[#8CA8FF] border border-[rgba(165,180,252,0.2)] flex items-center justify-center mb-3">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-[#FFFFFF]">
                  <span lang="si" className="font-sinhala">
                    වචන ක්‍රීඩා සඳහා කතා ඉක්මනින් එනවා
                  </span>{' '}
                  · Stories coming soon
                </p>
                <p lang="si" className="mt-1.5 text-xs font-sinhala text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                  වචන ක්‍රීඩා ස්වයංක්‍රීයව කතා වල වචන භාවිතා කරයි. අවම වශයෙන් වචන 4ක් සහිත කතා එක් කළ පසු මෙම ක්‍රීඩා 5ම සෙල්ලම් කළ හැක.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {gameMeta.map((g) => {
                const IconComp = g.icon;
                return (
                  <button
                    key={g.id}
                    type="button"
                    disabled={!hasEnoughVocab}
                    onClick={() => {
                      soundEffects.playPageFlip();
                      selectGame(g.id);
                    }}
                    className="group text-left bg-[rgba(15,23,46,0.92)] hover:bg-[#141F3D] rounded-2xl border border-[rgba(165,180,252,0.16)] hover:border-[rgba(108,123,255,0.65)] disabled:opacity-55 disabled:hover:bg-[rgba(15,23,46,0.92)] disabled:cursor-not-allowed p-5 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.65)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
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
                        <span>{g.bestScore > 0 ? `Best: ${g.bestScore}` : 'Ready'}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-semibold text-xs whitespace-nowrap min-h-[38px]">
                        <span>{hasEnoughVocab ? 'Play Now' : 'Needs Stories'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        <section className="space-y-5" aria-label="Active Practice Activity">
          {/* Sub-Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  selectGame(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#8CA8FF]" />
                <span>All Practice</span>
              </button>

              <button
                type="button"
                onClick={handleSharePractice}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
                  copiedLink
                    ? 'bg-[rgba(16,185,129,0.16)] border-[rgba(52,211,153,0.45)] text-[#6EE7B7]'
                    : 'bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#CBD5E1] hover:text-[#FFFFFF] border-[rgba(165,180,252,0.22)]'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#6EE7B7]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#8CA8FF]" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-1">
              <div className="inline-flex items-center gap-1 p-1 bg-[rgba(13,20,41,0.92)] border border-[rgba(165,180,252,0.16)] rounded-xl min-w-max">
                {gameMeta.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      selectGame(g.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 min-h-[36px] ${
                      activeGame === g.id
                        ? 'bg-indigo-tab text-[#FFFFFF]'
                        : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{g.titleEn}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Game Workspace or Safe Empty State */}
          {!hasEnoughVocab ? (
            <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-8 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#162140] text-[#8CA8FF] border border-[rgba(165,180,252,0.22)] flex items-center justify-center mb-4">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#FFFFFF]">
                <span lang="si" className="font-sinhala">
                  කතා ඉක්මනින් එනවා
                </span>{' '}
                · Stories coming soon
              </h2>
              <p lang="si" className="mt-2 text-xs sm:text-sm font-sinhala text-[#94A3B8] max-w-md mx-auto">
                මෙම ක්‍රීඩාව ක්‍රියාත්මක වීමට කතා වල අවම වශයෙන් ඉංග්‍රීසි වචන 4ක් තිබිය යුතුය.
              </p>
              <button
                type="button"
                onClick={() => selectGame(null)}
                className="mt-5 px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold cursor-pointer"
              >
                Back to Practice · පුහුණුව වෙත
              </button>
            </div>
          ) : (
            <>
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

              {activeGame === 'speed' && (
                <SpeedSpellGame
                  vocabPool={activeVocabPool}
                  storyLabel={storyLabel}
                  onSaveBestScore={(s) => updateBestScore('speed', s)}
                />
              )}

              {activeGame === 'detective' && (
                <MeaningDetectiveGame
                  vocabPool={activeVocabPool}
                  storyLabel={storyLabel}
                  onSaveBestScore={(s) => updateBestScore('detective', s)}
                />
              )}
            </>
          )}
        </section>
      )}

      {/* Story Quiz Modal launched directly from Practice */}
      {activeQuizStory && (
        <QuizModal
          isOpen={!!activeQuizStory}
          onClose={() => setActiveQuizStory(null)}
          story={activeQuizStory}
        />
      )}
    </div>
  );
};
