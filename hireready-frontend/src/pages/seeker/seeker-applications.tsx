import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillBadge } from '@/components/skill-badge';
import { useJobs } from '@/hooks/use-jobs';
import { ApplicationDetailDialog } from '@/components/seeker/application-detail-dialog';
import { cn } from '@/lib/utils';
import { Loader2, SearchX } from 'lucide-react';
import { format } from 'date-fns';
import { ApplicationResponse } from '@/services/job-service';

export function SeekerApplications() {
  const { appliedJobs, isLoading, fetchAppliedJobs } = useJobs();
  const [selectedApplication, setSelectedApplication] = useState<ApplicationResponse | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchAppliedJobs();
  }, [fetchAppliedJobs]);

  const handleOpenDetail = (app: ApplicationResponse) => {
    setSelectedApplication(app);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Applied Jobs</h1>
        <p className="mt-1 text-muted-foreground">
          Track the status of your job applications
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-sienna" />
        </div>
      ) : appliedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 bg-card rounded-2xl border border-dashed border-border p-12 animate-liquid">
          <div className="p-4 rounded-full bg-muted/30">
            <SearchX className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground font-heading">No Applications Yet</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">
              You haven't applied to any jobs yet. Start exploring opportunities in the "Find Jobs" tab!
            </p>
          </div>
        </div>
      ) : (
        <Card className="border-border/50 shadow-sm bg-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground font-heading">
              Your Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appliedJobs.map((application) => (
                <div
                  key={application.id}
                  onClick={() => handleOpenDetail(application)}
                  className="rounded-lg border border-border bg-background p-5 hover:border-sienna/30 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-foreground font-heading group-hover:text-sienna transition-colors">
                            {application.job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {application.job.work_location} • {application.job.employment_type}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Skills Matched
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {/* Skills matching logic will be added later, using job skills for now as placeholders */}
                            {application.job.required_skills.slice(0, 3).map((skill) => (
                              <SkillBadge
                                key={skill}
                                skill={skill}
                                variant="filled"
                                size="sm"
                              />
                            ))}
                            {application.job.required_skills.length > 3 && (
                              <span className="text-[10px] text-muted-foreground">+{application.job.required_skills.length - 3}</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Missing Skills
                          </p>
                          <div className="flex flex-wrap gap-1">
                            <span className="text-[10px] italic text-muted-foreground">Analysis pending</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 md:flex-col md:items-end md:justify-between h-full">
                      <div className="text-center md:text-right">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Match Score</p>
                        <p className="text-2xl font-bold text-muted-foreground">0.0%</p>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                        Applied {format(new Date(application.applied_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <ApplicationDetailDialog
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        application={selectedApplication}
      />
    </div>
  );
}
