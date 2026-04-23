import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats-card';
import { currentRecruiter, recruiterStats, recruiterJobPostings, jobApplicants } from '@/lib/mock-data';
import { Briefcase, Users, TrendingUp, Clock, ArrowRight, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecruiterDashboard() {
  const { navigate } = useNavigation();

  const topApplicants = jobApplicants
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  return (
    <div className="space-y-6 liquid-stagger">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {currentRecruiter.name.split(' ')[0]}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your recruitment activity at {currentRecruiter.companyName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Postings"
          value={recruiterStats.totalPostings}
        />
        <StatsCard
          title="Total Applicants"
          value={recruiterStats.totalApplicants}
        />
        <StatsCard
          title="Average Match Score"
          value={`${recruiterStats.avgMatchScore}%`}
        />
        <StatsCard
          title="Pending Reviews"
          value={recruiterStats.pendingReviews}
        />
      </div>

      {/* Recent Job Postings */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Job Postings
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={() => navigate('recruiter-postings')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Position</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Posted</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Applicants</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Avg Match</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiterJobPostings.map((job) => (
                  <tr key={job.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-foreground">{job.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">{job.jobType}</p>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{job.postedDate}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-sm font-medium text-foreground">
                        {job.applicantCount}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                        job.avgMatchScore >= 70 ? "bg-sienna text-warm-white" :
                          job.avgMatchScore >= 50 ? "bg-slate text-warm-white" :
                            "bg-muted text-muted-foreground"
                      )}>
                        {job.avgMatchScore}%
                      </span>
                    </td>
                    <td className="py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={() => navigate('recruiter-applicants')}
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Applicants */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Top Applicants
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={() => navigate('recruiter-applicants')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="flex items-center justify-between rounded-lg border border-border bg-background p-4 transition-all hover:bg-muted/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-medium text-muted-foreground">
                      {applicant.seekerName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{applicant.seekerName}</p>
                    <p className="text-sm text-muted-foreground">
                      Applied for Senior Frontend Developer
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium",
                    applicant.matchScore >= 70 ? "bg-sienna text-warm-white" :
                      applicant.matchScore >= 50 ? "bg-slate text-warm-white" :
                        "bg-muted text-muted-foreground"
                  )}>
                    {applicant.matchScore}% match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
