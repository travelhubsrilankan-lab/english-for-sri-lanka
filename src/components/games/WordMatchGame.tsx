import React, { useState, useEffect, useRef } from 'react';
import { VocabularyWord } from '../../types/story';
import { soundEffects, speechNarrator } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  Award,
  Sparkles,
  Grid2X2,
} from 'lucide-react';

interface WordMatchGameProps {
  vocabPool: VocabularyWord[];
  storyLabel: string;
  onSaveBestScore: (score: number) => void;
}

type GameState = 'TITLE_MENU' | 'PLAYING' | 'ROUND_SUMMARY';

interface MatchCard {
  uid: string;
  pairId: string;
  side: 'word' | 'clue';
  label: string;
  partOfSpeech?: string;
  vocab: VocabularyWord;
}

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const WordMatchGame: React.FC<WordMatchGameProps> = ({
  vocabPool,
  storyLabel,
  onSaveBestScore,
}) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [pairCount, setPairCount] = useState<6 | 8 | 10>(8);
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedPairVocabs, setSelectedPairVocabs] = useState<VocabularyWord[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [mismatchIndices, setMismatchIndices] = useState<number[]>([]);
  const [lastMatchedVocab, setLastMatchedVocab] = useState<VocabularyWord | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  const lockTimeoutRef = useRef<number | null>(null);
  const isCheckingRef = useRef<boolean>(false);

  const clearTimers = () => {
    if (lockTimeoutRef.current !== null) {
      window.clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = null;
    }
    isCheckingRef.current = false;
  };

  useEffect(() => {
    return () => {
      clearTimers();
      speechNarrator.stop();
    };
  }, []);

  // Reset cleanly back to menu if the story filter changes
  useEffect(() => {
    clearTimers();
    setGameState('TITLE_MENU');
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMismatchIndices([]);
    setLastMatchedVocab(null);
  }, [storyLabel]);

  const startRound = (targetPairs: 6 | 8 | 10 = pairCount) => {
    clearTimers();
    soundEffects.playPageFlip();

    const available = vocabPool.filter((v) => v.word && v.englishDefinition);
    const effectiveCount = Math.min(targetPairs, available.length);
    const chosen = shuffleArray(available).slice(0, effectiveCount);

    const deck: MatchCard[] = [];
    chosen.forEach((vocab) => {
      deck.push({
        uid: `word-${vocab.word}`,
        pairId: vocab.word.toLowerCase(),
        side: 'word',
        label: vocab.word,
        partOfSpeech: vocab.partOfSpeech,
        vocab,
      });
      deck.push({
        uid: `clue-${vocab.word}`,
        pairId: vocab.word.toLowerCase(),
        side: 'clue',
        label: vocab.englishDefinition,
        vocab,
      });
    });

    setSelectedPairVocabs(chosen);
    setCards(shuffleArray(deck));
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMismatchIndices([]);
    setLastMatchedVocab(null);
    setMoves(0);
    setStreak(0);
    setScore(0);
    setGameState('PLAYING');
  };

  const handleCardClick = (index: number) => {
    if (gameState !== 'PLAYING' || isCheckingRef.current) return;
    if (flippedIndices.includes(index)) return;

    const clickedCard = cards[index];
    if (matchedPairIds.includes(clickedCard.pairId)) return;

    soundEffects.playWordTap();
    if (voiceEnabled && clickedCard.side === 'word') {
      speechNarrator.speakWord(clickedCard.vocab.word);
    }

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      const [firstIdx, secondIdx] = nextFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      setMoves((m) => m + 1);
      isCheckingRef.current = true;

      if (firstCard.pairId === secondCard.pairId && firstCard.side !== secondCard.side) {
        const nextStreak = streak + 1;
        const gained = 100 + nextStreak * 20;
        const nextScore = score + gained;
        const nextMatched = [...matchedPairIds, firstCard.pairId];

        setStreak(nextStreak);
        setScore(nextScore);

        lockTimeoutRef.current = window.setTimeout(() => {
          setMatchedPairIds(nextMatched);
          setLastMatchedVocab(firstCard.vocab);
          setFlippedIndices([]);
          isCheckingRef.current = false;

          if (nextMatched.length === selectedPairVocabs.length) {
            soundEffects.playCompletionChime();
            onSaveBestScore(nextScore);
            confetti({
              particleCount: 75,
              spread: 65,
              origin: { y: 0.6 },
            });
            setGameState('ROUND_SUMMARY');
          }
        }, 320);
      } else {
        setStreak(0);
        setMismatchIndices([firstIdx, secondIdx]);
        lockTimeoutRef.current = window.setTimeout(() => {
          setFlippedIndices([]);
          setMismatchIndices([]);
          isCheckingRef.current = false;
        }, 720);
      }
    }
  };

  const accuracy =
    moves > 0 ? Math.min(100, Math.round((selectedPairVocabs.length / moves) * 100)) : 100;

  if (gameState === 'TITLE_MENU') {
    return (
      <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.55)] max-w-3xl mx-auto">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] text-[#8CA8FF] flex items-center justify-center shrink-0">
            <Grid2X2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] mb-1">
              <span className="font-semibold text-[#8CA8FF]">Word Match Memory</span>
              <span aria-hidden="true">·</span>
              <span>{storyLabel}</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#FFFFFF]">
              Word Match Memory
            </h2>
            <p className="text-sm text-[#CBD5E1] mt-1.5 leading-relaxed">
              Flip the cards to pair each English word with its matching English definition. The Sinhala meaning is revealed once a pair is matched.
            </p>
          </div>
        </div>

        {/* Difficulty Options */}
        <div className="mb-7">
          <p className="text-xs font-semibold text-[#94A3B8] mb-3">
            Select Board Size
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {([6, 8, 10] as const).map((count) => {
              const disabled = vocabPool.length < count;
              const isSelected = pairCount === count;
              const title =
                count === 6
                  ? 'Easy'
                  : count === 8
                  ? 'Medium'
                  : 'Master';

              return (
                <button
                  key={count}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    soundEffects.playClick();
                    setPairCount(count);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer disabled:opacity-40 ${
                    isSelected
                      ? 'bg-[#17244A] border-[#6C7BFF] text-[#FFFFFF] shadow-[0_0_20px_rgba(99,102,241,0.28)]'
                      : 'bg-[#111933] border-[rgba(165,180,252,0.16)] text-[#CBD5E1] hover:border-[rgba(108,123,255,0.5)]'
                  }`}
                >
                  <p className="text-sm font-bold text-[#FFFFFF]">{title}</p>
                  <p className="text-xs text-[#94A3B8] mt-1 tabular-nums">
                    {count} Pairs · {count * 2} Cards
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[rgba(165,180,252,0.14)]">
          <div className="text-xs text-[#94A3B8]">
            Word pronunciation plays automatically when flipping English word cards.
          </div>

          <button
            type="button"
            onClick={() => startRound(pairCount)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-cta text-[#FFFFFF] font-bold text-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-[#FFFFFF]" />
            <span>Start Game</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'ROUND_SUMMARY') {
    return (
      <div className="bg-[rgba(15,23,46,0.94)] rounded-3xl border border-[rgba(165,180,252,0.2)] p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] text-[#8CA8FF] flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF]">
            Board Cleared!
          </h2>
          <p className="mt-2 text-sm text-[#CBD5E1] tabular-nums">
            Score: <span className="font-bold text-[#8CA8FF]">{score}</span>
            <span className="mx-2 text-[#64748B]" aria-hidden="true">·</span>
            Moves: <span className="font-bold text-[#FFFFFF]">{moves}</span>
            <span className="mx-2 text-[#64748B]" aria-hidden="true">·</span>
            Accuracy: <span className="font-bold text-[#6EE7B7]">{accuracy}%</span>
          </p>
        </div>

        {/* Learned Pairs Review with Sinhala Meanings Unlocked After Clear */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-[#94A3B8] mb-3">
            Matched Words & Sinhala Meanings ({selectedPairVocabs.length}) · Click to listen
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selectedPairVocabs.map((v) => (
              <button
                key={v.word}
                type="button"
                onClick={() => {
                  soundEffects.playWordTap();
                  speechNarrator.speakWord(v.word);
                }}
                className="p-3 rounded-xl bg-[#121B36] border border-[rgba(165,180,252,0.16)] hover:border-[rgba(108,123,255,0.6)] flex items-center justify-between gap-2 text-left cursor-pointer transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#FFFFFF] truncate">{v.word}</p>
                  <p className="text-xs font-sinhala text-[#9CB8FF] truncate">{v.sinhalaMeaning}</p>
                </div>
                <Volume2 className="w-4 h-4 text-[#8CA8FF] shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setGameState('TITLE_MENU')}
            className="px-5 py-2.5 rounded-full bg-[#182242] hover:bg-[#1E2B52] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold cursor-pointer whitespace-nowrap"
          >
            Change Board Size
          </button>
          <button
            type="button"
            onClick={() => startRound(pairCount)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-5 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.55)] max-w-4xl mx-auto">
      {/* Unobtrusive Top HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[rgba(165,180,252,0.14)]">
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm tabular-nums text-[#CBD5E1]">
          <span>
            Pairs:{' '}
            <strong className="text-[#FFFFFF]">
              {matchedPairIds.length} / {selectedPairVocabs.length}
            </strong>
          </span>
          <span className="text-[#64748B]" aria-hidden="true">·</span>
          <span>
            Moves: <strong className="text-[#FFFFFF]">{moves}</strong>
          </span>
          <span className="text-[#64748B]" aria-hidden="true">·</span>
          <span>
            Streak: <strong className="text-[#6EE7B7]">{streak}x</strong>
          </span>
          <span className="text-[#64748B]" aria-hidden="true">·</span>
          <span>
            Score: <strong className="text-[#8CA8FF]">{score}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setVoiceEnabled((prev) => !prev);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#162140] hover:bg-[#1E2C54] text-[#CBD5E1] border border-[rgba(165,180,252,0.18)] text-xs font-medium cursor-pointer whitespace-nowrap"
          >
            {voiceEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#8CA8FF]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#94A3B8]" />
            )}
            <span>{voiceEnabled ? 'Audio On' : 'Muted'}</span>
          </button>

          <button
            type="button"
            onClick={() => startRound(pairCount)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#162140] hover:bg-[#1E2C54] text-[#E2E8F0] border border-[rgba(165,180,252,0.18)] text-xs font-semibold cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8CA8FF]" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Sinhala Meaning Reveal Banner (Appears ONLY After Matching a Pair) */}
      {lastMatchedVocab && (
        <div className="mb-5 p-3.5 rounded-2xl bg-[rgba(2,44,34,0.6)] border border-[rgba(52,211,153,0.45)] text-[#D1FAE5] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
            <span>
              Matched <strong className="text-[#FFFFFF]">{lastMatchedVocab.word}</strong>
              <span className="mx-2 text-[#6EE7B7]" aria-hidden="true">·</span>
              <span className="font-sinhala font-bold text-[#FFFFFF]">
                {lastMatchedVocab.sinhalaMeaning}
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => speechNarrator.speakWord(lastMatchedVocab.word)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#064E3B] text-[#A7F3D0] text-xs font-medium cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Listen</span>
          </button>
        </div>
      )}

      {/* Card Grid (Pure English BEFORE Matching; Reveals Sinhala ONLY When Matched) */}
      <div
        className={`grid gap-3 ${
          selectedPairVocabs.length === 10
            ? 'grid-cols-2 sm:grid-cols-4 md:grid-cols-5'
            : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {cards.map((card, idx) => {
          const isMatched = matchedPairIds.includes(card.pairId);
          const isFlipped = flippedIndices.includes(idx) || isMatched;
          const isMismatch = mismatchIndices.includes(idx);

          let cardClass =
            'bg-[#111933] hover:bg-[#162245] border-[rgba(165,180,252,0.2)] hover:border-[rgba(108,123,255,0.6)]';
          if (isMatched) {
            cardClass =
              'bg-[rgba(2,44,34,0.65)] border-[rgba(52,211,153,0.65)] text-[#D1FAE5]';
          } else if (isMismatch) {
            cardClass =
              'bg-[rgba(76,5,25,0.7)] border-[rgba(251,113,133,0.8)] text-[#FFE4E6]';
          } else if (isFlipped) {
            cardClass =
              'bg-[#1B2A55] border-[#6C7BFF] text-[#FFFFFF] shadow-[0_0_20px_rgba(99,102,241,0.3)]';
          }

          return (
            <button
              key={card.uid}
              type="button"
              disabled={isMatched}
              onClick={() => handleCardClick(idx)}
              className={`min-h-[104px] sm:min-h-[116px] p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all duration-150 cursor-pointer disabled:cursor-default ${cardClass}`}
            >
              {!isFlipped ? (
                <div className="flex flex-col items-center gap-1.5 opacity-80">
                  <Sparkles className="w-4 h-4 text-[#8CA8FF]" />
                  <span className="text-[11px] font-medium text-[#94A3B8]">
                    {idx + 1}
                  </span>
                </div>
              ) : (
                <div className="w-full px-1">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#9CB8FF] mb-1">
                    {card.side === 'word'
                      ? card.partOfSpeech || 'Word'
                      : 'Clue'}
                  </span>
                  <span
                    className={`block leading-snug break-words ${
                      card.side === 'word'
                        ? 'text-sm sm:text-base font-serif font-bold text-[#FFFFFF]'
                        : 'text-[11px] sm:text-xs font-medium text-[#F1F5F9]'
                    }`}
                  >
                    {card.label}
                  </span>
                  {isMatched && (
                    <span className="mt-1.5 flex items-center justify-center gap-1 text-[11px] font-sinhala font-semibold text-[#6EE7B7]">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{card.vocab.sinhalaMeaning}</span>
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
