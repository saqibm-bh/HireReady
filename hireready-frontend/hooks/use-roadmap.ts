import { useState, useCallback, useEffect } from 'react';
import { roadmapService } from '@/services/roadmap-service';
import { RoadmapResponse } from '@/lib/types/roadmap';

export function useRoadmap() {
  const [data, setData] = useState<RoadmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoadmap = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await roadmapService.getRoadmap();
      setData(result);
    } catch (err: any) {
      console.error('Failed to fetch roadmap:', err);
      setError(err.response?.data?.detail || 'Failed to load roadmap');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoadmap();
  }, [fetchRoadmap]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchRoadmap
  };
}
