import React, { useState, useEffect } from 'react';
import { Story } from '../types/story';
import { X, CheckCircle2, AlertCircle, Award, RotateCcw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects, speechNarrator } from '../utils/audio';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, story }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setScore(0);
      setIsQuizFinished(false);
    } else {
      speechNarrator.stop();
    }
  }, [isOpen, story.id]);

  if (!isOpen) return null;

  const currentQ = story.quiz[currentQuestionIndex];
  const isCorrect = selectedOption === currentQ?.correctIndex;

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      soundEffects.playCompletionChime();
    } else {
      soundEffects.playClick();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < story.quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      soundEffects.playClick();
    } else {
      setIsQuizFinished(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      soundEffects.playCompletionChime();
    }
  };

  const handleResetQuiz = () => {
    soundEffects.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(4,7,17,0.82)] backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0F172E] rounded-3xl shadow-2xl border border-[rgba(165,180,252,0.22)] overflow-hidden flex flex-col">
        {/* Midnight Indigo Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(165,180,252,0.16)] bg-[#0B1124]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1A264B] text-[#8CA8FF] border border-[rgba(129,140,248,0.28)] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                Comprehension Quiz · කතාව තේරුම් ගැනීම
              </h2>
              <p className="text-xs text-[#94A3B8]">{story.titleEn}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!isQuizFinished && currentQ ? (
            <div>
              {/* Progress & Score Metadata */}
              <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-4 tabular-nums">
                <span>
                  Question {currentQuestionIndex + 1} of {story.quiz.length}
                </span>
                <span className="font-semibold text-[#8CA8FF]">
                  Score: {score} / {story.quiz.length}
                </span>
              </div>

              {/* English-Only Question */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#FFFFFF] leading-snug">
                  {currentQ.questionEn}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    speechNarrator.speakText(currentQ.questionEn, {});
                  }}
                  className="p-2 rounded-lg bg-[#182242] hover:bg-[#21305C] text-[#9CB8FF] transition-colors shrink-0 cursor-pointer"
                  title="Listen to question in English"
                  aria-label="Listen to question"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* English-Only Answer Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isAnswer = currentQ.correctIndex === idx;

                  let optionStyle =
                    'bg-[#131C38] border-[rgba(165,180,252,0.16)] text-[#E2E8F0] hover:border-[rgba(108,123,255,0.65)] hover:bg-[#172347]';
                  if (isAnswerSubmitted) {
                    if (isAnswer) {
                      optionStyle =
                        'bg-[rgba(2,44,34,0.72)] border-[rgba(52,211,153,0.75)] text-[#D1FAE5] font-semibold';
                    } else if (isSelected && !isAnswer) {
                      optionStyle =
                        'bg-[rgba(76,5,25,0.72)] border-[rgba(251,113,133,0.75)] text-[#FFE4E6]';
                    } else {
                      optionStyle =
                        'bg-[#0C1226] border-[rgba(165,180,252,0.1)] text-[#64748B]';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'bg-[#1B2A55] border-[#6C7BFF] text-[#FFFFFF] font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => {
                        soundEffects.playClick();
                        setSelectedOption(idx);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-colors flex items-center gap-3 cursor-pointer disabled:cursor-default ${optionStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-md text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                          isSelected || (isAnswerSubmitted && isAnswer)
                            ? 'bg-[#5B6CFF] text-[#FFFFFF]'
                            : 'bg-[#0B1124] text-[#94A3B8] border border-[rgba(165,180,252,0.2)]'
                        }`}
                      >
                        {OPTION_LETTERS[idx] ?? idx + 1}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>

                      {isAnswerSubmitted && isAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isAnswer && (
                        <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Banner After Answer Submission */}
              {isAnswerSubmitted && (
                <div
                  className={`mt-4 p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                    isCorrect
                      ? 'bg-[rgba(2,44,34,0.65)] border-[rgba(52,211,153,0.45)] text-[#D1FAE5]'
                      : 'bg-[rgba(76,5,25,0.65)] border-[rgba(251,113,133,0.45)] text-[#FFE4E6]'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#34D399]" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#FB7185]" />
                  )}
                  <div>
                    <p className="font-bold">
                      {isCorrect ? 'Correct! · නිවැරදියි!' : 'Not quite right · වැරදියි'}
                    </p>
                    <p className="text-xs font-sinhala mt-1 leading-relaxed opacity-90">
                      {currentQ.explanationSi}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Action Buttons */}
              <div className="mt-6 flex items-center justify-end gap-2">
                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    disabled={selectedOption === null}
                    onClick={handleSubmitAnswer}
                    className="px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold disabled:opacity-40 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Check Answer · පිළිතුර බලන්න
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
                  >
                    {currentQuestionIndex < story.quiz.length - 1
                      ? 'Next Question · ඊළඟ ප්‍රශ්නය'
                      : 'See Results · ප්‍රතිඵලය බලන්න'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#1A264B] border border-[rgba(129,140,248,0.28)] flex items-center justify-center text-[#8CA8FF]">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#FFFFFF] mb-1">
                Quiz Completed! · විශිෂ්ටයි!
              </h3>
              <p className="text-sm text-[#CBD5E1] mb-6 tabular-nums">
                You scored <span className="font-bold text-[#8CA8FF]">{score}</span> out of{' '}
                <span className="font-bold text-[#FFFFFF]">{story.quiz.length}</span>
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[rgba(165,180,252,0.22)] bg-[#162140] text-xs font-semibold text-[#E2E8F0] hover:bg-[#1E2C54] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-bold text-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  Done · අවසන්
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
