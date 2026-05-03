export interface RoadmapStep {
  step: number;
  skill: string;
  why_it_matters: string;
  estimated_time: string;
}

export interface RoadmapResponse {
  steps: RoadmapStep[];
}
