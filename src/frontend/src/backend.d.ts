import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface AdSettings {
    betweenCardsAdEnabled: boolean;
    headerAdEnabled: boolean;
    sidebarAdEnabled: boolean;
}
export interface Announcement {
    id: AnnouncementId;
    active: boolean;
    createdAt: Timestamp;
    text: string;
}
export type ToolId = string;
export type GuestId = string;
export interface VisitorStats {
    totalVisitors: bigint;
}
export interface ToolStats {
    usageCount: bigint;
    toolId: ToolId;
}
export interface Tool {
    id: ToolId;
    name: string;
    usageCount: bigint;
    description: string;
    enabled: boolean;
}
export interface ToolSummary {
    perTool: Array<ToolStats>;
    toolId: ToolId;
    totalUsage: bigint;
}
export type AnnouncementId = bigint;
export interface backendInterface {
    adminChangePassword(currentPassword: string, newPassword: string): Promise<boolean>;
    adminCreateAnnouncement(text: string): Promise<Announcement>;
    adminDeleteAnnouncement(id: bigint): Promise<boolean>;
    adminGetAllTools(): Promise<Array<Tool>>;
    adminGetUsageStats(): Promise<ToolSummary>;
    adminGetVisitorStats(): Promise<VisitorStats>;
    adminListAnnouncements(): Promise<Array<Announcement>>;
    adminLogin(email: string, password: string): Promise<boolean>;
    adminSetBetweenCardsAd(enabled: boolean): Promise<void>;
    adminSetHeaderAd(enabled: boolean): Promise<void>;
    adminSetSidebarAd(enabled: boolean): Promise<void>;
    adminSetToolEnabled(toolId: ToolId, enabled: boolean): Promise<boolean>;
    adminUpdateAnnouncement(id: bigint, text: string, active: boolean): Promise<boolean>;
    getActiveAnnouncements(): Promise<Array<Announcement>>;
    getAdSettings(): Promise<AdSettings>;
    getEnabledTools(): Promise<Array<Tool>>;
    recordToolUsage(toolId: ToolId): Promise<void>;
    trackAuthenticatedVisitor(): Promise<void>;
    trackGuestVisitor(guestId: GuestId): Promise<void>;
}
