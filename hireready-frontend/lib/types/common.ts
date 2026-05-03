export interface Skill {
  name: string;
  importance: number;
  category?: string;
}

export interface LearningResource {
  id: string;
  skill: string;
  title: string;
  provider: string;
  duration: string;
  url: string;
  type: 'course' | 'tutorial' | 'certification';
}

export interface PlatformStats {
  totalUsers: number;
  activeJobSeekers: number;
  pendingRecruiterApprovals: number;
  totalJobPostings: number;
}
