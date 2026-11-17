import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import {
  BarChart3,
  Users,
  BookOpen,
  Flame,
  Trophy,
  Star,
  ArrowLeft,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { STORIES } from '../data/stories';
import { useUserProgress } from '../context/UserProgressContext';
import { soundEffects } from '../utils/audio';

interface DailyVisitRow {
  date: string;
  visits: number;
}

interface StoryViewRow {
  storyId: string;
  views: number;
}

interface AnalyticsPageProps {
  onBackHome: () => void;
  onSelectStory: (storyId: string) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  onBackHome,
  onSelectStory,
}) => {
  const { completedStoryIds, savedWords, streakCount, quizScores, gameBestScores } =
    useUserProgress();

  const [dailyRows, setDailyRows] = useState<DailyVisitRow[]>([]);
  const [storyRows, setStoryRows] = useState<StoryViewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchAnalytics() {
      setLoading(true);
      setLoadError(null);
      try {
        const dailyQ = query(
          collection(db, 'analytics_daily'),
          orderBy('date', 'desc'),
          limit(14)
        );
        const storiesQ = query(
          collection(db, 'analytics_stories'),
          orderBy('views', 'desc'),
          limit(20)
        );

        const [dailySnap, storiesSnap] = await Promise.all([
          getDocs(dailyQ).catch((err) =>
            handleFirestoreError(err, OperationType.LIST, 'analytics_daily')
          ),
          getDocs(storiesQ).catch((err) =>
            handleFirestoreError(err, OperationType.LIST, 'analytics_stories')
          ),
        ]);

        if (!active) return;

        const nextDaily: DailyVisitRow[] = dailySnap.docs
          .map((d) => ({
            date: String(d.data().date || d.id),
            visits: Number(d.data().visits) || 0,
          }))
          .sort((a, b) => a.date.localeCompare(b.date));

        const nextStories: StoryViewRow[] = storiesSnap.docs.map((d) => ({
          storyId: String(d.data().storyId || d.id),
          views: Number(d.data().views) || 0,
        }));

        setDailyRows(nextDaily);
        setStoryRows(nextStories);
      } catch (err) {
        if (!active) return;
        console.error('Analytics fetch failed:', err);
        setLoadError('සංඛ්‍යාලේඛන දත්ත ලබාගැනීමේදී තාවකාලික දෝෂයක් ඇතිවිය.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void fetchAnalytics();
    return () => {
      active = false;
    };
  }, []);

  const todayStr = (() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')}`;
  })();

  const todayVisits = dailyRows.find((r) => r.date === todayStr)?.visits ?? 0;
  const totalVisits = dailyRows.reduce((sum, r) => sum + r.visits, 0);
  const totalStoryViews = storyRows.reduce((sum, r) => sum + r.views, 0);
  const maxDailyVisits = Math.max(1, ...dailyRows.map((r) => r.visits));

  const rankedStories = STORIES.map((story) => {
    const found = storyRows.find((r) => r.storyId === story.id);
    return {
      story,
      views: found ? found.views : 0,
    };
  }).sort((a, b) => b.views - a.views);

  const maxStoryViews = Math.max(1, ...rankedStories.map((r) => r.views));
  const bestGameTotal = Object.values(gameBestScores).reduce((s, v) => s + (Number(v) || 0), 0);
  const completedQuizzesCount = Object.keys(quizScores).length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      {/* Top Return Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            onBackHome();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(17,25,51,0.92)] hover:bg-[#172245] text-[#E2E8F0] border border-[rgba(165,180,252,0.22)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#8CA8FF]" />
          <span>
            Home /{' '}
            <span lang="si" className="font-sinhala">
              මුල් පිටුව
            </span>
          </span>
        </button>
      </div>

      {/* Page Heading */}
      <div className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.2)] p-6 sm:p-8 shadow-[0_18px_48px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 text-xs font-medium text-[#8CA8FF] mb-1.5">
          <BarChart3 className="w-4 h-4" />
          <span>StoryGlow Community & Learner Insights</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#FFFFFF]">
          Visitor & Story Analytics
        </h1>
        <p className="mt-1.5 text-sm font-sinhala text-[#CBD5E1]">
          දිනකට පැමිණෙන පාඨකයින් සංඛ්‍යාව, වැඩියෙන්ම කියවන කතා සහ ඔබේ ඉගෙනුම් ප්‍රගතිය මෙහි දැක්වේ.
        </p>

        {/* Top Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
          <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)]">
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
              <Users className="w-3.5 h-3.5 text-[#8CA8FF]" />
              <span>Today&apos;s Visitors</span>
            </div>
            <p className="text-2xl font-bold text-[#FFFFFF] tabular-nums">
              {loading ? '—' : todayVisits}
            </p>
            <p className="text-[11px] font-sinhala text-[#94A3B8] mt-0.5">අද දින පැමිණීම්</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)]">
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#6EE7B7]" />
              <span>14-Day Total Visits</span>
            </div>
            <p className="text-2xl font-bold text-[#6EE7B7] tabular-nums">
              {loading ? '—' : totalVisits}
            </p>
            <p className="text-[11px] font-sinhala text-[#94A3B8] mt-0.5">සමස්ත පැමිණීම්</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)]">
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
              <BookOpen className="w-3.5 h-3.5 text-[#9CB8FF]" />
              <span>Total Story Reads</span>
            </div>
            <p className="text-2xl font-bold text-[#9CB8FF] tabular-nums">
              {loading ? '—' : totalStoryViews}
            </p>
            <p className="text-[11px] font-sinhala text-[#94A3B8] mt-0.5">මුළු කතා කියවීම්</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.16)]">
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
              <Flame className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>Your Daily Streak</span>
            </div>
            <p className="text-2xl font-bold text-[#FCD34D] tabular-nums">
              {streakCount} {streakCount === 1 ? 'Day' : 'Days'}
            </p>
            <p className="text-[11px] font-sinhala text-[#94A3B8] mt-0.5">ඔබේ දිනපතා පුහුණුව</p>
          </div>
        </div>
      </div>

      {loadError && (
        <div className="p-4 rounded-2xl bg-[rgba(76,5,25,0.55)] border border-[rgba(251,113,133,0.45)] text-xs text-[#FFE4E6] font-sinhala">
          {loadError}
        </div>
      )}

      {/* Charts & Leaderboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Visitors Bar Chart */}
        <section className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
                Daily Visitors (Last 14 Days)
              </h2>
              <p className="text-xs font-sinhala text-[#94A3B8]">
                දෛනික පාඨක පැමිණීම් ප්‍රස්ථාරය
              </p>
            </div>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-xs text-[#94A3B8]">
              Loading visitor chart...
            </div>
          ) : dailyRows.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-xs text-[#94A3B8] font-sinhala">
              තවමත් දෛනික දත්ත සටහන් වී නැත.
            </div>
          ) : (
            <div className="h-52 flex items-end gap-2 pt-6 pb-2 border-b border-[rgba(165,180,252,0.14)]">
              {dailyRows.map((row) => {
                const heightPct = Math.max(10, Math.round((row.visits / maxDailyVisits) * 100));
                const shortDate = row.date.slice(5);
                return (
                  <div
                    key={row.date}
                    className="flex-1 flex flex-col items-center justify-end h-full min-w-[18px]"
                  >
                    <span className="text-[10px] font-mono text-[#9CB8FF] mb-1 tabular-nums">
                      {row.visits}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[28px] rounded-t-lg bg-[#5B6CFF] border border-[rgba(165,180,252,0.3)] transition-all"
                      title={`${row.date}: ${row.visits} visits`}
                    />
                    <span className="text-[10px] font-mono text-[#94A3B8] mt-2 truncate max-w-full">
                      {shortDate}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-6">
          <div className="mb-5">
            <h2 className="text-base font-serif font-bold text-[#FFFFFF]">
              Most Popular Stories ·{' '}
              <span lang="si" className="font-sinhala">
                වැඩියෙන්ම කියවූ කතා
              </span>
            </h2>
            <p lang="si" className="text-xs font-sinhala text-[#94A3B8]">
              කතාවක් මත ක්ලික් කර කෙලින්ම කියවිය හැක
            </p>
          </div>

          {rankedStories.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-center text-xs text-[#94A3B8]">
              <p lang="si" className="font-sinhala font-semibold text-[#CBD5E1]">
                කතා ඉක්මනින් එනවා · Stories coming soon
              </p>
              <p className="mt-1">Popular reading statistics will appear here as stories are added.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rankedStories.map(({ story, views }, idx) => {
                const widthPct = views > 0 ? Math.max(6, Math.round((views / maxStoryViews) * 100)) : 0;
                return (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playPageFlip();
                      onSelectStory(story.id);
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-[#131C38] hover:bg-[#18244A] border border-[rgba(165,180,252,0.14)] hover:border-[rgba(108,123,255,0.55)] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-mono font-bold text-[#8CA8FF] w-5 shrink-0">
                          0{idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-[#FFFFFF] group-hover:text-[#9CB8FF] truncate">
                          {story.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono text-[#CBD5E1] tabular-nums">
                        <span>{views} reads</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8CA8FF]" />
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#0B1124] overflow-hidden">
                      <div
                        style={{ width: `${widthPct}%` }}
                        className="h-full rounded-full bg-[#6366F1]"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Personal Progress Summary */}
      <section className="bg-[rgba(15,23,46,0.92)] rounded-3xl border border-[rgba(165,180,252,0.18)] p-6">
        <h2 className="text-base font-serif font-bold text-[#FFFFFF] mb-4">
          Your Personal Learning Progress · ඔබේ ඉගෙනුම් ප්‍රගතිය
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.14)] flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#6EE7B7] shrink-0" />
            <div>
              <p className="text-base font-bold text-[#FFFFFF] tabular-nums">
                {completedStoryIds.length} / {STORIES.length} Stories
              </p>
              <p className="text-[#94A3B8] font-sinhala">
                Quizzes completed: {completedQuizzesCount}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.14)] flex items-center gap-3">
            <Star className="w-5 h-5 text-[#FBBF24] shrink-0" />
            <div>
              <p className="text-base font-bold text-[#FFFFFF] tabular-nums">
                {savedWords.length} Words Saved
              </p>
              <p className="text-[#94A3B8] font-sinhala">
                Mastered: {savedWords.filter((w) => w.mastered).length} words
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#131C38] border border-[rgba(165,180,252,0.14)] flex items-center gap-3">
            <Trophy className="w-5 h-5 text-[#8CA8FF] shrink-0" />
            <div>
              <p className="text-base font-bold text-[#FFFFFF] tabular-nums">
                {bestGameTotal} Game Points
              </p>
              <p className="text-[#94A3B8] font-sinhala">
                Combined best scores across 5 games
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
