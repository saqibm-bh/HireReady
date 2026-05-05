import { useState, useCallback } from 'react';
import { jobService } from '@/services/job-service';
import { JobApplicantResponse } from '@/lib/types/job';
import { toast } from 'sonner';

export function useApplicants() {
  const [applicants, setApplicants] = useState<JobApplicantResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApplicants = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await jobService.getApplicants();
      setApplicants(data);
    } catch (error: any) {
      console.error('Failed to fetch applicants:', error);
      toast.error('Failed to load applicants');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    applicants,
    isLoading,
    fetchApplicants,
  };
}
