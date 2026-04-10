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
export interface GpaSubjectInput {
    marks: bigint;
    credits: bigint;
    subjectName: string;
}
export interface GpaCalculation {
    id: bigint;
    subjects: Array<GpaSubject>;
    userId: StudentId;
    timestamp: Timestamp;
    calculatedGpa: number;
    totalCredits: bigint;
}
export interface GpaSubject {
    marks: bigint;
    credits: bigint;
    subjectName: string;
    gradePoints: number;
    letterGrade: string;
}
export type ToolId = string;
export type HashedPassword = string;
export interface VisitorStats {
    totalVisitors: bigint;
}
export type StudentId = string;
export interface ToolStats {
    usageCount: bigint;
    toolId: ToolId;
}
export interface ToolSummary {
    perTool: Array<ToolStats>;
    toolId: ToolId;
    totalUsage: bigint;
}
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
export type AnnouncementId = bigint;
export type GuestId = string;
export interface Tool {
    id: ToolId;
    name: string;
    usageCount: bigint;
    description: string;
    enabled: boolean;
}
export interface StudentRecord {
    id: StudentId;
    createdAt: Timestamp;
    email: string;
    hashedPassword: HashedPassword;
}
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
    getUserGpaHistory(userId: string): Promise<Array<GpaCalculation>>;
    loginStudent(email: string, password: string): Promise<{
        ok?: StudentRecord;
        err?: string;
    }>;
    recordToolUsage(toolId: ToolId): Promise<void>;
    registerStudent(email: string, password: string): Promise<{
        ok?: StudentRecord;
        err?: string;
    }>;
    saveGpaCalculation(userId: string, subjects: Array<GpaSubjectInput>, calculatedGpa: number, totalCredits: bigint): Promise<GpaCalculation>;
    trackAuthenticatedVisitor(): Promise<void>;
    trackGuestVisitor(guestId: GuestId): Promise<void>;
}
