import axiosInstance from '@/lib/axios';
import { JobMetadata, JobCreateRequest, JobResponse } from '@/lib/types/job';
import { ApplicationResponse } from '@/lib/types/application';

export const jobService = {
  getMetadata: async (): Promise<JobMetadata> => {
    const response = await axiosInstance.get<JobMetadata>('/jobs/meta');
    return response.data;
  },

  getAllJobs: async (): Promise<JobResponse[]> => {
    const response = await axiosInstance.get<JobResponse[]>('/jobs/');
    return response.data;
  },
  
  createJob: async (request: JobCreateRequest): Promise<JobResponse> => {
    const response = await axiosInstance.post<JobResponse>('/jobs/', request);
    return response.data;
  },
  
  getMyPostings: async (): Promise<JobResponse[]> => {
    const response = await axiosInstance.get<JobResponse[]>('/jobs/my-postings');
    return response.data;
  },

  getAppliedJobs: async (): Promise<ApplicationResponse[]> => {
    const response = await axiosInstance.get<ApplicationResponse[]>('/jobs/applied');
    return response.data;
  },

  applyToJob: async (jobId: string, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post(`/jobs/${jobId}/apply`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
