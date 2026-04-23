import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillBadge } from '@/components/skill-badge';
import { jobSeekerApplications } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const jobTitles: Record<string, string> = {
  'job-001': 'Senior Frontend Developer',
  'job-002': 'Full Stack Engineer',
  'job-003': 'React Developer',
};

const companies: Record<string, string> = {
  'job-001': 'TechCorp Inc.',
  'job-002': 'TechCorp Inc.',
  'job-003': 'TechCorp Inc.',
};

export function SeekerApplications() {
  return (
    <div className="space-y-6 liquid-stagger">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Applied Jobs</h1>
        <p className="mt-1 text-muted-foreground">
          Track the status of your job applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Applications</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {jobSeekerApplications.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {jobSeekerApplications.filter((a) => a.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Shortlisted</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {jobSeekerApplications.filter((a) => a.status === 'shortlisted').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Match Score</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {Math.round(
                jobSeekerApplications.reduce((acc, a) => acc + a.matchScore, 0) /
                  jobSeekerApplications.length
              )}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground font-heading">
            Your Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobSeekerApplications.map((application) => (
              <div
                key={application.id}
                className="rounded-lg border border-border bg-background p-4 hover:bg-muted/10 transition-colors"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground font-heading">
                          {jobTitles[application.jobId]}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {companies[application.jobId]}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium",
                          application.status === 'shortlisted'
                            ? "bg-sienna text-warm-white"
                            : application.status === 'reviewed'
                              ? "bg-slate text-warm-white"
                              : application.status === 'rejected'
                                ? "bg-muted text-muted-foreground"
                                : "bg-muted/50 text-muted-foreground"
                        )}
                      >
                        {application.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">
                          Skills Matched
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {application.skillsMatch.map((skill) => (
                            <SkillBadge
                              key={skill}
                              skill={skill}
                              variant="filled"
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">
                          Missing Skills
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {application.missingSkills.map((skill) => (
                            <SkillBadge
                              key={skill}
                              skill={skill}
                              variant="outlined"
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:flex-col md:items-end">
                    <div className="text-center md:text-right">
                      <p className="text-xs text-muted-foreground">Match Score</p>
                      <p
                        className={cn(
                          "text-2xl font-bold",
                          application.matchScore >= 70
                            ? "text-sienna"
                            : application.matchScore >= 50
                              ? "text-foreground"
                              : "text-muted-foreground"
                        )}
                      >
                        {application.matchScore}%
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Applied {application.applyDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
