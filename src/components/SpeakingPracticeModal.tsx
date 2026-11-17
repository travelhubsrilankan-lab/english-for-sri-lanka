import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X, RotateCcw, Award, AlertCircle } from 'lucide-react';
import { speechNarrator, soundEffects } from '../utils/audio';
import { useUserProgress } from '../context/UserProgressContext';

interface SpeakingPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sentenceText: string;
  sinhalaTranslation?: string;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
}

function getSpeechRecognitionConstructor(): (new () => SpeechRecognitionLike) | null {
  const win = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
}

function normalizeToken(token: string): string {
  return token.toLowerCase().replace(/[^a-z0-9']/g, '');
}

export const SpeakingPracticeModal: React.FC<SpeakingPracticeModalProps> = ({
  isOpen,
  onClose,
  sentenceText,
  sinhalaTranslation,
}) => {
  const { recordLearningActivity } = useUserProgress();
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const speechSupported = typeof window !== 'undefined' && !!getSpeechRecognitionConstructor();

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore abort errors
        }
        recognitionRef.current = null;
      }
      setIsListening(false);
      return;
    }

    setSpokenText('');
    setErrorMessage(null);
    setHasEvaluated(false);
    setIsListening(false);
  }, [isOpen, sentenceText]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  if (!isOpen) return null;

  const targetWords = sentenceText.trim().split(/\s+/).filter(Boolean);
  const spokenNormalizedSet = new Set(
    spokenText
      .trim()
      .split(/\s+/)
      .map(normalizeToken)
      .filter(Boolean)
  );

  const matchedWordCount = targetWords.reduce((count, w) => {
    const clean = normalizeToken(w);
    return clean && spokenNormalizedSet.has(clean) ? count + 1 : count;
  }, 0);

  const accuracyPct =
    targetWords.length > 0 && spokenText.trim()
      ? Math.round((matchedWordCount / targetWords.length) * 100)
      : 0;

  const startListening = () => {
    const RecognitionCtor = getSpeechRecognitionConstructor();
    if (!RecognitionCtor) {
      setErrorMessage(
        'Voice recognition requires Chrome, Edge, or Safari on a supported device.'
      );
      return;
    }

    soundEffects.playClick();
    speechNarrator.stop();
    setErrorMessage(null);
    setSpokenText('');
    setHasEvaluated(false);

    try {
      const recognition = new RecognitionCtor();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let combined = '';
        let finalDetected = false;
        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          if (res[0]?.transcript) {
            combined += `${res[0].transcript} `;
          }
          if (res.isFinal) {
            finalDetected = true;
          }
        }
        const cleaned = combined.trim();
        setSpokenText(cleaned);
        if (finalDetected && cleaned.length > 0) {
          setHasEvaluated(true);
          recordLearningActivity();
          soundEffects.playCompletionChime();
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage(
            'මයික්‍රෆෝනය සඳහා අවසර නොලැබුණි. කරුණාකර Browser Microphone permission ලබාදී නැවත උත්සාහ කරන්න.'
          );
        } else if (event.error === 'no-speech') {
          setErrorMessage('හඬ හඳුනාගැනීමට නොහැකි විය. මයික්‍රෆෝනයට ළං වී පැහැදිලිව කියවන්න.');
        } else if (event.error !== 'aborted') {
          setErrorMessage('කථන පරීක්ෂාවේ දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setHasEvaluated((prev) => prev || spokenText.trim().length > 0);
      };

      recognitionRef.current = recognition;
      setIsListening(true);
      recognition.start();
    } catch {
      setIsListening(false);
      setErrorMessage('මයික්‍රෆෝනය ආරම්භ කිරීමට නොහැකි විය.');
    }
  };

  const stopListening = () => {
    soundEffects.playClick();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors
      }
    }
    setIsListening(false);
    if (spokenText.trim()) {
      setHasEvaluated(true);
      recordLearningActivity();
    }
  };

  const handleListenSample = () => {
    soundEffects.playClick();
    if (isListening) stopListening();
    speechNarrator.speakText(sentenceText, {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(4,7,17,0.84)] backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0F172E] rounded-3xl shadow-2xl border border-[rgba(165,180,252,0.24)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(165,180,252,0.16)] bg-[#0B1124]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1A264B] text-[#8CA8FF] border border-[rgba(129,140,248,0.28)] flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                Voice Speaking Practice · කථන පුහුණුව
              </h2>
              <p className="text-xs text-[#94A3B8] font-sinhala">
                වාක්‍යය අසා මයික්‍රෆෝනයෙන් පැහැදිලිව කියවන්න
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
            aria-label="Close speaking practice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Sentence Card with Word-by-Word Accuracy Highlight */}
          <div className="p-5 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.18)]">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-[#8CA8FF]">
                Read Aloud in English:
              </span>
              <button
                type="button"
                onClick={handleListenSample}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C2A54] hover:bg-[#24366B] text-[#9CB8FF] text-xs font-semibold transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen First</span>
              </button>
            </div>

            <p className="text-lg sm:text-xl font-serif leading-relaxed">
              {targetWords.map((word, idx) => {
                const clean = normalizeToken(word);
                const isMatched = spokenText.trim().length > 0 && clean && spokenNormalizedSet.has(clean);
                const isMissedAfterEval = hasEvaluated && !isMatched;

                return (
                  <span
                    key={`${word}-${idx}`}
                    className={`inline-block mr-1.5 transition-colors ${
                      isMatched
                        ? 'text-[#6EE7B7] font-semibold'
                        : isMissedAfterEval
                        ? 'text-[#FCD34D] underline decoration-[#F59E0B] underline-offset-4'
                        : 'text-[#FFFFFF]'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </p>

            {sinhalaTranslation && (
              <p className="mt-3 pt-3 border-t border-[rgba(165,180,252,0.12)] text-xs sm:text-sm font-sinhala text-[#CBD5E1] leading-relaxed">
                {sinhalaTranslation}
              </p>
            )}
          </div>

          {/* Microphone Action Button */}
          <div className="flex flex-col items-center justify-center py-2">
            {!speechSupported ? (
              <div className="w-full p-4 rounded-2xl bg-[rgba(120,53,15,0.3)] border border-[rgba(251,191,36,0.4)] text-xs text-[#FDE68A] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#FBBF24]" />
                <div className="font-sinhala leading-relaxed">
                  මෙම Browser එකේ Voice Recognition පහසුකම සහාය නොදක්වයි. කරුණාකර Google Chrome හෝ Microsoft Edge භාවිතා කරන්න, නැතහොත් Listen First ඔබා ශබ්ද නඟා කියවා පුහුණු වන්න.
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all cursor-pointer shadow-lg ${
                    isListening
                      ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-[#FFFFFF] animate-pulse'
                      : 'bg-indigo-cta text-[#FFFFFF]'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      <span>නවත්වන්න (Stop Listening)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>කියවන්න පටන් ගන්න (Start Speaking)</span>
                    </>
                  )}
                </button>
                <p className="mt-2.5 text-xs text-[#94A3B8] font-sinhala text-center">
                  {isListening
                    ? 'සවන් දෙමින් පවතී... ඉංග්‍රීසි වාක්‍යය පැහැදිලිව කියවන්න.'
                    : 'බොත්තම ඔබා ඉහත ඉංග්‍රීසි වාක්‍යය හඬ නඟා කියවන්න.'}
                </p>
              </>
            )}
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[rgba(76,5,25,0.65)] border border-[rgba(251,113,133,0.45)] text-xs text-[#FFE4E6] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#FB7185]" />
              <span className="font-sinhala leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Live Transcript & Score Evaluation */}
          {spokenText && (
            <div className="p-4 rounded-2xl bg-[#0B1124] border border-[rgba(165,180,252,0.18)] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#94A3B8]">
                  You said (ඔබ කී දේ):
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold tabular-nums ${
                    accuracyPct >= 80
                      ? 'text-[#6EE7B7]'
                      : accuracyPct >= 50
                      ? 'text-[#FCD34D]'
                      : 'text-[#FCA5A5]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{accuracyPct}% Match</span>
                </span>
              </div>

              <p className="text-sm font-serif text-[#E2E8F0] italic">
                &ldquo;{spokenText}&rdquo;
              </p>

              <p className="text-xs font-sinhala text-[#CBD5E1]">
                {accuracyPct >= 80
                  ? 'විශිෂ්ටයි! ඔබේ ඉංග්‍රීසි උච්චාරණය ඉතා පැහැදිලියි.'
                  : accuracyPct >= 50
                  ? 'හොඳ උත්සාහයක්! කහ පැහැති වචන නැවත අසා පුහුණු වන්න.'
                  : 'නැවත Listen First ඔබා අසමින් සෙමින් කියවන්න.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[rgba(165,180,252,0.16)] bg-[#0B1124] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setSpokenText('');
              setErrorMessage(null);
              setHasEvaluated(false);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#162140] hover:bg-[#1E2C54] text-[#CBD5E1] border border-[rgba(165,180,252,0.2)] text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold transition-all cursor-pointer"
          >
            Done · අවසන්
          </button>
        </div>
      </div>
    </div>
  );
};
