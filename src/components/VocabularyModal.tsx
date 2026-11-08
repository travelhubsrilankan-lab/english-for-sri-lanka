import React, { useState } from 'react';
import { Story, VocabularyWord } from '../types/story';
import { X, Volume2, Search, BookMarked, Sparkles } from 'lucide-react';
import { speechNarrator, soundEffects } from '../utils/audio';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  currentStoryId: string;
}

export const VocabularyModal: React.FC<VocabularyModalProps> = ({
  isOpen,
  onClose,
  stories,
  currentStoryId,
}) => {
  const [selectedStoryFilter, setSelectedStoryFilter] = useState<string>(currentStoryId);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'flashcard'>('list');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  // Aggregate vocabulary
  const activeStory = stories.find((s) => s.id === selectedStoryFilter) || stories[0];
  const allVocab: VocabularyWord[] = activeStory.chapters.flatMap((c) => c.keyVocabulary);

  const filteredVocab = allVocab.filter(
    (item) =>
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sinhalaMeaning.includes(searchQuery) ||
      item.englishDefinition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentFlashcard = filteredVocab[flashcardIndex] || filteredVocab[0];

  const handleSpeak = (word: string) => {
    soundEffects.playWordTap();
    speechNarrator.speakWord(word);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#15181f] rounded-3xl shadow-2xl border border-stone-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-white/10 bg-stone-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                වචන කෝෂය · Vocabulary Bank
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Key English words with Sinhala meanings and clear audio pronunciation
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Selector & Search */}
        <div className="px-6 py-3 border-b border-stone-100 dark:border-white/10 bg-stone-50/50 dark:bg-[#181c24] flex flex-wrap items-center justify-between gap-3">
          {/* Story Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {stories.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedStoryFilter(s.id);
                  setFlashcardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 text-xs rounded-xl font-medium whitespace-nowrap transition-colors ${
                  selectedStoryFilter === s.id
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-white dark:bg-white/5 text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-white/10'
                }`}
              >
                {s.titleEn}
              </button>
            ))}
          </div>

          {/* Mode Switch */}
          <div className="flex items-center gap-1 bg-stone-200/60 dark:bg-white/5 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('list');
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'list'
                  ? 'bg-white dark:bg-white/15 text-stone-900 dark:text-stone-100 font-semibold shadow-xs'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('flashcard');
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'flashcard'
                  ? 'bg-white dark:bg-white/15 text-stone-900 dark:text-stone-100 font-semibold shadow-xs'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              Flashcards
            </button>
          </div>
        </div>

        {/* Content Body */}
        {activeTab === 'list' ? (
          <div className="overflow-y-auto p-6 space-y-3">
            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search words, English definitions, or සිංහල තේරුම්..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-2xl bg-stone-50 dark:bg-[#141820] border border-stone-200/80 dark:border-white/10 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            {filteredVocab.length === 0 ? (
              <p className="text-center text-xs text-stone-400 py-8">No matching words found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredVocab.map((vocab) => (
                  <div
                    key={vocab.word}
                    className="p-4 rounded-2xl border border-stone-200/80 dark:border-white/5 bg-stone-50/50 dark:bg-[#1a1e27] hover:border-amber-400/50 dark:hover:border-amber-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                            {vocab.word}
                          </h4>
                          <span className="text-xs text-stone-400 font-mono">
                            {vocab.phonetic}
                          </span>
                        </div>
                        <button
                          onClick={() => handleSpeak(vocab.word)}
                          className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-100/60 dark:text-amber-400 dark:hover:bg-white/10 transition-colors"
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Sinhala Meaning */}
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 font-sinhala mb-1">
                        {vocab.sinhalaMeaning}
                      </p>

                      {/* Definition */}
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        {vocab.englishDefinition}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-200/50 dark:border-white/5 flex items-center justify-between text-[11px] text-stone-400">
                      <span className="capitalize">{vocab.partOfSpeech}</span>
                      <span className="text-amber-600/80 dark:text-amber-400/80">Click to listen</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Flashcards Practice Mode */
          <div className="p-8 flex flex-col items-center justify-center min-h-[380px]">
            {filteredVocab.length > 0 && currentFlashcard ? (
              <div className="w-full max-w-sm flex flex-col items-center">
                <div className="text-xs text-stone-400 mb-2 font-mono">
                  Card {flashcardIndex + 1} of {filteredVocab.length}
                </div>

                {/* Flip Card */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full h-56 rounded-3xl p-6 bg-stone-50 dark:bg-[#1a1e27] border-2 border-amber-400 dark:border-amber-500/60 shadow-xl cursor-pointer flex flex-col items-center justify-center text-center transition-all hover:scale-[1.01]"
                >
                  {!isFlipped ? (
                    <>
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                        English Word (Click to reveal Sinhala)
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                        {currentFlashcard.word}
                      </h3>
                      <p className="text-xs font-mono text-stone-400 mb-4">{currentFlashcard.phonetic}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(currentFlashcard.word);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Pronounce</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                        සිංහල තේරුම & අර්ථය
                      </span>
                      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-sinhala mb-2">
                        {currentFlashcard.sinhalaMeaning}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 max-w-xs">
                        {currentFlashcard.englishDefinition}
                      </p>
                    </>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    disabled={flashcardIndex === 0}
                    onClick={() => {
                      soundEffects.playClick();
                      setFlashcardIndex(Math.max(0, flashcardIndex - 1));
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-stone-200 disabled:opacity-40 text-xs font-medium"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setIsFlipped(!isFlipped);
                    }}
                    className="px-5 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400"
                  >
                    {isFlipped ? 'Show Front' : 'Flip Card'}
                  </button>
                  <button
                    disabled={flashcardIndex === filteredVocab.length - 1}
                    onClick={() => {
                      soundEffects.playClick();
                      setFlashcardIndex(Math.min(filteredVocab.length - 1, flashcardIndex + 1));
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-stone-200 disabled:opacity-40 text-xs font-medium"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-400">No cards available.</p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-white/10 bg-stone-50/70 dark:bg-white/[0.02] flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Tap any highlighted word in the story anytime for instant definition</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold transition-colors hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
