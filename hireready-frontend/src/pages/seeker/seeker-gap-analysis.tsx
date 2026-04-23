import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatchScoreRing } from '@/components/match-score-ring';
import { SkillBadge } from '@/components/skill-badge';
import { gapAnalysis } from '@/lib/mock-data';
import { ArrowRight, TrendingUp } from 'lucide-react';

export function SeekerGapAnalysis() {
  const { navigate } = useNavigation();

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
      <Card className="border-border/50 bg-navbar text-navbar-foreground shadow-sm">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
          <div>
            <h3 className="text-lg font-semibold text-navbar-foreground font-heading">Ready to close the gap?</h3>
            <p className="mt-1 text-navbar-foreground/70">
              Follow our personalized learning roadmap to acquire the missing skills
            </p>
          </div>
          <Button
            className="w-full bg-sienna text-warm-white hover:bg-sienna/90 md:w-auto cursor-pointer"
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
