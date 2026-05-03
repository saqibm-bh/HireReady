import axiosInstance from '@/lib/axios';
import { RoadmapResponse } from '@/lib/types/roadmap';

export const roadmapService = {
  getRoadmap: async (): Promise<RoadmapResponse> => {
    const response = await axiosInstance.get<RoadmapResponse>('/roadmap/me');
    return response.data;
  }
};
