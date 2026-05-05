import { useState, useEffect, useCallback } from 'react';
import { jobService, JobMetadata, JobResponse, JobCreateRequest } from '@/services/job-service';
import { toast } from 'sonner';

export function useJobs() {
  const [metadata, setMetadata] = useState<JobMetadata | null>(null);
  const [postings, setPostings] = useState<JobResponse[]>([]);
  const [allJobs, setAllJobs] = useState<JobResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const fetchMetadata = useCallback(async () => {
    try {
      const data = await jobService.getMetadata();
      setMetadata(data);
    } catch (err) {
      console.error('Failed to fetch job metadata:', err);
    }
  }, []);

  const fetchMyPostings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await jobService.getMyPostings();
      setPostings(data);
    } catch (err) {
      console.error('Failed to fetch postings:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAllJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await jobService.getAllJobs();
      setAllJobs(data);
    } catch (err) {
      console.error('Failed to fetch all jobs:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createJob = async (request: JobCreateRequest) => {
    setIsCreating(true);
    try {
      const newJob = await jobService.createJob(request);
      setPostings(prev => [newJob, ...prev]);
      toast.success('Job posted successfully!', {
        description: `${request.title} is now live.`
      });
      return newJob;
    } catch (err: any) {
      toast.error('Failed to post job', {
        description: err.response?.data?.detail || 'Please try again later.'
      });
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const applyToJob = async (jobId: string, file: File) => {
    setIsApplying(true);
    try {
      await jobService.applyToJob(jobId, file);
      toast.success('Application submitted!', {
        description: 'Your resume has been uploaded successfully.'
      });
    } catch (err: any) {
      toast.error('Application failed', {
        description: err.response?.data?.detail || 'Failed to upload resume. Please try again.'
      });
      throw err;
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  return {
    metadata,
    postings,
    allJobs,
    isLoading,
    isCreating,
    isApplying,
    fetchMyPostings,
    fetchAllJobs,
    createJob,
    applyToJob
  };
}
