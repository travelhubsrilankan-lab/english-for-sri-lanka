import React, { useState, useEffect } from 'react';
import { Story, Chapter, VocabularyWord } from '../types/story';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Gauge,
  ArrowLeft,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { speechNarrator, soundEffects } from '../utils/audio';

interface BookContainerProps {
  story: Story;
  currentChapterNumber: number;
  onChapterChange: (newChapterNum: number) => void;
  onBackToStories: () => void;
}

export const BookContainer: React.FC<BookContainerProps> = ({
  story,
  currentChapterNumber,
  onChapterChange,
  onBackToStories,
}) => {
  const currentChapter: Chapter =
    story.chapters.find((c) => c.chapterNumber === currentChapterNumber) || story.chapters[0];

  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.85); // friendly slow speed for learners
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [inspectingWord, setInspectingWord] = useState<VocabularyWord | null>(null);

  // Sync speech narrator rate
  useEffect(() => {
    speechNarrator.rate = speechRate;
  }, [speechRate]);

  // When chapter changes, reset active sentence
  useEffect(() => {
    setActiveSentenceIndex(0);
    setIsVoiceActive(false);
    speechNarrator.stop();
  }, [currentChapterNumber]);

  // Speak a specific sentence
  const playSentence = (index: number, autoContinue = isPlaying) => {
    if (index >= currentChapter.sentences.length) {
      setIsVoiceActive(false);
      // Auto-advance to next chapter if available
      if (currentChapterNumber < story.chapters.length) {
        soundEffects.playPageFlip();
        onChapterChange(currentChapterNumber + 1);
        setActiveSentenceIndex(0);
      } else {
        setIsPlaying(false);
        soundEffects.playCompletionChime();
      }
      return;
    }

    setActiveSentenceIndex(index);
    setIsVoiceActive(true);
    const target = currentChapter.sentences[index];

    speechNarrator.speakText(target.englishText, {
      onEnd: () => {
        setIsVoiceActive(false);
        if (autoContinue) {
          setTimeout(() => {
            playSentence(index + 1, true);
          }, 700);
        }
      },
    });
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    soundEffects.playClick();
    if (isPlaying) {
      setIsPlaying(false);
      setIsVoiceActive(false);
      speechNarrator.stop();
    } else {
      setIsPlaying(true);
      playSentence(activeSentenceIndex, true);
    }
  };

  // Previous sentence
  const handlePrevSentence = () => {
    soundEffects.playClick();
    const prevIdx = Math.max(0, activeSentenceIndex - 1);
    playSentence(prevIdx, isPlaying);
  };

  // Next sentence
  const handleNextSentence = () => {
    soundEffects.playClick();
    const nextIdx = Math.min(currentChapter.sentences.length - 1, activeSentenceIndex + 1);
    playSentence(nextIdx, isPlaying);
  };

  // Word click
  const handleWordClick = (vocab?: VocabularyWord) => {
    if (vocab) {
      soundEffects.playWordTap();
      setInspectingWord(vocab);
      speechNarrator.speakWord(vocab.word);
    }
  };

  // Cycle speed between 0.8x (Slow/Learner) and 1.0x (Normal)
  const toggleSpeed = () => {
    soundEffects.playClick();
    if (speechRate <= 0.85) {
      setSpeechRate(1.0);
    } else {
      setSpeechRate(0.8);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 flex flex-col items-center animate-in fade-in duration-300">
      {/* Top Header Navigation */}
      <div className="w-full flex items-center justify-between gap-3 mb-5">
        <button
          onClick={onBackToStories}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-600" />
          <span>← සියලු කතා (All Stories)</span>
        </button>

        {/* Chapter Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-white border border-stone-200 p-1 rounded-xl">
          {story.chapters.map((chap) => {
            const isCurrent = chap.chapterNumber === currentChapterNumber;
            return (
              <button
                key={chap.id}
                onClick={() => {
                  soundEffects.playPageFlip();
                  onChapterChange(chap.chapterNumber);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                පරිච්ඡේද 0{chap.chapterNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Beautiful White Story Book Sheet */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xl shadow-stone-200/60 flex flex-col justify-between">
        {/* Story Illustration Banner */}
        {story.coverImage && (
          <div className="w-full h-44 sm:h-60 rounded-2xl overflow-hidden mb-6 border border-stone-200/80 shadow-xs bg-stone-100">
            <img
              src={story.coverImage}
              alt={story.titleEn}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Chapter Title Banner */}
        <div className="pb-5 mb-6 border-b border-stone-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1.5">
            <span>{story.titleEn}</span>
            <span className="text-stone-300">·</span>
            <span>පරිච්ඡේදය 0{currentChapter.chapterNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            {currentChapter.titleEn}
          </h1>
          <p className="text-sm font-sinhala text-stone-600 font-medium mt-1">
            {currentChapter.titleSi}
          </p>
        </div>

        {/* Sentences with synchronized highlighting and Sinhala translation */}
        <div className="space-y-5">
          {currentChapter.sentences.map((sentence, sIdx) => {
            const isActive = activeSentenceIndex === sIdx;

            return (
              <div
                key={sentence.id}
                onClick={() => {
                  soundEffects.playClick();
                  playSentence(sIdx, isPlaying);
                }}
                className={`p-4 rounded-2xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-50 border-2 border-amber-400 shadow-sm'
                    : 'bg-stone-50/60 hover:bg-stone-100/80 border border-stone-200/60'
                }`}
              >
                {/* English Text with clickable words */}
                <p className="text-lg sm:text-[19px] font-serif leading-relaxed text-stone-900">
                  {sentence.words.map((w, wIdx) => {
                    const hasVocab = !!w.vocab;

                    return (
                      <span
                        key={wIdx}
                        onClick={(e) => {
                          if (hasVocab) {
                            e.stopPropagation();
                            handleWordClick(w.vocab);
                          }
                        }}
                        className={`inline-block mr-1.5 transition-colors ${
                          hasVocab
                            ? 'text-amber-800 font-medium underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-950 cursor-pointer'
                            : ''
                        }`}
                        title={hasVocab ? `සිංහල තේරුම: ${w.vocab?.sinhalaMeaning}` : undefined}
                      >
                        {w.displayWord}
                      </span>
                    );
                  })}
                </p>

                {/* Sinhala Sentence Translation */}
                <p className="text-xs sm:text-sm font-sinhala text-stone-600 mt-2 font-medium leading-normal">
                  {sentence.sinhalaTranslation}
                </p>
              </div>
            );
          })}
        </div>

        {/* Vocabulary Box: Clean & Simple */}
        <div className="mt-8 p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>මෙම පරිච්ඡේදයේ ප්‍රධාන ඉංග්‍රීසි වචන (Key Words):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {currentChapter.keyVocabulary.map((vocab) => (
              <button
                key={vocab.word}
                onClick={() => handleWordClick(vocab)}
                className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-left transition-all flex items-center justify-between gap-2 shadow-2xs cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-stone-900">{vocab.word}</p>
                  <p className="text-[11px] font-sinhala text-amber-800 font-medium">
                    {vocab.sinhalaMeaning}
                  </p>
                </div>
                <Volume2 className="w-3.5 h-3.5 text-amber-600 shrink-0 opacity-70" />
              </button>
            ))}
          </div>
        </div>

        {/* Next Chapter Switcher Button */}
        {currentChapterNumber < story.chapters.length ? (
          <div className="mt-8 pt-5 border-t border-stone-100 flex justify-end">
            <button
              onClick={() => {
                soundEffects.playPageFlip();
                onChapterChange(currentChapterNumber + 1);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              <span>ඊළඟ පරිච්ඡේදය (Chapter 0{currentChapterNumber + 1})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">
              ✨ කතාව අවසන් විය! (Story Complete)
            </span>
            <button
              onClick={onBackToStories}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <span>තවත් කතාවක් තෝරන්න</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Simple, Clear, Big Bottom Floating Audio Player */}
      <div className="sticky bottom-4 w-full max-w-xl mt-5 px-5 py-3 rounded-2xl bg-white border border-stone-200 shadow-xl text-stone-900 flex items-center justify-between gap-3">
        {/* Sentence Counter */}
        <div className="text-xs">
          <span className="font-bold text-amber-700">
            {activeSentenceIndex + 1}
          </span>
          <span className="text-stone-400"> / {currentChapter.sentences.length}</span>
        </div>

        {/* Center: Play, Prev, Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevSentence}
            disabled={activeSentenceIndex === 0}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-stone-700 transition-colors cursor-pointer"
            title="කලින් වැකිය (Previous Sentence)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Big Play / Pause button */}
          <button
            onClick={handleTogglePlay}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-stone-950" />}
            <span>{isPlaying ? 'නවත්වන්න' : 'අසන්න (Play)'}</span>

            {/* Live Audio animation */}
            {isVoiceActive && (
              <span className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 bg-stone-950 rounded-full animate-wave-1" />
                <span className="w-0.5 bg-stone-950 rounded-full animate-wave-2" />
                <span className="w-0.5 bg-stone-950 rounded-full animate-wave-3" />
              </span>
            )}
          </button>

          <button
            onClick={handleNextSentence}
            disabled={activeSentenceIndex === currentChapter.sentences.length - 1}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-30 text-stone-700 transition-colors cursor-pointer"
            title="ඊළඟ වැකිය (Next Sentence)"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed toggle: Slow vs Normal */}
        <button
          onClick={toggleSpeed}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
          title="කියවීමේ වේගය"
        >
          <Gauge className="w-3.5 h-3.5 text-amber-600" />
          <span>{speechRate <= 0.85 ? 'සෙමින්' : 'සාමාන්‍ය'}</span>
        </button>
      </div>

      {/* Floating Word Meaning Card (When clicking any word) */}
      {inspectingWord && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm p-4 rounded-2xl bg-white text-stone-900 shadow-2xl border border-stone-200 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-serif font-bold text-amber-800">
                {inspectingWord.word}
              </h3>
              <span className="text-xs text-stone-400 font-mono">
                {inspectingWord.phonetic}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => speechNarrator.speakWord(inspectingWord.word)}
                className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors cursor-pointer"
                title="නැවත අසන්න"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setInspectingWord(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/60">
            <p className="text-sm font-bold text-amber-900 font-sinhala">
              {inspectingWord.sinhalaMeaning}
            </p>
          </div>

          <p className="text-xs text-stone-600">
            {inspectingWord.englishDefinition}
          </p>
        </div>
      )}
    </div>
  );
};
