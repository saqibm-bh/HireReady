import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatchScoreRing } from '@/components/match-score-ring';
import { SkillBadge } from '@/components/skill-badge';
import { useDashboard } from '@/hooks/use-dashboard';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { RecentApplicationDashboard, MissingSkillDashboard } from '@/lib/types/dashboard';

export function SeekerDashboard() {
  const { navigate, userData } = useNavigation();
  const { data, isLoading, error } = useDashboard();
  const userName = userData?.name || 'User';

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 animate-liquid">
        <Loader2 className="h-8 w-8 animate-spin text-sienna" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Building your dashboard...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{error || "Failed to load dashboard"}</p>
        <Button onClick={() => navigate('seeker-resume')} className="bg-sienna text-warm-white">
          Go to Resume Upload
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-liquid">
      {/* Welcome Banner */}
      <Card className="glass-panel">
        <CardContent className="p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold font-heading">Welcome back, {userName.split(' ')[0]}</h1>
              <p className="mt-1 text-muted-foreground">
                Here&apos;s your progress towards becoming a <span className="text-sienna font-semibold">{data.target_role || "Professional"}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Overall Match</p>
                <p className="text-2xl font-bold font-heading text-sienna">{data.match_score}%</p>
              </div>
              <MatchScoreRing score={data.match_score} size="md" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skill Gap Summary */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-foreground font-heading">Your Skill Gap Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Target Role</span>
              <span className="font-semibold text-foreground">{data.target_role}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Match Progress</span>
                <span className="text-sm font-bold text-sienna">{data.match_score}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-sienna transition-all duration-500"
                  style={{ width: `${data.match_score}%` }}
                />
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Top Missing Skills</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.top_missing_skills.slice(0, 5).map((skill: MissingSkillDashboard) => (
                  <SkillBadge key={skill.name} skill={skill.name} variant="outlined" size="sm" />
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-muted cursor-pointer mt-2"
              onClick={() => navigate('seeker-gap-analysis')}
            >
              View Full Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Roadmap Progress */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-foreground font-heading">Learning Roadmap Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completed Steps</p>
                <p className="text-3xl font-bold font-heading text-foreground">{data.completed_steps} / {data.total_steps}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sienna/10 text-sienna">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-muted-foreground uppercase tracking-wider">Completion Rate</span>
                <span className="text-sienna">{Math.round((data.completed_steps / (data.total_steps || 1)) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-sienna transition-all duration-500"
                  style={{ width: `${(data.completed_steps / (data.total_steps || 1)) * 100}%` }}
                />
              </div>
            </div>

            <Button
              className="w-full bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer shadow-lg hover:shadow-sienna/20 transition-all"
              onClick={() => navigate('seeker-roadmap')}
            >
              Continue Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Top Missing Skills Breakdown */}
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-foreground font-heading">Top Missing Skills Market Importance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {data.top_missing_skills.map((skill: MissingSkillDashboard) => (
              <div
                key={skill.name}
                className="rounded-lg border border-border bg-background/50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.importance}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-slate"
                    style={{ width: `${skill.importance}%` }}
                  />
                </div>
              </div>
            ))}
            {data.top_missing_skills.length === 0 && (
              <p className="text-sm text-muted-foreground col-span-2 text-center py-4">No missing skills found. Great job!</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications (Dynamic) */}
      <Card className="glass-panel">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold text-foreground font-heading">Recent Applications</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-sienna cursor-pointer"
            onClick={() => navigate('seeker-applications')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {data.recent_applications.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">You haven't applied to any jobs yet.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Position</th>
                    <th className="pb-3 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Match</th>
                    <th className="pb-3 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="pb-3 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">Applied</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent_applications.map((app: RecentApplicationDashboard) => (
                    <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="py-3 text-sm font-medium text-foreground">
                        {app.job_title}
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${app.match_score >= 70 ? 'bg-sienna text-warm-white' :
                            app.match_score >= 50 ? 'bg-slate text-warm-white' :
                              'bg-muted text-foreground'
                          }`}>
                          {app.match_score}%
                        </span>
                      </td>
                      <td className="py-3 text-sm capitalize text-muted-foreground font-medium">{app.status}</td>
                      <td className="py-3 text-sm text-muted-foreground">
                        {format(new Date(app.applied_at), 'yyyy-MM-dd')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
