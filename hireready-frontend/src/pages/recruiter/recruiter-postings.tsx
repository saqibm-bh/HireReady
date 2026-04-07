import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SkillBadge } from '@/components/skill-badge';
import { recruiterJobPostings } from '@/lib/mock-data';
import { Plus, Users, TrendingUp, Calendar, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecruiterPostings() {
  const { navigate } = useNavigation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1E]">My Job Postings</h1>
          <p className="mt-1 text-[#6B7280]">
            Manage all your active job postings
          </p>
        </div>
        <Button
          className="bg-[#2D2D2D] text-white hover:bg-[#1C1C1E]"
          onClick={() => navigate('recruiter-post-job')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Job Postings Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {recruiterJobPostings.map((job) => (
          <Card key={job.id} className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
                    {job.title}
                  </CardTitle>
                  <p className="mt-1 text-sm text-[#6B7280] capitalize">
                    {job.experienceLevel} • {job.jobType}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreHorizontal className="h-4 w-4 text-[#6B7280]" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats Row */}
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#6B7280]" />
                  <span className="text-sm text-[#1C1C1E]">
                    <strong>{job.applicantCount}</strong> applicants
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#6B7280]" />
                  <span className="text-sm text-[#1C1C1E]">
                    <strong>{job.avgMatchScore}%</strong> avg match
                  </span>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <p className="mb-2 text-xs font-medium text-[#6B7280]">
                  Required Skills
                </p>
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.slice(0, 4).map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="outlined" size="sm" />
                  ))}
                  {job.requiredSkills.length > 4 && (
                    <span className="inline-flex items-center rounded-full border border-[#E5E5E5] px-2 py-0.5 text-xs text-[#6B7280]">
                      +{job.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-4">
                <div className="flex items-center gap-1 text-sm text-[#6B7280]">
                  <Calendar className="h-4 w-4" />
                  <span>Posted {job.postedDate}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#E5E5E5] text-[#1C1C1E]"
                  onClick={() => navigate('recruiter-applicants')}
                >
                  View Applicants
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
