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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Gap Analysis Results</h1>
        <p className="mt-1 text-[#6B7280]">
          See how your skills match up against the requirements for {gapAnalysis.targetRole}
        </p>
      </div>

      {/* Target Role Header */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm text-[#6B7280]">Target Role</p>
              <h2 className="mt-1 text-2xl font-bold text-[#1C1C1E]">{gapAnalysis.targetRole}</h2>
              <p className="mt-2 text-[#6B7280]">
                Based on {gapAnalysis.skillsYouHave.length + gapAnalysis.skillsMissing.length} required skills
              </p>
            </div>
            <div className="flex flex-col items-center">
              <MatchScoreRing score={gapAnalysis.overallMatch} size="lg" />
              <p className="mt-2 text-sm text-[#6B7280]">Overall Match Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Comparison */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skills You Have */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#1C1C1E]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D2D2D] text-xs text-white">
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
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#1C1C1E]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#6B7280] text-xs text-[#6B7280]">
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
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#1C1C1E]">
            <TrendingUp className="h-5 w-5 text-[#6B7280]" />
            Missing Skills Ranked by Market Importance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gapAnalysis.skillsMissing.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F3F4F6] text-xs font-medium text-[#6B7280]">
                      {index + 1}
                    </span>
                    <span className="font-medium text-[#1C1C1E]">{skill.name}</span>
                  </div>
                  <span className="text-sm text-[#6B7280]">{skill.importance}% importance</span>
                </div>
                <div className="ml-9 h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
                  <div
                    className="h-full rounded-full bg-[#6B7280] transition-all duration-500"
                    style={{ width: `${skill.importance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="border-none bg-[#F9FAFB] shadow-sm">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
          <div>
            <h3 className="text-lg font-semibold text-[#1C1C1E]">Ready to close the gap?</h3>
            <p className="mt-1 text-[#6B7280]">
              Follow our personalized learning roadmap to acquire the missing skills
            </p>
          </div>
          <Button
            className="w-full bg-[#111827] text-white hover:bg-[#1C1C1E] md:w-auto"
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
