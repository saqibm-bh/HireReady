export interface ResumeParseResponse {
  name: string;
  email: string;
  technical_skills: string[];
}

export interface ResumeHistoryItem {
  id: string;
  filename: string | null;
  created_at: string;
  skills: string[];
}

export interface ResumeHistoryResponse {
  history: ResumeHistoryItem[];
}
