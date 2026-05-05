import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigation } from '@/lib/navigation-context';
import { Mail, Briefcase, Users, TrendingUp, Loader2 } from 'lucide-react';
import { jobService } from '@/services/job-service';
import { JobResponse } from '@/lib/types/job';
import { format } from 'date-fns';

export function RecruiterProfile() {
  const { userData } = useNavigation();
  const [stats, setStats] = useState({ total_postings: 0, total_applicants: 0, avg_match_score: 0 });
  const [myPostings, setMyPostings] = useState<JobResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userName = userData?.name || 'Recruiter';
  const userEmail = userData?.email || '';

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const [statsData, postingsData] = await Promise.all([
          jobService.getRecruiterStats(),
          jobService.getMyPostings()
        ]);
        setStats(statsData);
        setMyPostings(postingsData);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4 animate-liquid">
        <Loader2 className="h-8 w-8 animate-spin text-sienna" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-heading">Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your recruiter profile and tracking information
        </p>
      </div>

      {/* Profile Info */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-black text-foreground font-heading tracking-tight">
                {userName}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full text-sm">
                  <Mail className="h-4 w-4 text-sienna" />
                  <span className="font-medium">{userEmail}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
               <div className="text-center px-6 py-3 bg-muted/20 rounded-2xl border border-border/50">
                  <p className="text-2xl font-black text-sienna">{stats.total_postings}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Postings</p>
               </div>
               <div className="text-center px-6 py-3 bg-muted/20 rounded-2xl border border-border/50">
                  <p className="text-2xl font-black text-sienna">{stats.total_applicants}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Applicants</p>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Detail Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 shadow-sm bg-card hover:border-sienna/30 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-sienna/5 p-3">
                <Briefcase className="h-6 w-6 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground font-heading">
                  {stats.total_postings}
                </p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Active Postings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card hover:border-sienna/30 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-sienna/5 p-3">
                <Users className="h-6 w-6 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground font-heading">
                  {stats.total_applicants}
                </p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Total Candidates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card hover:border-sienna/30 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-sienna/5 p-3">
                <TrendingUp className="h-6 w-6 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground font-heading">
                  {stats.avg_match_score}%
                </p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Avg Match Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Job Postings List */}
      <Card className="border-border/50 shadow-sm bg-card overflow-hidden">
        <CardHeader className="pb-4 border-b border-border/50">
          <CardTitle className="text-lg font-bold text-foreground font-heading">
            Your Active Postings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {myPostings.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground italic">
                No active job postings.
              </div>
            ) : (
              myPostings.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-6 hover:bg-muted/10 transition-colors group"
                >
                  <div>
                    <p className="font-bold text-foreground group-hover:text-sienna transition-colors">{job.title}</p>
                    <p className="text-xs text-muted-foreground capitalize font-medium">
                      {job.experience_level} Level • {job.employment_type} • {job.work_location}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center justify-end gap-2">
                       <span className="text-sm font-black text-sienna">{job.applicant_count}</span>
                       <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Applicants</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                       <span className="text-sm font-black text-sienna">{job.avg_match_score}%</span>
                       <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Avg Match</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
