import { useState, useCallback, useEffect } from 'react';
import { gapAnalysisService } from '@/services/gap-analysis-service';
import { GapAnalysisResponse } from '@/lib/types/gap-analysis';

export function useGapAnalysis() {
  const [data, setData] = useState<GapAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await gapAnalysisService.getAnalysis();
      setData(result);
    } catch (err: any) {
      console.error('Failed to fetch gap analysis:', err);
      // Don't show toast for 404, just set error state so we can show an empty state UI
      setError(err.response?.data?.detail || 'Failed to load gap analysis');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchAnalysis
  };
}
