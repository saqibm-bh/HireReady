export interface ResumeHistoryEntry {
  id: string;
  filename: string;
  created_at: string;
}

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  target_role?: string;
  skills: string[];

  match_score: number;
  skills_count: number;
  resumes_count: number;

  resume_history: ResumeHistoryEntry[];
}
