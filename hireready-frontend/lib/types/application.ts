import { JobResponse } from './job';

export interface Application {
  id: string;
  jobId: string;
  jobSeekerId: string;
  seekerName: string;
  matchScore: number;
  skillsMatch: string[];
  missingSkills: string[];
  applyDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}

export interface ApplicationResponse {
  id: string;
  resume_url: string;
  status: string;
  applied_at: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  job: JobResponse;
}
