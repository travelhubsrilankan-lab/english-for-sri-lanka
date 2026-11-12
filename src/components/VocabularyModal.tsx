import React, { useState } from 'react';
import { Story, VocabularyWord } from '../types/story';
import { X, Volume2, Search, BookMarked } from 'lucide-react';
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

  React.useEffect(() => {
    setSelectedStoryFilter(currentStoryId);
    setFlashcardIndex(0);
    setIsFlipped(false);
  }, [currentStoryId, isOpen]);

  if (!isOpen) return null;

  const activeStory = stories.find((s) => s.id === selectedStoryFilter) || stories[0];
  const rawVocab: VocabularyWord[] = activeStory
    ? activeStory.chapters.flatMap((c) => c.keyVocabulary)
    : [];
  const allVocab: VocabularyWord[] = Array.from(
    new Map(rawVocab.map((v) => [v.word.toLowerCase(), v])).values()
  );

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(4,7,17,0.82)] backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0F172E] rounded-3xl shadow-2xl border border-[rgba(165,180,252,0.22)] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(165,180,252,0.16)] bg-[#0B1124]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1A264B] text-[#8CA8FF] border border-[rgba(129,140,248,0.28)] flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                වචන කෝෂය · Vocabulary Bank
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Key English words with Sinhala meanings and clear audio pronunciation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
            aria-label="Close vocabulary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Selector & Mode Switch */}
        <div className="px-6 py-3 border-b border-[rgba(165,180,252,0.14)] bg-[#0D1429] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {stories.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedStoryFilter(s.id);
                  setFlashcardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedStoryFilter === s.id
                    ? 'bg-indigo-tab text-[#FFFFFF] font-semibold'
                    : 'bg-[#151F3E] text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[#1B2850]'
                }`}
              >
                {s.titleEn}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#131C38] p-1 rounded-xl text-xs font-medium border border-[rgba(165,180,252,0.16)]">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('list');
              }}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'list'
                  ? 'bg-[#5B6CFF] text-[#FFFFFF] font-semibold'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
              }`}
            >
              List View
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('flashcard');
              }}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'flashcard'
                  ? 'bg-[#5B6CFF] text-[#FFFFFF] font-semibold'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
              }`}
            >
              Flashcards
            </button>
          </div>
        </div>

        {/* Content Body */}
        {activeTab === 'list' ? (
          <div className="overflow-y-auto p-6 space-y-3">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search words, English definitions, or සිංහල තේරුම්..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-[#0B1124] border border-[rgba(165,180,252,0.2)] text-[#FFFFFF] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[rgba(91,108,255,0.5)]"
              />
            </div>

            {filteredVocab.length === 0 ? (
              <p className="text-center text-xs text-[#94A3B8] py-8">No matching words found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredVocab.map((vocab) => (
                  <div
                    key={vocab.word}
                    className="p-4 rounded-2xl border border-[rgba(165,180,252,0.16)] bg-[#131C38] hover:border-[rgba(108,123,255,0.6)] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#FFFFFF]">{vocab.word}</h4>
                          <span className="text-xs text-[#94A3B8] font-mono">{vocab.phonetic}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSpeak(vocab.word)}
                          className="p-1.5 rounded-lg text-[#9CB8FF] hover:bg-[#1E2C54] transition-colors cursor-pointer"
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-[#9CB8FF] font-sinhala mb-1">
                        {vocab.sinhalaMeaning}
                      </p>

                      <p className="text-xs text-[#CBD5E1] leading-relaxed">
                        {vocab.englishDefinition}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[rgba(165,180,252,0.12)] flex items-center justify-between text-[11px] text-[#94A3B8]">
                      <span className="capitalize">{vocab.partOfSpeech}</span>
                      <span className="text-[#8CA8FF]">Click icon to listen</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center min-h-[380px]">
            {filteredVocab.length > 0 && currentFlashcard ? (
              <div className="w-full max-w-sm flex flex-col items-center">
                <div className="text-xs text-[#94A3B8] mb-2 font-mono tabular-nums">
                  Card {flashcardIndex + 1} of {filteredVocab.length}
                </div>

                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full h-56 rounded-3xl p-6 bg-[#131D3A] border border-[rgba(108,123,255,0.6)] shadow-[0_0_32px_-8px_rgba(99,102,241,0.3)] cursor-pointer flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]"
                >
                  {!isFlipped ? (
                    <>
                      <span className="text-xs font-medium text-[#94A3B8] mb-2">
                        English Word · Click to flip
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-[#FFFFFF] mb-1">
                        {currentFlashcard.word}
                      </h3>
                      <p className="text-xs font-mono text-[#94A3B8] mb-4">
                        {currentFlashcard.phonetic}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(currentFlashcard.word);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1D2B57] text-[#9CB8FF] text-xs font-semibold hover:bg-[#25366C] transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Pronounce</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-medium text-[#8CA8FF] mb-2">
                        සිංහල තේරුම & අර්ථය
                      </span>
                      <h3 className="text-xl font-bold text-[#FFFFFF] font-sinhala mb-2">
                        {currentFlashcard.sinhalaMeaning}
                      </h3>
                      <p className="text-xs text-[#CBD5E1] max-w-xs leading-relaxed">
                        {currentFlashcard.englishDefinition}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="button"
                    disabled={flashcardIndex === 0}
                    onClick={() => {
                      soundEffects.playClick();
                      setFlashcardIndex(Math.max(0, flashcardIndex - 1));
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-full bg-[#162140] border border-[rgba(165,180,252,0.22)] text-[#E2E8F0] disabled:opacity-40 text-xs font-medium cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setIsFlipped(!isFlipped);
                    }}
                    className="px-5 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] font-bold text-xs cursor-pointer"
                  >
                    {isFlipped ? 'Show Front' : 'Flip Card'}
                  </button>
                  <button
                    type="button"
                    disabled={flashcardIndex === filteredVocab.length - 1}
                    onClick={() => {
                      soundEffects.playClick();
                      setFlashcardIndex(Math.min(filteredVocab.length - 1, flashcardIndex + 1));
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-full bg-[#162140] border border-[rgba(165,180,252,0.22)] text-[#E2E8F0] disabled:opacity-40 text-xs font-medium cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#94A3B8]">No cards available.</p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-[rgba(165,180,252,0.16)] bg-[#0B1124] flex items-center justify-between text-xs text-[#94A3B8]">
          <span>Tap any highlighted word in the story anytime for instant meaning</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#182242] hover:bg-[#1F2D57] text-[#FFFFFF] font-semibold border border-[rgba(165,180,252,0.22)] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
