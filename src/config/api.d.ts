// TypeScript declarations for api.js

export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  language: string;
  linkedin?: string;
  priorityAccess: boolean;
  experienceLevel: string;
  financialGoals: string[];
  futureFeatures: string[];
  mainConcerns: string[];
  platformUsage: string[];
  confirmationCode: {
    code: string;
    expiresAt: string;
  };
  code?: string; // Alternative field name
  status: 'pending' | 'verified' | 'rejected' | 'joined';
  emailSent: boolean;
  createdAt: string;
}

export interface WaitlistAnalytics {
  totalCount: number;
  emailSentCount: number;
  pendingCount: number;
  priorityAccessCount: number;
  lastUpdated: string | null;
  recentEntries: WaitlistEntry[];
  byExperienceLevel: Record<string, number>;
  byFinancialGoals: Record<string, number>;
  completionRate: number;
  avgPracticeFreq: number;
  topStruggle: string;
  practiceFrequency: Record<string, { count: number; percentage: number }>;
  matchFrequency: Record<string, { count: number; percentage: number }>;
  strugglesKeywords: string[];
  expectationsKeywords: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export declare function getWaitlistEntries(): Promise<ApiResponse<WaitlistEntry[]>>;
export declare function getWaitlistAnalytics(): Promise<ApiResponse<WaitlistAnalytics>>;
export declare function sendWaitlistEmail(entryId: string): Promise<ApiResponse<boolean>>;
export declare function clearWaitlist(): Promise<ApiResponse<boolean>>;
export declare function checkEmail(email: string): Promise<ApiResponse<boolean>>;
export declare function joinWaitlist(data: Record<string, unknown>): Promise<ApiResponse<WaitlistEntry>>;
