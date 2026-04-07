import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { recruiterJobPostings } from '@/lib/mock-data';
import { Briefcase, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminPostings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Job Postings</h1>
        <p className="mt-1 text-[#6B7280]">
          View and manage all job postings on the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F3F4F6] p-2">
                <Briefcase className="h-5 w-5 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">156</p>
                <p className="text-sm text-[#6B7280]">Total Postings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F3F4F6] p-2">
                <Eye className="h-5 w-5 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">142</p>
                <p className="text-sm text-[#6B7280]">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F3F4F6] p-2">
                <Trash2 className="h-5 w-5 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">14</p>
                <p className="text-sm text-[#6B7280]">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Postings Table */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
            All Job Postings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E5E5]">
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Position</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Company</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Posted</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Applicants</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiterJobPostings.map((job) => (
                  <tr key={job.id} className="border-b border-[#E5E5E5] last:border-0">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-[#1C1C1E]">{job.title}</p>
                        <p className="text-sm text-[#6B7280] capitalize">
                          {job.experienceLevel} • {job.jobType}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-[#1C1C1E]">{job.companyName}</td>
                    <td className="py-4 text-sm text-[#6B7280]">{job.postedDate}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center rounded-full bg-[#F3F4F6] px-2 py-0.5 text-sm font-medium text-[#1C1C1E]">
                        {job.applicantCount}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        "bg-[#2D2D2D] text-white"
                      )}>
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#E5E5E5] text-[#6B7280]"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#E5E5E5] text-[#6B7280]"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
