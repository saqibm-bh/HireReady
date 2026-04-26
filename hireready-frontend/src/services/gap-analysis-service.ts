import axiosInstance from '@/lib/axios';
import { GapAnalysisResponse } from '@/lib/types/gap-analysis';

export const gapAnalysisService = {
  getAnalysis: async (): Promise<GapAnalysisResponse> => {
    const response = await axiosInstance.get<GapAnalysisResponse>('/gap-analysis/me');
    return response.data;
  }
};
