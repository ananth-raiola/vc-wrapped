export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  duration: number; // minutes
  attendees: string[];
  isRecurring: boolean;
  source: "google" | "outlook";
}

export type MeetingCategory =
  | "Deal Sourcing"
  | "Portfolio Support"
  | "Internal"
  | "Fundraising"
  | "Networking"
  | "Admin/Other";

export interface CategorizedEvent extends CalendarEvent {
  category: MeetingCategory;
  company?: string;
}

export interface DashboardStats {
  totalHours: number;
  totalMeetings: number;
  uniqueCompanies: number;
  avgMeetingsPerWeek: number;
  busiestDay: string;
  longestBackToBack: number; // hours
  categoryBreakdown: { name: MeetingCategory; hours: number; count: number }[];
  weeklyTrend: { week: string; hours: number }[];
  topCompanies: { name: string; hours: number; count: number }[];
  dayOfWeekDistribution: { day: string; hours: number }[];
  meetingDurationDistribution: { range: string; count: number }[];
  internalVsExternal: { internal: number; external: number };
}

export interface WrappedData {
  totalHours: number;
  totalMeetings: number;
  topCategory: { name: string; percentage: number };
  topCompany: { name: string; count: number };
  busiestDay: string;
  longestBackToBack: number;
  dateRange: string;
}
