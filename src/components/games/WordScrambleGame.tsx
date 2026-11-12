import React, { useState, useEffect, useCallback } from 'react';
import { VocabularyWord } from '../../types/story';
import { soundEffects, speechNarrator } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Volume2,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Award,
  Eraser,
  SkipForward,
  SpellCheck2,
} from 'lucide-react';

interface WordScrambleGameProps {
  vocabPool: VocabularyWord[];
  storyLabel: string;
  onSaveBestScore: (score: number) => void;
}

type GameState = 'TITLE_MENU' | 'PLAYING' | 'ROUND_SUMMARY';

interface BankTile {
  id: number;
  char: string;
}

interface PlacedSlot {
  tileId: number;
  char: string;
  locked?: boolean;
}

interface RoundResult {
  vocab: VocabularyWord;
  solved: boolean;
}

const ROUNDS_PER_MATCH = 8;

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function scrambleWordTiles(word: string): BankTile[] {
  const letters = word.toUpperCase().split('');
  let shuffled = shuffleArray(letters);
  let attempts = 0;
  while (shuffled.join('') === word.toUpperCase() && attempts < 10 && letters.length > 1) {
    shuffled = shuffleArray(letters);
    attempts++;
  }
  return shuffled.map((char, idx) => ({ id: idx, char }));
}

