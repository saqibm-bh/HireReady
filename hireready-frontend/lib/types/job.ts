import { Skill } from './common';

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
