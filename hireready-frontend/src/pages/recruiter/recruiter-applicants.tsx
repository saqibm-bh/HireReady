import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { SkillBadge } from '@/components/skill-badge';
import { recruiterJobPostings, jobApplicants } from '@/lib/mock-data';
import { Filter, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecruiterApplicants() {
  const [selectedJob, setSelectedJob] = useState(recruiterJobPostings[0].id);
  const [minMatchScore, setMinMatchScore] = useState([0]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredApplicants = jobApplicants
    .filter((app) => app.jobId === selectedJob && app.matchScore >= minMatchScore[0])
    .sort((a, b) => sortOrder === 'desc' ? b.matchScore - a.matchScore : a.matchScore - b.matchScore);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Applicants</h1>
        <p className="mt-1 text-[#6B7280]">
          Review and manage candidates for your job postings
        </p>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            {/* Job Selector */}
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-[#1C1C1E]">Job Posting</label>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="border-[#E5E5E5] bg-white">
                  <SelectValue placeholder="Select a job posting" />
                </SelectTrigger>
                <SelectContent>
                  {recruiterJobPostings.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} ({job.applicantCount} applicants)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Match Score Filter */}
            <div className="w-full space-y-2 lg:w-64">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#1C1C1E]">
                  Min Match Score
                </label>
                <span className="text-sm text-[#6B7280]">{minMatchScore[0]}%</span>
              </div>
              <Slider
                value={minMatchScore}
                onValueChange={setMinMatchScore}
                max={100}
                step={5}
                className="py-2"
              />
            </div>

            {/* Sort Button */}
            <Button
              variant="outline"
              className="shrink-0 border-[#E5E5E5]"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort: {sortOrder === 'desc' ? 'Highest' : 'Lowest'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applicants Table */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#1C1C1E]">
            <Filter className="h-5 w-5 text-[#6B7280]" />
            {filteredApplicants.length} Applicants
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredApplicants.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[#6B7280]">No applicants match your criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E5E5]">
                    <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Name</th>
                    <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Match Score</th>
                    <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Skills Match</th>
                    <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Missing Skills</th>
                    <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Applied</th>
                    <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.map((applicant) => (
                    <tr key={applicant.id} className="border-b border-[#E5E5E5] last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6]">
                            <span className="text-xs font-medium text-[#6B7280]">
                              {applicant.seekerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-[#1C1C1E]">
                            {applicant.seekerName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={cn(
                          "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                          applicant.matchScore >= 70 ? "bg-[#2D2D2D] text-white" :
                          applicant.matchScore >= 50 ? "bg-[#9CA3AF] text-white" :
                          "bg-[#E5E5E5] text-[#6B7280]"
                        )}>
                          {applicant.matchScore}%
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-1">
                          {applicant.skillsMatch.slice(0, 3).map((skill) => (
                            <SkillBadge key={skill} skill={skill} variant="filled" size="sm" />
                          ))}
                          {applicant.skillsMatch.length > 3 && (
                            <span className="text-xs text-[#6B7280]">
                              +{applicant.skillsMatch.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-1">
                          {applicant.missingSkills.slice(0, 2).map((skill) => (
                            <SkillBadge key={skill} skill={skill} variant="outlined" size="sm" />
                          ))}
                          {applicant.missingSkills.length > 2 && (
                            <span className="text-xs text-[#6B7280]">
                              +{applicant.missingSkills.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-sm text-[#6B7280]">{applicant.applyDate}</td>
                      <td className="py-4">
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                          applicant.status === 'shortlisted' ? "bg-[#2D2D2D] text-white" :
                          applicant.status === 'reviewed' ? "bg-[#9CA3AF] text-white" :
                          applicant.status === 'rejected' ? "bg-[#E5E5E5] text-[#6B7280]" :
                          "bg-[#F3F4F6] text-[#6B7280]"
                        )}>
                          {applicant.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
