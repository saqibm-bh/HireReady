import axiosInstance from '@/lib/axios';
import { ProfileResponse } from '@/lib/types/profile';

export const profileService = {
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await axiosInstance.get<ProfileResponse>('/profile/me');
    return response.data;
  }
};
