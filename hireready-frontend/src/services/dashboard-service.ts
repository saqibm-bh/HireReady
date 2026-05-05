import axiosInstance from '@/lib/axios';
import { DashboardResponse } from '@/lib/types/dashboard';

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await axiosInstance.get<DashboardResponse>('/dashboard/me');
    return response.data;
  }
};
