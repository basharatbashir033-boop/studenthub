import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  adminChangePassword: async () => true,
  adminCreateAnnouncement: async (text: string) => ({
    id: BigInt(1),
    active: true,
    createdAt: BigInt(Date.now()),
    text,
  }),
  adminDeleteAnnouncement: async () => true,
  adminGetAllTools: async () => [
    { id: "gpa-calculator", name: "GPA Calculator", usageCount: BigInt(1243), description: "Calculate your GPA with ease", enabled: true },
    { id: "percentage-calculator", name: "Percentage Calculator", usageCount: BigInt(987), description: "Quick percentage calculations", enabled: true },
    { id: "merge-pdf", name: "Merge PDF", usageCount: BigInt(654), description: "Merge multiple PDF files into one", enabled: true },
    { id: "image-to-pdf", name: "Image to PDF", usageCount: BigInt(432), description: "Convert images to PDF format", enabled: true },
    { id: "pdf-to-image", name: "PDF to Image", usageCount: BigInt(321), description: "Extract images from PDF files", enabled: false },
  ],
  adminGetUsageStats: async () => ({
    perTool: [
      { toolId: "gpa-calculator", usageCount: BigInt(1243) },
      { toolId: "percentage-calculator", usageCount: BigInt(987) },
      { toolId: "merge-pdf", usageCount: BigInt(654) },
      { toolId: "image-to-pdf", usageCount: BigInt(432) },
      { toolId: "pdf-to-image", usageCount: BigInt(321) },
    ],
    toolId: "all",
    totalUsage: BigInt(3637),
  }),
  adminGetVisitorStats: async () => ({
    totalVisitors: BigInt(5280),
  }),
  adminListAnnouncements: async () => [
    { id: BigInt(1), active: true, createdAt: BigInt(Date.now()), text: "Welcome to StudentHub! New tools coming soon." },
    { id: BigInt(2), active: false, createdAt: BigInt(Date.now() - 86400000), text: "Scheduled maintenance on Sunday 2am UTC." },
  ],
  adminLogin: async () => true,
  adminSetBetweenCardsAd: async () => undefined,
  adminSetHeaderAd: async () => undefined,
  adminSetSidebarAd: async () => undefined,
  adminSetToolEnabled: async () => true,
  adminUpdateAnnouncement: async () => true,
  getActiveAnnouncements: async () => [
    { id: BigInt(1), active: true, createdAt: BigInt(Date.now()), text: "Welcome to StudentHub! New tools coming soon." },
  ],
  getAdSettings: async () => ({
    betweenCardsAdEnabled: true,
    headerAdEnabled: true,
    sidebarAdEnabled: true,
  }),
  getEnabledTools: async () => [
    { id: "gpa-calculator", name: "GPA Calculator", usageCount: BigInt(1243), description: "Calculate your GPA with ease", enabled: true },
    { id: "percentage-calculator", name: "Percentage Calculator", usageCount: BigInt(987), description: "Quick percentage calculations", enabled: true },
    { id: "merge-pdf", name: "Merge PDF", usageCount: BigInt(654), description: "Merge multiple PDF files into one", enabled: true },
    { id: "image-to-pdf", name: "Image to PDF", usageCount: BigInt(432), description: "Convert images to PDF format", enabled: true },
    { id: "pdf-to-image", name: "PDF to Image", usageCount: BigInt(321), description: "Extract images from PDF files", enabled: true },
  ],
  recordToolUsage: async () => undefined,
  trackAuthenticatedVisitor: async () => undefined,
  trackGuestVisitor: async () => undefined,
};
