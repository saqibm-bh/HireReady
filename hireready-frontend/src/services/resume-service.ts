import axiosInstance from '@/lib/axios';
import { ResumeParseResponse, ResumeHistoryResponse } from '@/lib/types/resume';

export const resumeService = {
  uploadAndParse: async (file: File): Promise<ResumeParseResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post<ResumeParseResponse>('/resume/parse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getHistory: async (): Promise<ResumeHistoryResponse> => {
    const response = await axiosInstance.get<ResumeHistoryResponse>('/resume/history');
    return response.data;
  },

  getSkills: async (): Promise<string[]> => {
    const response = await axiosInstance.get<string[]>('/resume/skills');
    return response.data;
  }
};
