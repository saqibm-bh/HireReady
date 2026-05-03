import axiosInstance from '@/lib/axios';
import { RoadmapResponse } from '@/lib/types/roadmap';

export const roadmapService = {
  getRoadmap: async (): Promise<RoadmapResponse> => {
    const response = await axiosInstance.get<RoadmapResponse>('/roadmap/me');
    return response.data;
  },
  completeStep: async (stepNumber: number): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>(`/roadmap/complete-step/${stepNumber}`);
    return response.data;
  }
};
