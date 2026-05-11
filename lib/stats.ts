import {
  CategorizedEvent,
  DashboardStats,
  MeetingCategory,
  WrappedData,
} from "./types";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function computeStats(events: CategorizedEvent[]): DashboardStats {
  if (events.length === 0) {
    return {
      totalHours: 0,
      totalMeetings: 0,
      uniqueCompanies: 0,
      avgMeetingsPerWeek: 0,
      busiestDay: "N/A",
      longestBackToBack: 0,
      categoryBreakdown: [],
      weeklyTrend: [],
      topCompanies: [],
      dayOfWeekDistribution: [],
      meetingDurationDistribution: [],
      internalVsExternal: { internal: 0, external: 0 },
    };
  }

  const totalMinutes = events.reduce((sum, e) => sum + e.duration, 0);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
  const totalMeetings = events.length;

  const companies = new Set(
    events.map((e) => e.company).filter(Boolean) as string[]
  );

  const dates = events.map((e) => new Date(e.start).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  const weeks = Math.max(
    1,
    Math.ceil((maxDate.getTime() - minDate.getTime()) / (7 * 86400000))
  );

  const dayHours: Record<string, number> = {};
  DAYS.forEach((d) => (dayHours[d] = 0));
  events.forEach((e) => {
    const day = DAYS[new Date(e.start).getDay()];
    dayHours[day] += e.duration / 60;
  });
  const busiestDay = Object.entries(dayHours).sort(
    ([, a], [, b]) => b - a
  )[0][0];

  const catMap = new Map<MeetingCategory, { hours: number; count: number }>();
  events.forEach((e) => {
    const existing = catMap.get(e.category) || { hours: 0, count: 0 };
    existing.hours += e.duration / 60;
    existing.count += 1;
    catMap.set(e.category, existing);
  });
  const categoryBreakdown = Array.from(catMap.entries())
    .map(([name, data]) => ({
      name,
      hours: Math.round(data.hours * 10) / 10,
      count: data.count,
    }))
    .sort((a, b) => b.hours - a.hours);

  const weekMap = new Map<string, number>();
  events.forEach((e) => {
    const d = new Date(e.start);
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay());
    const key = weekStart.toISOString().slice(0, 10);
    weekMap.set(key, (weekMap.get(key) || 0) + e.duration / 60);
  });
  const weeklyTrend = Array.from(weekMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, hours]) => ({ week, hours: Math.round(hours * 10) / 10 }));

  const companyMap = new Map<string, { hours: number; count: number }>();
  events.forEach((e) => {
    if (!e.company) return;
    const existing = companyMap.get(e.company) || { hours: 0, count: 0 };
    existing.hours += e.duration / 60;
    existing.count += 1;
    companyMap.set(e.company, existing);
  });
  const topCompanies = Array.from(companyMap.entries())
    .map(([name, data]) => ({
      name,
      hours: Math.round(data.hours * 10) / 10,
      count: data.count,
    }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 10);

  const dayOfWeekDistribution = DAYS.map((day) => ({
    day: day.slice(0, 3),
    hours: Math.round(dayHours[day] * 10) / 10,
  }));

  const durationBuckets = [
    { range: "< 15m", min: 0, max: 15 },
    { range: "15-30m", min: 15, max: 30 },
    { range: "30-60m", min: 30, max: 60 },
    { range: "1-2h", min: 60, max: 120 },
    { range: "2h+", min: 120, max: Infinity },
  ];
  const meetingDurationDistribution = durationBuckets.map((bucket) => ({
    range: bucket.range,
    count: events.filter(
      (e) => e.duration >= bucket.min && e.duration < bucket.max
    ).length,
  }));

  const internalEvents = events.filter(
    (e) => e.category === "Internal" || e.category === "Admin/Other"
  );
  const externalEvents = events.filter(
    (e) => e.category !== "Internal" && e.category !== "Admin/Other"
  );

  const sorted = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  let longestBackToBack = 0;
  let currentStreak = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      currentStreak = sorted[i].duration;
      continue;
    }
    const prevEnd = new Date(sorted[i - 1].end).getTime();
    const currStart = new Date(sorted[i].start).getTime();
    const gap = (currStart - prevEnd) / 60000;
    if (gap <= 15) {
      currentStreak += sorted[i].duration;
    } else {
      longestBackToBack = Math.max(longestBackToBack, currentStreak);
      currentStreak = sorted[i].duration;
    }
  }
  longestBackToBack = Math.max(longestBackToBack, currentStreak);

  return {
    totalHours,
    totalMeetings,
    uniqueCompanies: companies.size,
    avgMeetingsPerWeek: Math.round((totalMeetings / weeks) * 10) / 10,
    busiestDay,
    longestBackToBack: Math.round((longestBackToBack / 60) * 10) / 10,
    categoryBreakdown,
    weeklyTrend,
    topCompanies,
    dayOfWeekDistribution,
    meetingDurationDistribution,
    internalVsExternal: {
      internal: Math.round(
        (internalEvents.reduce((s, e) => s + e.duration, 0) / 60) * 10
      ) / 10,
      external: Math.round(
        (externalEvents.reduce((s, e) => s + e.duration, 0) / 60) * 10
      ) / 10,
    },
  };
}

export function computeWrappedData(stats: DashboardStats): WrappedData {
  const topCat = stats.categoryBreakdown[0];
  const totalCatHours = stats.categoryBreakdown.reduce(
    (s, c) => s + c.hours,
    0
  );
  const topCompany = stats.topCompanies[0];

  return {
    totalHours: stats.totalHours,
    totalMeetings: stats.totalMeetings,
    topCategory: topCat
      ? {
          name: topCat.name,
          percentage: Math.round((topCat.hours / totalCatHours) * 100),
        }
      : { name: "N/A", percentage: 0 },
    topCompany: topCompany
      ? { name: topCompany.name, count: topCompany.count }
      : { name: "N/A", count: 0 },
    busiestDay: stats.busiestDay,
    longestBackToBack: stats.longestBackToBack,
    dateRange: "Last 12 months",
  };
}
