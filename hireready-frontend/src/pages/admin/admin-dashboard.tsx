import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats-card';
import { platformStats, pendingRecruiters, recentActivity } from '@/lib/mock-data';
import { Users, UserCheck, Clock, Briefcase, ArrowRight, Check, X, Activity } from 'lucide-react';

export function AdminDashboard() {
  const { navigate, userData } = useNavigation();
  const userName = userData?.name || 'Admin';

  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {userName.split(' ')[0]}</h1>
        <p className="mt-1 text-muted-foreground">
          Platform overview and management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={platformStats.totalUsers - 3}
        />
        <StatsCard
          title="Active Job Seekers"
          value={platformStats.activeJobSeekers}
        />
        <StatsCard
          title="Pending Approvals"
          value={platformStats.pendingRecruiterApprovals}
        />
        <StatsCard
          title="Total Job Postings"
          value={platformStats.totalJobPostings}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Recruiter Approvals */}
        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              Pending Recruiter Approvals
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => navigate('admin-approvals')}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRecruiters.slice(0, 3).map((recruiter) => (
                <div
                  key={recruiter.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                >
                  <div>
                    <p className="font-medium text-foreground">{recruiter.name}</p>
                    <p className="text-sm text-muted-foreground">{recruiter.companyName}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer"
                    >
                      <Check className="mr-1 h-3 w-3" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border text-muted-foreground hover:bg-muted cursor-pointer"
                    >
                      <X className="mr-1 h-3 w-3" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Activity className="h-5 w-5 text-muted-foreground" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sienna" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
