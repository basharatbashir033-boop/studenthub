export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: "calculator" | "pdf" | "utility";
  enabled: boolean;
  usageCount?: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  active: boolean;
  createdAt: number;
}

export interface AdSettings {
  headerAdCode: string;
  sidebarAdCode: string;
  betweenCardsAdCode: string;
  headerAdEnabled: boolean;
  sidebarAdEnabled: boolean;
  betweenCardsAdEnabled: boolean;
}

export interface VisitorStats {
  totalVisitors: number;
  guestVisitors: number;
  authenticatedVisitors: number;
  dailyVisits: number;
}

export interface UsageStat {
  toolId: string;
  toolName: string;
  usageCount: number;
}

export type AdSlot = "header" | "sidebar" | "between-cards";

export type Theme = "light" | "dark" | "system";
