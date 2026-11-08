import React, { useState } from 'react';
import { Story } from '../types/story';
import { X, CheckCircle, AlertCircle, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, story }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

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
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#15181f] rounded-3xl shadow-2xl border border-stone-200 dark:border-white/10 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-white/10 bg-stone-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                කතාව තේරුම් ගැනීම · Comprehension
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {story.titleEn}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isQuizFinished && currentQ ? (
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 mb-3 font-mono">
                <span>Question {currentQuestionIndex + 1} of {story.quiz.length}</span>
                <span>Score: {score}</span>
              </div>

              {/* Question En & Si */}
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">
                {currentQ.questionEn}
              </h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-sinhala mb-4">
                {currentQ.questionSi}
              </p>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isAnswer = currentQ.correctIndex === idx;

                  let optionStyle = 'bg-stone-50/50 dark:bg-[#1a1e27] border-stone-200/80 dark:border-white/5 text-stone-800 dark:text-stone-200 hover:border-amber-400';
                  if (isAnswerSubmitted) {
                    if (isAnswer) {
                      optionStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium';
                    } else if (isSelected && !isAnswer) {
                      optionStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500 text-stone-900 dark:text-stone-100 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => {
                        soundEffects.playClick();
                        setSelectedOption(idx);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex flex-col gap-0.5 ${optionStyle}`}
                    >
                      <span className="font-medium">{option}</span>
                      <span className="text-[11px] font-sinhala opacity-75">{currentQ.optionsSi[idx]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation on submit */}
              {isAnswerSubmitted && (
                <div
                  className={`mt-4 p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
                    isCorrect
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                  )}
                  <div>
                    <p className="font-semibold">{isCorrect ? 'නිවැරදියි! (Correct!)' : 'වැරදියි (Incorrect)'}</p>
                    <p className="text-[11px] font-sinhala mt-0.5">{currentQ.explanationSi}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-5 flex items-center justify-end gap-2">
                {!isAnswerSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleSubmitAnswer}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400 disabled:opacity-40 transition-colors shadow-sm"
                  >
                    පිළිතුර තහවුරු කරන්න · Check
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    {currentQuestionIndex < story.quiz.length - 1 ? 'ඊළඟ ප්‍රශ්නය · Next' : 'ප්‍රතිඵලය බලන්න · Results'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                විශිෂ්ටයි! Quiz Completed!
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mb-5">
                You scored <span className="font-bold text-amber-500">{score}</span> out of{' '}
                <span className="font-bold">{story.quiz.length}</span>!
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 dark:border-white/10 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>නැවත උත්සාහ කරන්න</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400"
                >
                  කතාවට ආපසු යන්න · Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
