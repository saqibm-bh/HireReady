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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">
          Welcome back, {currentRecruiter.name.split(' ')[0]}
        </h1>
        <p className="mt-1 text-[#6B7280]">
          Here&apos;s an overview of your recruitment activity at {currentRecruiter.companyName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Postings"
          value={recruiterStats.totalPostings}
          icon={Briefcase}
        />
        <StatsCard
          title="Total Applicants"
          value={recruiterStats.totalApplicants}
          icon={Users}
        />
        <StatsCard
          title="Average Match Score"
          value={`${recruiterStats.avgMatchScore}%`}
          icon={TrendingUp}
        />
        <StatsCard
          title="Pending Reviews"
          value={recruiterStats.pendingReviews}
          icon={Clock}
        />
      </div>

      {/* Recent Job Postings */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
            Recent Job Postings
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#6B7280] hover:text-[#1C1C1E]"
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
                <tr className="border-b border-[#E5E5E5]">
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Position</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Posted</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Applicants</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Avg Match</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiterJobPostings.map((job) => (
                  <tr key={job.id} className="border-b border-[#E5E5E5] last:border-0">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-[#1C1C1E]">{job.title}</p>
                        <p className="text-sm text-[#6B7280] capitalize">{job.jobType}</p>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-[#6B7280]">{job.postedDate}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center rounded-full bg-[#F3F4F6] px-2 py-0.5 text-sm font-medium text-[#1C1C1E]">
                        {job.applicantCount}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                        job.avgMatchScore >= 70 ? "bg-[#2D2D2D] text-white" :
                        job.avgMatchScore >= 50 ? "bg-[#9CA3AF] text-white" :
                        "bg-[#E5E5E5] text-[#6B7280]"
                      )}>
                        {job.avgMatchScore}%
                      </span>
                    </td>
                    <td className="py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#6B7280] hover:text-[#1C1C1E]"
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
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
            Top Applicants
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#6B7280] hover:text-[#1C1C1E]"
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
                className="flex items-center justify-between rounded-lg border border-[#E5E5E5] bg-white p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6]">
                    <span className="text-sm font-medium text-[#6B7280]">
                      {applicant.seekerName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[#1C1C1E]">{applicant.seekerName}</p>
                    <p className="text-sm text-[#6B7280]">
                      Applied for Senior Frontend Developer
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium",
                    applicant.matchScore >= 70 ? "bg-[#2D2D2D] text-white" :
                    applicant.matchScore >= 50 ? "bg-[#9CA3AF] text-white" :
                    "bg-[#E5E5E5] text-[#6B7280]"
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
