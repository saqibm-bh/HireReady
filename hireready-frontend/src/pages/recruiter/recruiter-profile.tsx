import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { currentRecruiter, recruiterJobPostings, recruiterStats } from '@/lib/mock-data';
import { Building2, Mail, Calendar, Briefcase, Users, TrendingUp } from 'lucide-react';

export function RecruiterProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Profile</h1>
        <p className="mt-1 text-[#6B7280]">
          Manage your recruiter profile and company information
        </p>
      </div>

      {/* Company Profile */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Company Logo Placeholder */}
            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-[#F3F4F6]">
              <Building2 className="h-12 w-12 text-[#6B7280]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#1C1C1E]">
                {currentRecruiter.companyName}
              </h2>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-center gap-2 text-[#6B7280] md:justify-start">
                  <span className="text-sm font-medium">Recruiter:</span>
                  <span className="text-sm">{currentRecruiter.name}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#6B7280] md:justify-start">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{currentRecruiter.workEmail}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#6B7280] md:justify-start">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Member since {currentRecruiter.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="rounded-full bg-[#2D2D2D] px-4 py-2 text-sm font-medium text-white">
              {currentRecruiter.approvalStatus}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-[#F3F4F6] p-3">
                <Briefcase className="h-6 w-6 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">
                  {recruiterStats.totalPostings}
                </p>
                <p className="text-sm text-[#6B7280]">Active Job Postings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-[#F3F4F6] p-3">
                <Users className="h-6 w-6 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">
                  {recruiterStats.totalApplicants}
                </p>
                <p className="text-sm text-[#6B7280]">Total Applicants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-[#F3F4F6] p-3">
                <TrendingUp className="h-6 w-6 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">
                  {recruiterStats.avgMatchScore}%
                </p>
                <p className="text-sm text-[#6B7280]">Avg Match Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Job Postings Summary */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
            Active Job Postings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recruiterJobPostings.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-lg border border-[#E5E5E5] bg-white p-4"
              >
                <div>
                  <p className="font-medium text-[#1C1C1E]">{job.title}</p>
                  <p className="text-sm text-[#6B7280] capitalize">
                    {job.experienceLevel} • {job.jobType}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#1C1C1E]">
                    {job.applicantCount} applicants
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    {job.avgMatchScore}% avg match
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
