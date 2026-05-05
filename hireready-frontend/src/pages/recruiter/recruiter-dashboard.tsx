import { useEffect, useState } from 'react';
import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats-card';
import { Briefcase, TrendingUp, Clock, ArrowRight, Eye, Users, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { jobService } from '@/services/job-service';
import { JobResponse } from '@/lib/types/job';
import { format } from 'date-fns';

export function RecruiterDashboard() {
  const { navigate, userData } = useNavigation();
  const [stats, setStats] = useState({ total_postings: 0, total_applicants: 0, avg_match_score: 0 });
  const [recentPostings, setRecentPostings] = useState<JobResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userName = userData?.name || 'Recruiter';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [statsData, postingsData] = await Promise.all([
          jobService.getRecruiterStats(),
          jobService.getMyPostings()
        ]);
        setStats(statsData);
        setRecentPostings(postingsData.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4 animate-liquid">
        <Loader2 className="h-8 w-8 animate-spin text-sienna" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading dashboard insights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-liquid">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-heading">
          Welcome back, {userName.split(' ')[0]}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s a live overview of your recruitment performance
        </p>
      </div>

      {/* Stats Grid - 3 KPIs spanning full width */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Postings"
          value={stats.total_postings}
        />
        <StatsCard
          title="Total Applicants"
          value={stats.total_applicants}
        />
        <StatsCard
          title="Avg Match Score"
          value={`${stats.avg_match_score}%`}
        />
      </div>

      {/* Recent Job Postings */}
      <Card className="border-border/50 shadow-sm bg-card overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
          <CardTitle className="text-lg font-bold text-foreground font-heading flex items-center gap-2">
            <Clock className="h-5 w-5 text-sienna" />
            Your Recent Postings
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-sienna cursor-pointer font-bold"
            onClick={() => navigate('recruiter-postings')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-6 py-4 text-left font-bold text-muted-foreground uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-left font-bold text-muted-foreground uppercase tracking-wider">Posted</th>
                  <th className="px-6 py-4 text-center font-bold text-muted-foreground uppercase tracking-wider">Applicants</th>
                  <th className="px-6 py-4 text-center font-bold text-muted-foreground uppercase tracking-wider">Avg Match</th>
                  <th className="px-6 py-4 text-center font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentPostings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground italic">
                      No recent job postings found.
                    </td>
                  </tr>
                ) : (
                  recentPostings.map((job) => (
                    <tr key={job.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-foreground group-hover:text-sienna transition-colors">{job.title}</p>
                          <p className="text-xs text-muted-foreground capitalize">{job.employment_type} • {job.work_location}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">
                        {format(new Date(job.created_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-sienna/10 px-2.5 py-0.5 text-xs font-bold text-sienna">
                          {job.applicant_count}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-black shadow-sm",
                          job.avg_match_score >= 70 ? "bg-sienna text-warm-white" :
                            job.avg_match_score >= 50 ? "bg-slate text-warm-white" :
                              "bg-muted text-muted-foreground border border-border"
                        )}>
                          {job.avg_match_score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border text-foreground hover:bg-sienna hover:text-warm-white hover:border-sienna cursor-pointer transition-all font-bold"
                          onClick={() => navigate('recruiter-applicants')}
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          Applicants
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
