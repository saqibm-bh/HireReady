export interface RoadmapStep {
  step: number;
  skill: string;
  why_it_matters: string;
  estimated_time: string;
  completed?: boolean;
}

export interface RoadmapResponse {
  steps: RoadmapStep[];
}
