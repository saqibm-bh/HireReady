import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { pendingRecruiters } from '@/lib/mock-data';
import { ShieldCheck, Check, X, Building2, Mail, Calendar } from 'lucide-react';

export function AdminApprovals() {
  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Recruiter Approvals</h1>
        <p className="mt-1 text-muted-foreground">
          Review and approve recruiter registration requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted/50 p-2">
                <ShieldCheck className="h-5 w-5 text-sienna" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground font-heading">
                  {pendingRecruiters.length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals List */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground font-heading">
            Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRecruiters.map((recruiter) => (
              <div
                key={recruiter.id}
                className="rounded-lg border border-border bg-background p-6 hover:bg-muted/10 transition-colors"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                      <Building2 className="h-6 w-6 text-sienna" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground font-heading">{recruiter.name}</h3>
                      <p className="text-sm font-medium text-muted-foreground">
                        {recruiter.companyName}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4 text-sienna" />
                          <span>{recruiter.workEmail}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-sienna" />
                          <span>Requested {recruiter.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="border-border text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pendingRecruiters.length === 0 && (
            <div className="py-12 text-center">
              <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No pending approvals</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
