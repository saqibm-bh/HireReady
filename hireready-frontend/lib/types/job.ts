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
}
