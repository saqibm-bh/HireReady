import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatchScoreRing } from '@/components/match-score-ring';
import { SkillBadge } from '@/components/skill-badge';
import { useGapAnalysis } from '@/hooks/use-gap-analysis';
import { ArrowRight, TrendingUp } from 'lucide-react';

export function SeekerGapAnalysis() {
  const { navigate } = useNavigation();
  const { data: gapAnalysis, isLoading, error } = useGapAnalysis();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sienna border-t-transparent" />
          <p className="text-muted-foreground animate-pulse">Retrieving your analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !gapAnalysis) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <h2 className="text-xl font-semibold text-foreground">No Analysis Available</h2>
        <p className="text-muted-foreground text-center max-w-md">
          {error || "We need your resume to perform a gap analysis. Please upload your resume first."}
        </p>
        <Button onClick={() => navigate('seeker-resume')} className="bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer">
          Go to Resume Upload
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gap Analysis Results</h1>
        <p className="mt-1 text-muted-foreground">
          See how your skills match up against the requirements for {gapAnalysis.targetRole}
        </p>
      </div>

      {/* Target Role Header */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Target Role</p>
              <h2 className="mt-1 text-2xl font-bold text-foreground font-heading">{gapAnalysis.targetRole}</h2>
              <p className="mt-2 text-muted-foreground">
                Based on {gapAnalysis.skillsYouHave.length + gapAnalysis.skillsMissing.length} required skills
              </p>
            </div>
            <div className="flex flex-col items-center">
              <MatchScoreRing score={gapAnalysis.overallMatch} size="lg" />
              <p className="mt-2 text-sm text-muted-foreground">Overall Match Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Comparison */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skills You Have */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sienna text-[10px] text-warm-white font-bold">
                {gapAnalysis.skillsYouHave.length}
              </span>
              Skills You Have
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {gapAnalysis.skillsYouHave.map((skill) => (
                <SkillBadge key={skill} skill={skill} variant="filled" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills You're Missing */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-muted-foreground text-[10px] text-muted-foreground font-bold">
                {gapAnalysis.skillsMissing.length}
              </span>
              Skills You&apos;re Missing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {gapAnalysis.skillsMissing.map((skill) => (
                <SkillBadge key={skill.name} skill={skill.name} variant="outlined" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Missing Skills by Importance */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <TrendingUp className="h-5 w-5 text-sienna" />
            Missing Skills Ranked by Market Importance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gapAnalysis.skillsMissing.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="font-medium text-foreground">{skill.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{skill.importance}% importance</span>
                </div>
                <div className="ml-9 h-2 w-full overflow-hidden rounded-full bg-muted/20">
                  <div
                    className="h-full rounded-full bg-sienna transition-all duration-500"
                    style={{ width: `${skill.importance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="border border-sienna/20 bg-cloud dark:bg-graphite text-graphite dark:text-warm-white shadow-xl relative overflow-hidden animate-liquid">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sienna/[0.08] rounded-full -mr-32 -mt-32 blur-3xl" />
        <CardContent className="relative flex flex-col items-center justify-between gap-4 p-8 md:flex-row">
          <div>
            <h3 className="text-xl font-bold font-heading tracking-tight text-sienna dark:text-warm-white">Ready to close the gap?</h3>
            <p className="mt-1 text-slate dark:text-warm-white/80 max-w-md">
              Follow our personalized learning roadmap to acquire the missing skills and fast-track your career.
            </p>
          </div>
          <Button
            className="w-full bg-sienna text-warm-white hover:bg-sienna/90 md:w-auto cursor-pointer shadow-lg hover:shadow-sienna/20 transition-all duration-300"
            onClick={() => navigate('seeker-roadmap')}
          >
            View Learning Roadmap
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
