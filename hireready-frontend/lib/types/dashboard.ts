export interface MissingSkillDashboard {
  name: string;
  importance: number;
}

export interface RecentApplicationDashboard {
  id: string;
  job_title: string;
  match_score: number;
  status: string;
  applied_at: string;
}

export interface DashboardResponse {
  match_score: number;
  target_role?: string;
  completed_steps: number;
  total_steps: number;
  top_missing_skills: MissingSkillDashboard[];
  recent_applications_count: number;
  recent_applications: RecentApplicationDashboard[];
}
