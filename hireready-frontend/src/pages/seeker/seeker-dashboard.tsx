import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatchScoreRing } from '@/components/match-score-ring';
import { SkillBadge } from '@/components/skill-badge';
import { currentJobSeeker, gapAnalysis, topMissingSkills, learningResources, jobSeekerApplications } from '@/lib/mock-data';
import { ArrowRight, BookOpen, Clock, ExternalLink } from 'lucide-react';

export function SeekerDashboard() {
  const { navigate, userData } = useNavigation();
  const userName = userData?.name || currentJobSeeker.name;

  return (
    <div className="space-y-6 animate-liquid">
      {/* Welcome Banner */}
      <Card className="glass-panel">
        <CardContent className="p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
               <h1 className="text-2xl font-bold font-heading">Welcome back, {userName.split(' ')[0]}</h1>
              <p className="mt-1 text-muted-foreground">
                Here&apos;s your progress towards becoming a <span className="text-sienna font-semibold">{currentJobSeeker.targetRole}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Overall Match</p>
                <p className="text-2xl font-bold font-heading text-sienna">{currentJobSeeker.matchScore}%</p>
              </div>
              <MatchScoreRing score={currentJobSeeker.matchScore} size="md" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Gap Summary */}
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-foreground font-heading">Your Skill Gap Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Target Role</span>
            <span className="font-semibold text-foreground">{gapAnalysis.targetRole}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
               <span className="text-sm text-muted-foreground">Match Progress</span>
               <span className="text-sm font-bold text-sienna">{gapAnalysis.overallMatch}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-sienna transition-all duration-500"
                style={{ width: `${gapAnalysis.overallMatch}%` }}
              />
            </div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Missing Skills</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {gapAnalysis.skillsMissing.slice(0, 6).map((skill) => (
                <SkillBadge key={skill.name} skill={skill.name} variant="outlined" size="sm" />
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted cursor-pointer"
            onClick={() => navigate('seeker-gap-analysis')}
          >
            View Full Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Top Missing Skills */}
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-foreground font-heading">Top Missing Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {topMissingSkills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.importance}% importance</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-slate"
                    style={{ width: `${skill.importance}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground font-medium">{skill.category}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Learning */}
      <Card className="glass-panel">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold text-foreground font-heading">Recommended Learning</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-sienna cursor-pointer"
            onClick={() => navigate('seeker-roadmap')}
          >
            View Roadmap
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
             {learningResources.slice(0, 4).map((resource) => (
              <div
                key={resource.id}
                className="flex items-start gap-4 rounded-lg border border-border bg-muted/20 p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <BookOpen className="h-5 w-5 text-sienna" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground font-heading">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground font-medium">{resource.provider}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground/70">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {resource.duration}
                    </span>
                    <span className="capitalize">{resource.type}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 hover:text-sienna cursor-pointer">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications */}
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
                 {jobSeekerApplications.map((app) => (
                  <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-3 text-sm font-medium text-foreground">
                      {app.jobId === 'job-001' ? 'Senior Frontend Developer' : 
                       app.jobId === 'job-002' ? 'Full Stack Engineer' : 'React Developer'}
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        app.matchScore >= 70 ? 'bg-sienna text-warm-white' :
                        app.matchScore >= 50 ? 'bg-slate text-warm-white' :
                        'bg-muted text-foreground'
                      }`}>
                        {app.matchScore}%
                      </span>
                    </td>
                    <td className="py-3 text-sm capitalize text-muted-foreground font-medium">{app.status}</td>
                    <td className="py-3 text-sm text-muted-foreground">{app.applyDate}</td>
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
