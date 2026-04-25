import { useState, useCallback, useEffect } from 'react';
import { resumeService } from '@/services/resume-service';
import { ResumeHistoryItem } from '@/lib/types/resume';
import { toast } from 'sonner';

export function useResume() {
  const [history, setHistory] = useState<ResumeHistoryItem[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [historyData, skillsData] = await Promise.all([
        resumeService.getHistory(),
        resumeService.getSkills()
      ]);
      setHistory(historyData.history);
      setSkills(skillsData);
    } catch (error) {
      console.error('Failed to fetch resume data:', error);
      toast.error('Failed to load resume history');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadResume = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await resumeService.uploadAndParse(file);
      toast.success('Resume parsed successfully!');
      // Refresh skills and history after successful upload
      await refreshData();
      return result;
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast.error(error.response?.data?.detail || 'Failed to parse resume. Please try again.');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return {
    history,
    skills,
    isLoading,
    isUploading,
    refreshData,
    uploadResume
  };
}
