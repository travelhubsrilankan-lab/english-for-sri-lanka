import React, { useState, useEffect } from 'react';
import { Story, VocabularyWord } from '../../types/story';
import { soundEffects, speechNarrator } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Volume2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Award,
  BookOpenCheck,
} from 'lucide-react';

interface StoryFillBlankGameProps {
  stories: Story[];
  allVocabPool: VocabularyWord[];
  storyLabel: string;
  onSaveBestScore: (score: number) => void;
}

type GameState = 'TITLE_MENU' | 'PLAYING' | 'ROUND_SUMMARY';

interface ClozeQuestion {
  id: string;
  storyTitleEn: string;
  beforeBlank: string;
  afterBlank: string;
  fullSentenceEn: string;
  sinhalaTranslation: string;
  targetDisplay: string;
  targetVocab: VocabularyWord;
  options: string[];
  correctOptionIndex: number;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const ROUNDS_PER_MATCH = 8;

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildClozeQuestions(stories: Story[], allVocabPool: VocabularyWord[]): ClozeQuestion[] {
  const questions: ClozeQuestion[] = [];

  stories.forEach((story) => {
    story.chapters.forEach((chap) => {
      chap.sentences.forEach((sentence) => {
        const vocabTokens = sentence.words
          .map((w, idx) => ({ w, idx }))
          .filter((item) => !!item.w.vocab);

        if (vocabTokens.length === 0) return;

        const picked = vocabTokens[Math.floor(vocabTokens.length / 2)];
        const targetVocab = picked.w.vocab!;

        const beforeWords = sentence.words.slice(0, picked.idx).map((w) => w.displayWord);
        const afterWords = sentence.words.slice(picked.idx + 1).map((w) => w.displayWord);

        const matchParts = picked.w.displayWord.match(
          /^([^A-Za-z]*)([A-Za-z'’-]+)([^A-Za-z]*)$/
        );
        const leadingPunct = matchParts ? matchParts[1] : '';
        const coreWord = matchParts ? matchParts[2] : targetVocab.word;
        const trailingPunct = matchParts ? matchParts[3] : '';

        const beforeBlank = [beforeWords.join(' '), leadingPunct].filter(Boolean).join(beforeWords.length ? ' ' : '');
        const afterBlank = [trailingPunct, afterWords.join(' ')].filter(Boolean).join(afterWords.length ? ' ' : '');

        const samePos = allVocabPool.filter(
          (v) =>
            v.word.toLowerCase() !== targetVocab.word.toLowerCase() &&
            v.partOfSpeech === targetVocab.partOfSpeech
        );
        const otherPos = allVocabPool.filter(
          (v) =>
            v.word.toLowerCase() !== targetVocab.word.toLowerCase() &&
            v.partOfSpeech !== targetVocab.partOfSpeech
        );

        const distractors = [...shuffleArray(samePos), ...shuffleArray(otherPos)]
          .slice(0, 3)
          .map((v) => v.word.toLowerCase());

        if (distractors.length < 3) return;

        const targetOptionText = coreWord.toLowerCase();
        const combined = shuffleArray([targetOptionText, ...distractors]);
        const correctOptionIndex = combined.indexOf(targetOptionText);

        questions.push({
          id: `${sentence.id}-${picked.idx}`,
          storyTitleEn: story.titleEn,
          beforeBlank,
          afterBlank,
          fullSentenceEn: sentence.englishText,
          sinhalaTranslation: sentence.sinhalaTranslation,
          targetDisplay: coreWord,
          targetVocab,
          options: combined,
          correctOptionIndex,
        });
      });
    });
  });

  return questions;
}

export const StoryFillBlankGame: React.FC<StoryFillBlankGameProps> = ({
  stories,
  allVocabPool,
  storyLabel,
  onSaveBestScore,
}) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [roundQuestions, setRoundQuestions] = useState<ClozeQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  useEffect(() => {
    speechNarrator.stop();
    setGameState('TITLE_MENU');
  }, [storyLabel]);

  useEffect(() => {
    return () => speechNarrator.stop();
  }, []);

  const pool = React.useMemo(
    () => buildClozeQuestions(stories, allVocabPool),
    [stories, allVocabPool]
  );
  const currentQ = roundQuestions[currentIdx] || null;
  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && currentQ && selectedOption === currentQ.correctOptionIndex;

  const startGame = () => {
    soundEffects.playPageFlip();
    const chosen = shuffleArray(pool).slice(0, Math.min(ROUNDS_PER_MATCH, pool.length));
    if (chosen.length === 0) return;

    setRoundQuestions(chosen);
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setGameState('PLAYING');
  };

  const handleChooseOption = (idx: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(idx);

    if (idx === currentQ.correctOptionIndex) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setScore((prev) => prev + 100 + nextStreak * 20);
      setCorrectCount((prev) => prev + 1);
      soundEffects.playCompletionChime();
    } else {
      setStreak(0);
      soundEffects.playClick();
    }
  };

  const handleNext = () => {
    speechNarrator.stop();
    if (currentIdx + 1 < roundQuestions.length) {
      soundEffects.playClick();
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
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
  };

  if (gameState === 'TITLE_MENU') {
    return (
      <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.55)] max-w-3xl mx-auto">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] text-[#8CA8FF] flex items-center justify-center shrink-0">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] mb-1">
              <span className="font-semibold text-[#8CA8FF]">Story Fill-in-Blank</span>
              <span aria-hidden="true">·</span>
              <span>{storyLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{Math.min(ROUNDS_PER_MATCH, pool.length)} Rounds</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#FFFFFF]">
              Missing Word Story Challenge
            </h2>
            <p className="text-sm text-[#CBD5E1] mt-1.5 leading-relaxed">
              Read real English sentences from the stories and pick the missing vocabulary word. Sinhala meanings and sentence translations unlock after you answer.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[rgba(165,180,252,0.14)]">
          <div className="text-xs text-[#94A3B8]">
            Listen to the complete English sentence after answering.
          </div>
          <button
            type="button"
            onClick={startGame}
            disabled={pool.length === 0}
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
    return (
      <div className="bg-[rgba(15,23,46,0.94)] rounded-3xl border border-[rgba(165,180,252,0.2)] p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] max-w-3xl mx-auto text-center">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] text-[#8CA8FF] flex items-center justify-center">
          <Award className="w-7 h-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF]">
          Story Challenge Complete!
        </h2>
        <p className="mt-2 text-sm text-[#CBD5E1] tabular-nums mb-7">
          Score: <span className="font-bold text-[#8CA8FF]">{score}</span>
          <span className="mx-2 text-[#64748B]" aria-hidden="true">·</span>
          Correct:{' '}
          <span className="font-bold text-[#6EE7B7]">
            {correctCount} / {roundQuestions.length}
          </span>
        </p>

        <button
          type="button"
          onClick={startGame}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Play Again</span>
        </button>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-5 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.55)] max-w-3xl mx-auto">
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgba(165,180,252,0.14)]">
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm tabular-nums text-[#CBD5E1]">
          <span>
            Sentence:{' '}
            <strong className="text-[#FFFFFF]">
              {currentIdx + 1} / {roundQuestions.length}
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

      {/* Story Context */}
      <div className="mb-3 text-xs font-medium text-[#8CA8FF]">
        From: {currentQ.storyTitleEn}
      </div>

      {/* Sentence with Inline Blank (English Only Before Answering; Reveals Sinhala Translation AFTER Answering) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#111933] border border-[rgba(165,180,252,0.15)] mb-6">
        <p className="text-lg sm:text-xl font-serif leading-relaxed text-[#F1F5F9]">
          {currentQ.beforeBlank ? <span>{currentQ.beforeBlank} </span> : null}
          <span
            className={`inline-block px-3 py-0.5 mx-1 rounded-lg border font-bold ${
              isAnswered
                ? isCorrect
                  ? 'bg-[rgba(2,44,34,0.8)] border-[#34D399] text-[#6EE7B7]'
                  : 'bg-[#1B2A55] border-[#6C7BFF] text-[#9CB8FF]'
                : 'bg-[#172347] border-[#6C7BFF] text-[#8CA8FF]'
            }`}
          >
            {isAnswered ? currentQ.targetDisplay : '________'}
          </span>
          {currentQ.afterBlank ? <span> {currentQ.afterBlank}</span> : null}
        </p>

        {isAnswered && (
          <p className="mt-3 pt-3 border-t border-[rgba(165,180,252,0.12)] text-xs sm:text-sm font-sinhala text-[#CBD5E1] leading-relaxed">
            {currentQ.sinhalaTranslation}
          </p>
        )}
      </div>

      {/* 4 English Word Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isAnswer = idx === currentQ.correctOptionIndex;

          let btnStyle =
            'bg-[#131C38] border-[rgba(165,180,252,0.18)] text-[#E2E8F0] hover:border-[rgba(108,123,255,0.65)] hover:bg-[#172347]';
          if (isAnswered) {
            if (isAnswer) {
              btnStyle =
                'bg-[rgba(2,44,34,0.72)] border-[rgba(52,211,153,0.75)] text-[#D1FAE5] font-semibold';
            } else if (isSelected && !isAnswer) {
              btnStyle =
                'bg-[rgba(76,5,25,0.72)] border-[rgba(251,113,133,0.75)] text-[#FFE4E6]';
            } else {
              btnStyle =
                'bg-[#0C1226] border-[rgba(165,180,252,0.1)] text-[#64748B]';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleChooseOption(idx)}
              className={`p-3.5 rounded-xl border text-left text-sm transition-colors flex items-center gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
            >
              <span
                className={`w-6 h-6 rounded-md text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                  isAnswered && isAnswer
                    ? 'bg-[#34D399] text-[#022C22]'
                    : isAnswered && isSelected && !isAnswer
                    ? 'bg-[#FB7185] text-[#4C0519]'
                    : 'bg-[#0B1124] text-[#94A3B8] border border-[rgba(165,180,252,0.2)]'
                }`}
              >
                {OPTION_LETTERS[idx]}
              </span>
              <span className="flex-1 font-serif font-semibold text-base">{option}</span>
              {isAnswered && isAnswer && (
                <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
              )}
              {isAnswered && isSelected && !isAnswer && (
                <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Sinhala Meaning Unlock After Answering */}
      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isCorrect
              ? 'bg-[rgba(2,44,34,0.65)] border-[rgba(52,211,153,0.5)] text-[#D1FAE5]'
              : 'bg-[rgba(76,5,25,0.65)] border-[rgba(251,113,133,0.45)] text-[#FFE4E6]'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
              )}
              <span className="text-sm font-bold">
                {isCorrect
                  ? 'Correct!'
                  : `Answer: "${currentQ.targetDisplay}"`}
              </span>
            </div>
            <p className="text-xs font-sinhala">
              <strong>{currentQ.targetVocab.word}</strong> ({currentQ.targetVocab.phonetic}) —{' '}
              {currentQ.targetVocab.sinhalaMeaning}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                speechNarrator.speakText(currentQ.fullSentenceEn, {});
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#182242] hover:bg-[#1E2B52] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold cursor-pointer whitespace-nowrap"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#8CA8FF]" />
              <span>Hear Sentence</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold cursor-pointer whitespace-nowrap"
            >
              <span>{currentIdx + 1 < roundQuestions.length ? 'Next Sentence' : 'See Results'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
