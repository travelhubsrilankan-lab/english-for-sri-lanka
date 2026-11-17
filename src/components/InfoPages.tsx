import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Gamepad2,
  Mail,
  ShieldCheck,
  FileText,
  Info,
  Copy,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';
import { InfoPageId } from '../utils/router';

interface InfoPagesProps {
  page: InfoPageId;
  onNavigateInfo: (page: InfoPageId) => void;
  onBackHome: () => void;
}

const CONTACT_EMAIL = 'travelhubsrilankan@gmail.com';

export const InfoPages: React.FC<InfoPagesProps> = ({
  page,
  onNavigateInfo,
  onBackHome,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [mailSentNotice, setMailSentNotice] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const handleOpenMailClient = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject.trim() || `StoryGlow Feedback from ${senderName.trim() || 'Reader'}`
    );
    const mailBody = encodeURIComponent(
      `Name: ${senderName.trim() || 'StoryGlow Visitor'}\n\n${message.trim()}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
    setMailSentNotice(true);
  };

  const tabs: Array<{ id: InfoPageId; label: string; icon: React.ReactNode }> = [
    { id: 'about', label: 'About Us', icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> },
    {
      id: 'privacy-policy',
      label: 'Privacy Policy',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
    { id: 'terms', label: 'Terms of Use', icon: <FileText className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#8CA8FF]" />
          <span>Back to Stories</span>
        </button>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-[rgba(13,20,41,0.92)] border border-[rgba(165,180,252,0.16)] rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigateInfo(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                page === tab.id
                  ? 'bg-indigo-tab text-[#FFFFFF]'
                  : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Card */}
      <article className="bg-[rgba(15,23,46,0.94)] rounded-3xl border border-[rgba(165,180,252,0.2)] p-6 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
        {page === 'about' && (
          <div className="space-y-6">
            <header className="border-b border-[rgba(165,180,252,0.16)] pb-5">
              <div className="text-xs font-semibold text-[#8CA8FF] mb-1.5">
                About StoryGlow
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF]">
                Learning English Through Sri Lankan Stories
              </h1>
              <p className="text-sm font-sinhala text-[#CBD5E1] mt-2 leading-relaxed">
                ශ්‍රී ලාංකික පාඨකයන්ට හා සිසුන්ට කතා කියවමින් සහ විනෝදජනක ක්‍රීඩා හරහා පහසුවෙන් ඉංග්‍රීසි ඉගෙන ගැනීමට නිර්මාණය කළ අන්තර්ක්‍රියාකාරී වෙබ් අඩවියකි.
              </p>
            </header>

            <section className="space-y-3 text-sm text-[#CBD5E1] leading-relaxed">
              <h2 className="text-lg font-serif font-bold text-[#FFFFFF]">Our Mission</h2>
              <p>
                StoryGlow is an educational reading and vocabulary platform created specifically for Sri Lankan students and everyday English learners. Instead of memorizing dry word lists, learners read engaging, culturally familiar stories—from village CTB bus adventures and Yala National Park elephants to Sigiriya legends and Galle Fort history.
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#121B36] border border-[rgba(165,180,252,0.16)]">
                <div className="flex items-center gap-2 text-[#8CA8FF] font-semibold text-sm mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Bilingual Guided Reading</span>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Every story includes sentence-by-sentence English narration, speed control, tap-to-translate vocabulary words with phonetic guides, optional Sinhala translations, and comprehension quizzes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121B36] border border-[rgba(165,180,252,0.16)]">
                <div className="flex items-center gap-2 text-[#6EE7B7] font-semibold text-sm mb-2">
                  <Gamepad2 className="w-4 h-4" />
                  <span>Interactive Word Games</span>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Five brain-friendly games (Word Match, Word Scramble, Missing Word Story, Speed Spell, and Word Detective) challenge you in English first and reveal Sinhala meanings only after you answer.
                </p>
              </div>
            </div>

            <section className="p-4 rounded-2xl bg-[#131D3D] border border-[rgba(108,123,255,0.28)]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8CA8FF] mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>4 Curated Story Categories</span>
              </div>
              <ul className="text-xs text-[#CBD5E1] space-y-1.5 leading-relaxed">
                <li>· Folk Tales &amp; Parables (ජන කතා සහ උපමා කතා)</li>
                <li>· Village &amp; Everyday Life (ගැමි ජීවිතය සහ එදිනෙදා කතා)</li>
                <li>· Sri Lankan Nature &amp; Wildlife (ලංකාවේ සොබාදහම සහ සතුන්)</li>
                <li>· Heritage, History &amp; Mystery (උරුමය, ඉතිහාසය සහ අභිරහස්)</li>
              </ul>
            </section>
          </div>
        )}

        {page === 'contact' && (
          <div className="space-y-6">
            <header className="border-b border-[rgba(165,180,252,0.16)] pb-5">
              <div className="text-xs font-semibold text-[#8CA8FF] mb-1.5">
                Contact StoryGlow
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF]">
                Get in Touch With Us
              </h1>
              <p className="text-sm font-sinhala text-[#CBD5E1] mt-2 leading-relaxed">
                නව කතා යෝජනා, අදහස් හෝ තාක්ෂණික සහාය සඳහා පහත ඊමේල් ලිපිනය හරහා අප හා සම්බන්ධ වන්න.
              </p>
            </header>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#121B36] border border-[rgba(165,180,252,0.18)] flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-[#94A3B8]">Official Contact Email</div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm sm:text-base font-mono font-semibold text-[#9CB8FF] hover:text-[#FFFFFF]"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#182242] hover:bg-[#1E2B52] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs font-semibold cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span className="text-[#6EE7B7]">Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8CA8FF]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            <form onSubmit={handleOpenMailClient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#CBD5E1] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nimal Perera"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D152C] border border-[rgba(165,180,252,0.2)] text-sm text-[#FFFFFF] placeholder-[#64748B] focus:outline-none focus:border-[#6C7BFF]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-[#CBD5E1] mb-1.5"
                  >
                    Topic / Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="New story idea or feedback"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D152C] border border-[rgba(165,180,252,0.2)] text-sm text-[#FFFFFF] placeholder-[#64748B] focus:outline-none focus:border-[#6C7BFF]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-[#CBD5E1] mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message, story suggestion, or question here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D152C] border border-[rgba(165,180,252,0.2)] text-sm text-[#FFFFFF] placeholder-[#64748B] focus:outline-none focus:border-[#6C7BFF]"
                />
              </div>

              {mailSentNotice && (
                <div className="p-3 rounded-xl bg-[rgba(2,44,34,0.65)] border border-[rgba(52,211,153,0.45)] text-xs text-[#A7F3D0]">
                  Your email app has been opened to send your message to {CONTACT_EMAIL}. If it did not open, please email us directly using the address above.
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-cta text-[#FFFFFF] text-xs font-bold cursor-pointer whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via Email App</span>
              </button>
            </form>
          </div>
        )}

        {page === 'privacy-policy' && (
          <div className="space-y-5 text-sm text-[#CBD5E1] leading-relaxed">
            <header className="border-b border-[rgba(165,180,252,0.16)] pb-5">
              <div className="text-xs font-semibold text-[#8CA8FF] mb-1.5">
                Legal &amp; Privacy
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF]">
                Privacy Policy
              </h1>
              <p className="text-xs text-[#94A3B8] mt-1">Last updated: November 2026</p>
            </header>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                1. Information We Collect
              </h2>
              <p>
                StoryGlow can be used freely without creating an account. We do not collect, store, or sell personal data such as your name, phone number, or home address while you read stories or play games. If you voluntarily send us an email via the Contact page, we use your email address solely to reply to your inquiry.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                2. Local Browser Storage
              </h2>
              <p>
                Your game high scores are stored locally inside your own web browser using{' '}
                <code className="px-1.5 py-0.5 rounded bg-[#121B36] text-[#9CB8FF] text-xs">
                  localStorage
                </code>
                . This data stays strictly on your device and is never transmitted to our servers. You may clear it anytime through your browser settings.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                3. Cookies, Analytics &amp; Advertising Partners
              </h2>
              <p>
                StoryGlow uses Google Fonts for typography. In addition, third-party advertising networks (such as Google AdSense) or traffic analytics tools may be used on this domain. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.
              </p>
              <p>
                Users may opt out of personalized advertising by visiting Google&apos;s{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8CA8FF] underline hover:text-[#FFFFFF]"
                >
                  Ads Settings
                </a>{' '}
                or{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8CA8FF] underline hover:text-[#FFFFFF]"
                >
                  aboutads.info
                </a>
                .
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                4. Audio Narration
              </h2>
              <p>
                English word and sentence pronunciation uses your browser&apos;s built-in Speech Synthesis API and Web Audio API. StoryGlow does not record microphone audio or upload voice data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                5. Children&apos;s Privacy &amp; Contact
              </h2>
              <p>
                StoryGlow is designed as a safe, family-friendly educational resource. If you have any questions about this Privacy Policy, please contact us at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#8CA8FF] underline hover:text-[#FFFFFF]"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
        )}

        {page === 'terms' && (
          <div className="space-y-5 text-sm text-[#CBD5E1] leading-relaxed">
            <header className="border-b border-[rgba(165,180,252,0.16)] pb-5">
              <div className="text-xs font-semibold text-[#8CA8FF] mb-1.5">
                Legal &amp; Guidelines
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF]">
                Terms of Use
              </h1>
              <p className="text-xs text-[#94A3B8] mt-1">Last updated: November 2026</p>
            </header>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using StoryGlow, you agree to comply with these Terms of Use for personal, non-commercial, and educational learning purposes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                2. Educational Content &amp; Intellectual Property
              </h2>
              <p>
                All stories, Sinhala translations, vocabulary definitions, audio cues, illustrations, and game interfaces published on StoryGlow are intended for reading and English language practice. Teachers, students, and parents are welcome to share direct links to StoryGlow stories and games for learning. Repackaging or scraping the entire site for commercial redistribution without written permission is not permitted.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                3. Disclaimer of Warranties
              </h2>
              <p>
                StoryGlow is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While we strive for accurate English grammar, Sinhala meanings, and reliable audio playback across modern browsers, speech synthesis voice quality may vary depending on your operating system and browser.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                4. Updates &amp; Contact
              </h2>
              <p>
                We may update stories, features, or these Terms from time to time. Questions regarding these Terms can be sent to{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#8CA8FF] underline hover:text-[#FFFFFF]"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
        )}
      </article>
    </div>
  );
};
