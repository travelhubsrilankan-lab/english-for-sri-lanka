import React, { useState, useEffect } from 'react';
import { VocabularyWord } from '../../types/story';
import { soundEffects, speechNarrator } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Sparkles,
  Search,
  Volume2,
  Trophy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface MeaningDetectiveGameProps {
  vocabPool: VocabularyWord[];
  storyLabel: string;
  onSaveBestScore: (score: number) => void;
}

type GameState = 'TITLE_MENU' | 'PLAYING' | 'ROUND_SUMMARY';

interface DetectiveQuestion {
  vocab: VocabularyWord;
  clues: [string, string, string];
  options: string[];
}

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const MeaningDetectiveGame: React.FC<MeaningDetectiveGameProps> = ({
  vocabPool,
  storyLabel,
  onSaveBestScore,
}) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [questions, setQuestions] = useState<DetectiveQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [revealedClueCount, setRevealedClueCount] = useState<number>(1);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [reviewList, setReviewList] = useState<
    Array<{ vocab: VocabularyWord; correct: boolean; points: number }>
  >([]);

  useEffect(() => {
    speechNarrator.stop();
    setGameState('TITLE_MENU');
  }, [storyLabel]);

  const startNewGame = () => {
    soundEffects.playClick();
    if (vocabPool.length < 4) return;

    const shuffled = shuffleArray(vocabPool);
    const targetVocabs = shuffled.slice(0, 8);

    const generatedQuestions: DetectiveQuestion[] = targetVocabs.map((v) => {
      const clue1 = `It is a ${v.partOfSpeech || 'word'} with ${v.word.length} letters. It starts with "${v.word[0].toUpperCase()}".`;
      const clue2 = `Meaning: ${v.englishDefinition}`;
      const clue3 = `Sound: ${v.phonetic || 'Tap the speaker button to listen.'}`;

      const distractors = vocabPool
        .filter((item) => item.word.toLowerCase() !== v.word.toLowerCase())
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((d) => d.word);

      const options = shuffleArray([v.word, ...distractors]);

      return {
        vocab: v,
        clues: [clue1, clue2, clue3],
        options,
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setRevealedClueCount(1);
    setSelectedWord(null);
    setHasAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setCorrectCount(0);
    setReviewList([]);
    setGameState('PLAYING');
  };

  const currentQ = questions[currentIndex];

  const handleRevealNextClue = () => {
    if (revealedClueCount < 3 && !hasAnswered) {
      soundEffects.playClick();
      setRevealedClueCount((prev) => prev + 1);
    }
  };

  const handleSelectOption = (word: string) => {
    if (hasAnswered || !currentQ) return;
    soundEffects.playClick();
    setSelectedWord(word);
    setHasAnswered(true);

    const correct = word.toLowerCase() === currentQ.vocab.word.toLowerCase();
    setIsCorrect(correct);

    const earnedPoints = correct
      ? revealedClueCount === 1
        ? 300
        : revealedClueCount === 2
        ? 200
        : 100
      : 0;

    if (correct) {
      soundEffects.playWordTap();
      setScore((prev) => prev + earnedPoints);
      setCorrectCount((prev) => prev + 1);
    }

    setReviewList((prev) => [
      ...prev,
      { vocab: currentQ.vocab, correct, points: earnedPoints },
    ]);
  };

  const handleNextQuestion = () => {
    soundEffects.playClick();
    const nextIdx = currentIndex + 1;
    if (nextIdx >= questions.length) {
      endGame();
    } else {
      setCurrentIndex(nextIdx);
      setRevealedClueCount(1);
      setSelectedWord(null);
      setHasAnswered(false);
      setIsCorrect(false);
    }
  };

  const endGame = () => {
    soundEffects.playCompletionChime();
    setGameState('ROUND_SUMMARY');
    onSaveBestScore(score);
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="w-full bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* TITLE MENU */}
      {gameState === 'TITLE_MENU' && (
        <div className="max-w-xl mx-auto text-center py-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1C2852] border border-[rgba(129,140,248,0.3)] text-[#8CA8FF] flex items-center justify-center mb-4">
            <Search className="w-7 h-7 text-[#6EE7B7]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182348] border border-[rgba(165,180,252,0.2)] text-xs text-[#8CA8FF] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#6EE7B7]" />
            <span>Guess the Word</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF] tracking-tight">
            Word Detective
          </h2>
          <p className="mt-2 text-sm text-[#CBD5E1] leading-relaxed">
            Read up to 3 easy hints to find the right word. Guess on Hint 1 for 300 points, or open more hints if you need help. You will see the Sinhala meaning after you answer!
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[#94A3B8] tabular-nums">
            <span>Story: {storyLabel}</span>
            <span aria-hidden="true">·</span>
            <span>8 Words</span>
          </div>

          <button
            type="button"
            onClick={startNewGame}
            className="mt-7 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-indigo-cta text-[#FFFFFF] text-sm font-bold shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-[#FFFFFF]" />
            <span>Start Game</span>
          </button>
        </div>
      )}

      {/* PLAYING ARENA */}
      {gameState === 'PLAYING' && currentQ && (
        <div className="max-w-2xl mx-auto">
          {/* Top Progress & Score Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[rgba(165,180,252,0.14)]">
            <div className="text-xs text-[#94A3B8] tabular-nums">
              Word <span className="font-bold text-[#8CA8FF]">{currentIndex + 1}</span> of{' '}
              {questions.length}
            </div>

            <div className="flex items-center gap-4 text-xs tabular-nums">
              <span className="text-[#94A3B8]">
                Points:{' '}
                <span className="font-bold text-[#6EE7B7]">
                  {revealedClueCount === 1 ? '300' : revealedClueCount === 2 ? '200' : '100'}
                </span>
              </span>
              <span className="text-[#94A3B8]">·</span>
              <span className="text-[#CBD5E1]">
                Score: <span className="font-bold text-[#FFFFFF]">{score}</span>
              </span>
            </div>
          </div>

          {/* Clue Cards (Strictly English before answering) */}
          <div className="space-y-3 mb-6">
            <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#1C2A54] text-[#8CA8FF] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#8CA8FF] font-semibold mb-0.5">
                  Hint 1: First Letter & Size
                </div>
                <div className="text-sm text-[#F1F5F9] font-serif leading-relaxed">
                  {currentQ.clues[0]}
                </div>
              </div>
            </div>

            {revealedClueCount >= 2 ? (
              <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1C2A54] text-[#8CA8FF] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[#8CA8FF] font-semibold mb-0.5">
                    Hint 2: Meaning
                  </div>
                  <div className="text-sm text-[#F1F5F9] font-serif leading-relaxed">
                    {currentQ.clues[1]}
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleRevealNextClue}
                disabled={hasAnswered}
                className="w-full p-3 rounded-2xl bg-[#101830] border border-dashed border-[rgba(165,180,252,0.18)] hover:border-[rgba(108,123,255,0.5)] text-xs text-[#94A3B8] hover:text-[#CBD5E1] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-[#8CA8FF]" />
                <span>Show Hint 2 (200 points)</span>
              </button>
            )}

            {revealedClueCount >= 3 ? (
              <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1C2A54] text-[#8CA8FF] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[#8CA8FF] font-semibold mb-0.5">
                    Hint 3: Sound
                  </div>
                  <div className="text-sm text-[#F1F5F9] font-serif leading-relaxed flex flex-wrap items-center gap-2">
                    <span>{currentQ.clues[2]}</span>
                    <button
                      type="button"
                      onClick={() => speechNarrator.speakWord(currentQ.vocab.word)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1C2A54] text-[#9CB8FF] hover:text-[#FFFFFF] text-xs font-sans font-semibold cursor-pointer"
                      title="Listen to word"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Word</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : revealedClueCount === 2 && !hasAnswered ? (
              <button
                type="button"
                onClick={handleRevealNextClue}
                className="w-full p-3 rounded-2xl bg-[#101830] border border-dashed border-[rgba(165,180,252,0.18)] hover:border-[rgba(108,123,255,0.5)] text-xs text-[#94A3B8] hover:text-[#CBD5E1] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-[#8CA8FF]" />
                <span>Show Hint 3 (100 points)</span>
              </button>
            ) : null}
          </div>

          {/* Options Grid (English words only before selection) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options.map((opt) => {
              const isSelected = selectedWord === opt;
              const isTarget = opt.toLowerCase() === currentQ.vocab.word.toLowerCase();

              let btnStyle =
                'bg-[#152042] border-[rgba(165,180,252,0.18)] text-[#F1F5F9] hover:bg-[#1B2956]';
              if (hasAnswered) {
                if (isTarget) {
                  btnStyle =
                    'bg-[#064E3B] border-[#10B981] text-[#A7F3D0] shadow-[0_0_16px_rgba(16,185,129,0.35)]';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-[#4C1D1D] border-[#EF4444] text-[#FECACA]';
                } else {
                  btnStyle =
                    'bg-[#0F172E] border-[rgba(165,180,252,0.1)] text-[#64748B] opacity-60';
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  disabled={hasAnswered}
                  className={`p-4 rounded-2xl border text-left font-serif text-base font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {hasAnswered && isTarget && (
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Post-Answer Reveal Box (Sinhala Meaning appears strictly after answering!) */}
          {hasAnswered && (
            <div className="p-5 rounded-2xl bg-[#0D152C] border border-[rgba(165,180,252,0.2)] mb-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8CA8FF]">
                  {isCorrect ? 'Right Answer · Sinhala Meaning' : 'Answer · Sinhala Meaning'}
                </span>
                <button
                  type="button"
                  onClick={() => speechNarrator.speakWord(currentQ.vocab.word)}
                  className="inline-flex items-center gap-1 text-xs text-[#8CA8FF] hover:text-[#FFFFFF] cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-serif font-bold text-[#FFFFFF]">
                  {currentQ.vocab.word}
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">
                  {currentQ.vocab.phonetic}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#172347] border border-[rgba(108,123,255,0.3)] mb-2">
                <div className="text-sm font-bold font-sinhala text-[#6EE7B7]">
                  {currentQ.vocab.sinhalaMeaning}
                </div>
              </div>

              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {currentQ.vocab.englishDefinition}
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>
                    {currentIndex + 1 < questions.length ? 'Next Word →' : 'See Results →'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ROUND SUMMARY */}
      {gameState === 'ROUND_SUMMARY' && (
        <div className="max-w-xl mx-auto text-center py-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#1C2852] border border-[rgba(129,140,248,0.3)] text-[#6EE7B7] flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF] tracking-tight">
            Game Finished!
          </h2>
          <p className="mt-1 text-sm text-[#CBD5E1]">
            Good job! Here is your score:
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#121B36] border border-[rgba(165,180,252,0.15)]">
              <div className="text-xs text-[#94A3B8]">Right Words</div>
              <div className="text-2xl font-bold text-[#6EE7B7] mt-1 tabular-nums">
                {correctCount} / {questions.length}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#121B36] border border-[rgba(165,180,252,0.15)]">
              <div className="text-xs text-[#94A3B8]">Score</div>
              <div className="text-2xl font-bold text-[#8CA8FF] mt-1 tabular-nums">{score}</div>
            </div>
          </div>

          {/* Full Word Review with Sinhala Meanings */}
          <div className="mt-6 text-left p-4 rounded-2xl bg-[#101830] border border-[rgba(165,180,252,0.14)]">
            <div className="text-xs font-bold text-[#CBD5E1] mb-2.5">
              Words & Sinhala Meanings:
            </div>
            <div className="space-y-2">
              {reviewList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#162142] border border-[rgba(165,180,252,0.12)] flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-[#FFFFFF]">{item.vocab.word}</div>
                    <div className="text-xs font-sinhala text-[#8CA8FF]">
                      {item.vocab.sinhalaMeaning}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#6EE7B7] tabular-nums">
                      +{item.points} pts
                    </span>
                    <button
                      type="button"
                      onClick={() => speechNarrator.speakWord(item.vocab.word)}
                      className="p-1 rounded bg-[#1C2A54] text-[#9CB8FF] hover:text-[#FFFFFF] cursor-pointer"
                      aria-label={`Listen to ${item.vocab.word}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={startNewGame}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
