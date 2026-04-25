import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { currentRecruiter, recruiterJobPostings, recruiterStats } from '@/lib/mock-data';
import { useNavigation } from '@/lib/navigation-context';
import { Building2, Mail, Calendar, Briefcase, Users, TrendingUp } from 'lucide-react';

export function RecruiterProfile() {
  const { userData } = useNavigation();
  const userName = userData?.name || currentRecruiter.name;
  const userEmail = userData?.email || currentRecruiter.workEmail;
  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your recruiter profile and company information
        </p>
      </div>

      {/* Company Profile */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Company Logo Placeholder */}
            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-muted/50 border border-border">
              <Building2 className="h-12 w-12 text-sienna" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground font-heading">
                {currentRecruiter.companyName}
              </h2>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
                  <span className="text-sm font-medium text-foreground">Recruiter:</span>
                  <span className="text-sm">{userName}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
                  <Mail className="h-4 w-4 text-sienna" />
                  <span className="text-sm">{userEmail}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
                  <Calendar className="h-4 w-4 text-sienna" />
                  <span className="text-sm">Member since {currentRecruiter.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-muted/50 p-3">
                <Briefcase className="h-6 w-6 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {recruiterStats.totalPostings}
                </p>
                <p className="text-sm text-muted-foreground">Active Job Postings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-muted/50 p-3">
                <Users className="h-6 w-6 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {recruiterStats.totalApplicants}
                </p>
                <p className="text-sm text-muted-foreground">Total Applicants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-muted/50 p-3">
                <TrendingUp className="h-6 w-6 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {recruiterStats.avgMatchScore}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Match Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Job Postings Summary */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground font-heading">
            Active Job Postings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recruiterJobPostings.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:bg-muted/10 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{job.title}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {job.experienceLevel} • {job.jobType}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    <span className="text-sienna">{job.applicantCount}</span> <span className="text-muted-foreground">applicants</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-sienna">{job.avgMatchScore}%</span> <span className="text-muted-foreground">avg match</span>
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
