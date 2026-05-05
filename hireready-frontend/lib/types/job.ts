export interface JobMetadata {
  roles: string[];
  skills: string[];
}

export interface JobCreateRequest {
  title: string;
  description: string;
  required_skills: string[];
  experience_level: string;
  work_location: string;
  employment_type: string;
}

export interface JobResponse {
  id: string;
  recruiter_id: string;
  title: string;
  description: string;
  required_skills: string[];
  experience_level: string;
  work_location: string;
  employment_type: string;
  created_at: string;
  applicant_count: number;
  avg_match_score: number;
}

export interface JobApplicantResponse {
  id: string;
  job_id: string;
  job_title: string;
  seeker_id: string;
  seeker_name: string;
  seeker_email: string;
  resume_url: string;
  status: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  applied_at: string;
}

// Deprecated or legacy frontend-only type if still needed elsewhere
export interface JobPosting {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  experienceLevel: string;
  workLocation: string;
  employmentType: string;
  recruiterId: string;
  createdAt: string;
  applicantCount?: number;
  avgMatch?: number;
}