export const WordScrambleGame: React.FC<WordScrambleGameProps> = ({
  vocabPool,
  storyLabel,
  onSaveBestScore,
}) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [roundWords, setRoundWords] = useState<VocabularyWord[]>([]);
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [bankTiles, setBankTiles] = useState<BankTile[]>([]);
  const [slots, setSlots] = useState<(PlacedSlot | null)[]>([]);
  const [hintsUsedInRound, setHintsUsedInRound] = useState<number>(0);
  const [roundStatus, setRoundStatus] = useState<'active' | 'correct' | 'wrong' | 'skipped'>('active');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [results, setResults] = useState<RoundResult[]>([]);

  const eligibleWords = vocabPool.filter((v) => /^[a-zA-Z]{4,11}$/.test(v.word));
  const currentWord = roundWords[roundIdx] || null;

  const setupRound = useCallback((vocab: VocabularyWord) => {
    const target = vocab.word.toUpperCase();
    setBankTiles(scrambleWordTiles(target));
    setSlots(new Array(target.length).fill(null));
    setHintsUsedInRound(0);
    setRoundStatus('active');
  }, []);

  useEffect(() => {
    setGameState('TITLE_MENU');
  }, [storyLabel]);

  const startGame = () => {
    soundEffects.playPageFlip();
    const chosen = shuffleArray(eligibleWords).slice(
      0,
      Math.min(ROUNDS_PER_MATCH, eligibleWords.length)
    );
    if (chosen.length === 0) return;

    setRoundWords(chosen);
    setRoundIdx(0);
    setScore(0);
    setStreak(0);
    setResults([]);
    setupRound(chosen[0]);
    setGameState('PLAYING');
  };

  const evaluateWord = useCallback(
    (nextSlots: (PlacedSlot | null)[], wordObj: VocabularyWord, hintsUsed: number) => {
      if (nextSlots.some((s) => s === null)) return;
      const attempt = nextSlots.map((s) => s?.char ?? '').join('');
      if (attempt === wordObj.word.toUpperCase()) {
        const nextStreak = streak + 1;
        const roundPoints = Math.max(40, 100 + nextStreak * 15 - hintsUsed * 20);
        const total = score + roundPoints;

        setScore(total);
        setStreak(nextStreak);
        setRoundStatus('correct');
        setResults((prev) => [...prev, { vocab: wordObj, solved: true }]);
        soundEffects.playCompletionChime();
        speechNarrator.speakWord(wordObj.word);
      } else {
        setRoundStatus('wrong');
        soundEffects.playClick();
      }
    },
    [score, streak]
  );

  const handleBankTileClick = useCallback(
    (tile: BankTile) => {
      if (roundStatus === 'correct' || roundStatus === 'skipped' || !currentWord) return;
      if (slots.some((s) => s?.tileId === tile.id)) return;

      const emptyIdx = slots.findIndex((s) => s === null);
      if (emptyIdx === -1) return;

      soundEffects.playWordTap();
      const nextSlots = [...slots];
      nextSlots[emptyIdx] = { tileId: tile.id, char: tile.char, locked: false };
      setSlots(nextSlots);
      if (roundStatus === 'wrong') setRoundStatus('active');

      if (nextSlots.every((s) => s !== null)) {
        evaluateWord(nextSlots, currentWord, hintsUsedInRound);
      }
    },
    [roundStatus, currentWord, slots, evaluateWord, hintsUsedInRound]
  );

  const handleSlotClick = useCallback(
    (slotIdx: number) => {
      if (roundStatus === 'correct' || roundStatus === 'skipped') return;
      const slot = slots[slotIdx];
      if (!slot || slot.locked) return;

      soundEffects.playClick();
      const nextSlots = [...slots];
      nextSlots[slotIdx] = null;
      setSlots(nextSlots);
      if (roundStatus === 'wrong') setRoundStatus('active');
    },
    [roundStatus, slots]
  );

  const handleClearUnlocked = () => {
    if (roundStatus === 'correct' || roundStatus === 'skipped') return;
    soundEffects.playClick();
    setSlots((prev) => prev.map((s) => (s?.locked ? s : null)));
    setRoundStatus('active');
  };

  const handleRevealHint = () => {
    if (roundStatus === 'correct' || roundStatus === 'skipped' || !currentWord) return;
    const target = currentWord.word.toUpperCase();
    const targetSlotIdx = slots.findIndex((s, i) => !s || s.char !== target[i]);
    if (targetSlotIdx === -1) return;

    const neededChar = target[targetSlotIdx];
    const usedIds = new Set(slots.filter((s): s is PlacedSlot => s !== null).map((s) => s.tileId));

    let chosenTile = bankTiles.find((t) => t.char === neededChar && !usedIds.has(t.id));
    const nextSlots = [...slots];

    if (!chosenTile) {
      const donorIdx = nextSlots.findIndex(
        (s, i) => s !== null && !s.locked && s.char === neededChar && target[i] !== neededChar
      );
      if (donorIdx !== -1 && nextSlots[donorIdx]) {
        chosenTile = { id: nextSlots[donorIdx]!.tileId, char: neededChar };
        nextSlots[donorIdx] = null;
      }
    }

    if (!chosenTile) return;

    soundEffects.playWordTap();
    nextSlots[targetSlotIdx] = { tileId: chosenTile.id, char: neededChar, locked: true };
    const nextHints = hintsUsedInRound + 1;
    setHintsUsedInRound(nextHints);
    setSlots(nextSlots);
    setRoundStatus('active');

    if (nextSlots.every((s) => s !== null)) {
      evaluateWord(nextSlots, currentWord, nextHints);
    }
  };

  const handleSkipRound = () => {
    if (roundStatus !== 'active' && roundStatus !== 'wrong') return;
    if (!currentWord) return;
    soundEffects.playClick();
    const target = currentWord.word.toUpperCase();
    setSlots(target.split('').map((char, idx) => ({ tileId: idx, char, locked: true })));
    setStreak(0);
    setRoundStatus('skipped');
    setResults((prev) => [...prev, { vocab: currentWord, solved: false }]);
    speechNarrator.speakWord(currentWord.word);
  };

  const handleNextRound = useCallback(() => {
    if (roundIdx + 1 < roundWords.length) {
      soundEffects.playPageFlip();
      const nextIdx = roundIdx + 1;
      setRoundIdx(nextIdx);
      setupRound(roundWords[nextIdx]);
    } else {
      soundEffects.playCompletionChime();
      onSaveBestScore(score);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      setGameState('ROUND_SUMMARY');
    }
  }, [roundIdx, roundWords, setupRound, onSaveBestScore, score]);

  // Desktop keyboard typing support
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Enter' && (roundStatus === 'correct' || roundStatus === 'skipped')) {
        e.preventDefault();
        handleNextRound();
        return;
      }
      if (roundStatus === 'correct' || roundStatus === 'skipped') return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        for (let i = slots.length - 1; i >= 0; i--) {
          if (slots[i] && !slots[i]?.locked) {
            handleSlotClick(i);
            break;
          }
        }
        return;
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        const upper = e.key.toUpperCase();
        const usedIds = new Set(slots.filter((s): s is PlacedSlot => s !== null).map((s) => s.tileId));
        const matchTile = bankTiles.find((t) => t.char === upper && !usedIds.has(t.id));
        if (matchTile) {
          handleBankTileClick(matchTile);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState, roundStatus, slots, bankTiles, handleBankTileClick, handleSlotClick, handleNextRound]);

  if (gameState === 'TITLE_MENU') {
    return (
      <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.55)] max-w-3xl mx-auto">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] text-[#8CA8FF] flex items-center justify-center shrink-0">
            <SpellCheck2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] mb-1">
              <span className="font-semibold text-[#8CA8FF]">Word Scramble</span>
              <span aria-hidden="true">·</span>
              <span>{storyLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{Math.min(ROUNDS_PER_MATCH, eligibleWords.length)} Rounds</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#FFFFFF]">
              Word Scramble · Letter Builder
            </h2>
            <p className="text-sm text-[#CBD5E1] mt-1.5 leading-relaxed">
              Read the English definition or listen to the audio clue, then arrange the scrambled letters to build the word. The Sinhala meaning is shown after you answer.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[rgba(165,180,252,0.14)]">
          <div className="text-xs text-[#94A3B8]">
            Click letters or type A–Z directly on your keyboard.
          </div>
          <button
            type="button"
            onClick={startGame}
            disabled={eligibleWords.length === 0}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-cta text-[#FFFFFF] font-bold text-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-40"
          >
            <Play className="w-4 h-4 fill-[#FFFFFF]" />
            <span>Start Game</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'ROUND_SUMMARY') {
    const solvedCount = results.filter((r) => r.solved).length;
    return (
      <div className="bg-[rgba(15,23,46,0.94)] rounded-3xl border border-[rgba(165,180,252,0.2)] p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] text-[#8CA8FF] flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF]">
            Spelling Round Complete!
          </h2>
          <p className="mt-2 text-sm text-[#CBD5E1] tabular-nums">
            Score: <span className="font-bold text-[#8CA8FF]">{score}</span>
            <span className="mx-2 text-[#64748B]" aria-hidden="true">·</span>
            Solved:{' '}
            <span className="font-bold text-[#6EE7B7]">
              {solvedCount} / {roundWords.length}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
          {results.map((res, i) => (
            <button
              key={`${res.vocab.word}-${i}`}
              type="button"
              onClick={() => {
                soundEffects.playWordTap();
                speechNarrator.speakWord(res.vocab.word);
              }}
              className="p-3 rounded-xl bg-[#121B36] border border-[rgba(165,180,252,0.16)] hover:border-[rgba(108,123,255,0.6)] flex items-center justify-between gap-2 text-left cursor-pointer"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  {res.solved ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-[#FB7185] shrink-0" />
                  )}
                  <span className="text-sm font-bold text-[#FFFFFF] truncate">{res.vocab.word}</span>
                </div>
                <p className="text-xs font-sinhala text-[#9CB8FF] truncate mt-0.5">
                  {res.vocab.sinhalaMeaning}
                </p>
              </div>
              <Volume2 className="w-4 h-4 text-[#8CA8FF] shrink-0" />
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={startGame}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentWord) return null;

  const usedTileIds = new Set(slots.filter((s): s is PlacedSlot => s !== null).map((s) => s.tileId));

  return (
    <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-5 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.55)] max-w-3xl mx-auto">
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgba(165,180,252,0.14)]">
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm tabular-nums text-[#CBD5E1]">
          <span>
            Word:{' '}
            <strong className="text-[#FFFFFF]">
              {roundIdx + 1} / {roundWords.length}
            </strong>
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

        <button
          type="button"
          onClick={startGame}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#162140] hover:bg-[#1E2C54] text-[#E2E8F0] border border-[rgba(165,180,252,0.18)] text-xs font-semibold cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#8CA8FF]" />
          <span>Restart</span>
        </button>
      </div>

      {/* Clue Card (English Definition + Audio ONLY before Answer) */}
      <div className="text-center mb-7">
        <div className="flex items-center justify-center gap-2 text-xs text-[#94A3B8] mb-2">
          <span className="capitalize text-[#8CA8FF] font-semibold">{currentWord.partOfSpeech}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{currentWord.word.length} letters</span>
        </div>

        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FFFFFF] max-w-xl mx-auto leading-snug">
          {currentWord.englishDefinition}
        </h3>

        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            speechNarrator.speakWord(currentWord.word);
          }}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#182242] hover:bg-[#1F2D57] text-[#9CB8FF] border border-[rgba(165,180,252,0.2)] text-xs font-semibold transition-colors cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>Hear Word (Audio Hint)</span>
        </button>
      </div>

      {/* Answer Letter Slots */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {slots.map((slot, idx) => {
          let slotStyle =
            'bg-[#0B1124] border-[rgba(165,180,252,0.24)] text-[#64748B]';
          if (roundStatus === 'correct') {
            slotStyle =
              'bg-[rgba(2,44,34,0.7)] border-[rgba(52,211,153,0.75)] text-[#D1FAE5]';
          } else if (roundStatus === 'skipped') {
            slotStyle =
              'bg-[#17244A] border-[#6C7BFF] text-[#9CB8FF]';
          } else if (roundStatus === 'wrong' && slot) {
            slotStyle =
              'bg-[rgba(76,5,25,0.68)] border-[rgba(251,113,133,0.8)] text-[#FFE4E6]';
          } else if (slot?.locked) {
            slotStyle =
              'bg-[#1A2A55] border-[#6C7BFF] text-[#8CA8FF]';
          } else if (slot) {
            slotStyle =
              'bg-[#172347] border-[#8CA8FF] text-[#FFFFFF] hover:bg-[#1D2D5B]';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSlotClick(idx)}
              disabled={!slot || slot.locked || roundStatus === 'correct' || roundStatus === 'skipped'}
              className={`w-11 h-12 sm:w-12 sm:h-13 rounded-xl border-2 text-lg font-mono font-bold flex items-center justify-center transition-all cursor-pointer disabled:cursor-default ${slotStyle}`}
            >
              {slot ? slot.char : ''}
            </button>
          );
        })}
      </div>

      {/* Wrong Attempt Feedback (English Only) */}
      {roundStatus === 'wrong' && (
        <div className="mb-5 p-3 rounded-xl bg-[rgba(76,5,25,0.65)] border border-[rgba(251,113,133,0.45)] text-[#FFE4E6] text-xs flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
          <span>Not quite right — try rearranging the letters.</span>
        </div>
      )}

      {/* Solved / Skipped Banner — Reveals Sinhala Meaning AFTER Answering */}
      {(roundStatus === 'correct' || roundStatus === 'skipped') && (
        <div
          className={`mb-5 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            roundStatus === 'correct'
              ? 'bg-[rgba(2,44,34,0.65)] border-[rgba(52,211,153,0.5)] text-[#D1FAE5]'
              : 'bg-[#152042] border-[rgba(165,180,252,0.28)] text-[#E2E8F0]'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {roundStatus === 'correct' ? (
              <CheckCircle2 className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#8CA8FF] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-sm font-bold text-[#FFFFFF]">
                {roundStatus === 'correct'
                  ? `Correct! "${currentWord.word}"`
                  : `Answer: "${currentWord.word}"`}{' '}
                <span className="font-mono text-xs font-normal text-[#9CB8FF]">
                  {currentWord.phonetic}
                </span>
              </p>
              <p className="text-sm font-sinhala font-semibold text-[#6EE7B7] mt-1">
                {currentWord.sinhalaMeaning}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNextRound}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{roundIdx + 1 < roundWords.length ? 'Next Word' : 'See Results'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Letter Bank */}
      {roundStatus !== 'correct' && roundStatus !== 'skipped' && (
        <>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
            {bankTiles.map((tile) => {
              const isUsed = usedTileIds.has(tile.id);
              return (
                <button
                  key={tile.id}
                  type="button"
                  disabled={isUsed}
                  onClick={() => handleBankTileClick(tile)}
                  className={`w-11 h-12 sm:w-12 sm:h-12 rounded-xl border text-base sm:text-lg font-mono font-bold transition-all cursor-pointer ${
                    isUsed
                      ? 'bg-[#090E1E] border-[rgba(165,180,252,0.08)] text-[#334155] cursor-default opacity-40'
                      : 'bg-[#162140] hover:bg-[#1E2E5A] border-[rgba(165,180,252,0.25)] hover:border-[#6C7BFF] text-[#FFFFFF] shadow-md'
                  }`}
                >
                  {tile.char}
                </button>
              );
            })}
          </div>

          {/* Control Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4 border-t border-[rgba(165,180,252,0.14)]">
            <button
              type="button"
              onClick={handleClearUnlocked}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#162140] hover:bg-[#1E2C54] text-[#CBD5E1] border border-[rgba(165,180,252,0.18)] text-xs font-semibold cursor-pointer whitespace-nowrap"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              type="button"
              onClick={handleRevealHint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#17244A] hover:bg-[#1E2F60] text-[#9CB8FF] border border-[rgba(108,123,255,0.45)] text-xs font-semibold cursor-pointer whitespace-nowrap"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Reveal Letter</span>
            </button>

            <button
              type="button"
              onClick={handleSkipRound}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#162140] hover:bg-[#1E2C54] text-[#CBD5E1] border border-[rgba(165,180,252,0.18)] text-xs font-semibold cursor-pointer whitespace-nowrap"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Skip</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
