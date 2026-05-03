import { Skill } from './common';

export interface GapAnalysisResponse {
  targetRole: string;
  overallMatch: number;
  skillsYouHave: string[];
  skillsMissing: Skill[];
}
