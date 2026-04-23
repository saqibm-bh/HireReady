import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { recruiterJobPostings } from '@/lib/mock-data';
import { Briefcase, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminPostings() {
  return (
    <div className="space-y-6 liquid-stagger">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Job Postings</h1>
        <p className="mt-1 text-muted-foreground">
          View and manage all job postings on the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted/50 p-2">
                <Briefcase className="h-5 w-5 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground font-heading">156</p>
                <p className="text-sm text-muted-foreground">Total Postings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted/50 p-2">
                <Eye className="h-5 w-5 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground font-heading">142</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted/50 p-2">
                <Trash2 className="h-5 w-5 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground font-heading">14</p>
                <p className="text-sm text-muted-foreground">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Postings Table */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground font-heading">
            All Job Postings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Position</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Company</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Posted</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Applicants</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiterJobPostings.map((job) => (
                  <tr key={job.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-foreground">{job.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {job.experienceLevel} • {job.jobType}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-foreground">{job.companyName}</td>
                    <td className="py-4 text-sm text-muted-foreground">{job.postedDate}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-sm font-medium text-foreground">
                        {job.applicantCount}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        "bg-sienna/20 text-sienna border border-sienna/30"
                      )}>
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border text-muted-foreground hover:text-red-500 hover:border-red-500 cursor-pointer"
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
