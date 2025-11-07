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
  strugglesKeywords: Record<string, number> | string[];
  expectationsKeywords: Record<string, number> | string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CheckEmailResponse {
  ok: boolean;
  exists: boolean;
  error?: string;
}

export interface WaitlistListResponse {
  entries: WaitlistEntry[];
  totalCount: number;
  lastUpdated: string;
}

export interface AnalyticsResponse {
  totalEntries: number;
  practiceFrequency: Record<string, { count: number; percentage: number }>;
  matchFrequency: Record<string, { count: number; percentage: number }>;
  commonStruggles: string[];
  commonExpectations: string[];
  strugglesKeywords: Record<string, number>;
  expectationsKeywords: Record<string, number>;
  signupTrends: Record<string, number>;
  lastUpdated: string;
}

export declare function getWaitlistEntries(): Promise<WaitlistListResponse>;
export declare function getWaitlistAnalytics(): Promise<AnalyticsResponse>;
export declare function sendWaitlistEmail(entryId: string): Promise<ApiResponse<boolean>>;
export declare function clearWaitlist(): Promise<ApiResponse<boolean>>;
export declare function checkEmail(email: string): Promise<CheckEmailResponse>;
export declare function joinWaitlist(data: Record<string, unknown>): Promise<ApiResponse<WaitlistEntry>>;
