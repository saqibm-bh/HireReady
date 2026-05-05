import axiosInstance from '@/lib/axios';

export interface JobMetadata {
  roles: string[];
  skills: string[];
}

export interface JobCreateRequest {
  title: string;
  description: string;
  required_skills: string[];
  experience_level: string;
  work_location: string;
  employment_type: string;
}

export interface JobResponse {
  id: string;
  recruiter_id: string;
  title: string;
  description: string;
  required_skills: string[];
  experience_level: string;
  work_location: string;
  employment_type: string;
  created_at: string;
}

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
