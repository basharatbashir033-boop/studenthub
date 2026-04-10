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
  getUserGpaHistory: async () => [
    {
      id: BigInt(1),
      subjects: [
        { marks: BigInt(85), credits: BigInt(3), subjectName: "Mathematics", gradePoints: 4.0, letterGrade: "A" },
        { marks: BigInt(72), credits: BigInt(3), subjectName: "Physics", gradePoints: 3.0, letterGrade: "B" },
        { marks: BigInt(90), credits: BigInt(2), subjectName: "English", gradePoints: 4.0, letterGrade: "A" },
      ],
      userId: "student-1",
      timestamp: BigInt(Date.now() - 86400000),
      calculatedGpa: 3.63,
      totalCredits: BigInt(8),
    },
    {
      id: BigInt(2),
      subjects: [
        { marks: BigInt(78), credits: BigInt(3), subjectName: "Chemistry", gradePoints: 3.0, letterGrade: "B" },
        { marks: BigInt(95), credits: BigInt(3), subjectName: "Computer Science", gradePoints: 4.0, letterGrade: "A" },
      ],
      userId: "student-1",
      timestamp: BigInt(Date.now() - 172800000),
      calculatedGpa: 3.50,
      totalCredits: BigInt(6),
    },
  ],
  loginStudent: async (email: string) => ({
    ok: { id: `mock-${email}`, email, createdAt: BigInt(Date.now()), hashedPassword: "" },
  }),
  registerStudent: async (email: string) => ({
    ok: { id: `mock-${email}`, email, createdAt: BigInt(Date.now()), hashedPassword: "" },
  }),
  saveGpaCalculation: async (userId: string, _subjects, calculatedGpa, totalCredits) => ({
    id: BigInt(1),
    userId,
    subjects: [],
    calculatedGpa,
    totalCredits,
    timestamp: BigInt(Date.now()),
  }),
  recordToolUsage: async () => undefined,
  trackAuthenticatedVisitor: async () => undefined,
  trackGuestVisitor: async () => undefined,
};
