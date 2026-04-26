export interface Skill {
  name: string;
  importance: number;
}

export interface GapAnalysisResponse {
  targetRole: string;
  overallMatch: number;
  skillsYouHave: string[];
  skillsMissing: Skill[];
}
