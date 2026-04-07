import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { pendingRecruiters } from '@/lib/mock-data';
import { ShieldCheck, Check, X, Building2, Mail, Calendar } from 'lucide-react';

export function AdminApprovals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Recruiter Approvals</h1>
        <p className="mt-1 text-[#6B7280]">
          Review and approve recruiter registration requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F3F4F6] p-2">
                <ShieldCheck className="h-5 w-5 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">
                  {pendingRecruiters.length}
                </p>
                <p className="text-sm text-[#6B7280]">Pending Approvals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals List */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
            Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRecruiters.map((recruiter) => (
              <div
                key={recruiter.id}
                className="rounded-lg border border-[#E5E5E5] bg-white p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6]">
                      <Building2 className="h-6 w-6 text-[#6B7280]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1C1C1E]">{recruiter.name}</h3>
                      <p className="text-sm font-medium text-[#6B7280]">
                        {recruiter.companyName}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{recruiter.workEmail}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Requested {recruiter.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="bg-[#2D2D2D] text-white hover:bg-[#1C1C1E]"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#E5E5E5] text-[#6B7280]"
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
              <ShieldCheck className="mx-auto h-12 w-12 text-[#9CA3AF]" />
              <p className="mt-4 text-[#6B7280]">No pending approvals</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
