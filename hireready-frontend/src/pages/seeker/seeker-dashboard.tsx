import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatchScoreRing } from '@/components/match-score-ring';
import { SkillBadge } from '@/components/skill-badge';
import { currentJobSeeker, gapAnalysis, topMissingSkills, learningResources, jobSeekerApplications } from '@/lib/mock-data';
import { ArrowRight, BookOpen, Clock, ExternalLink } from 'lucide-react';

export function SeekerDashboard() {
  const { navigate } = useNavigation();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="border-none bg-[#1C1C1E] text-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {currentJobSeeker.name.split(' ')[0]}</h1>
              <p className="mt-1 text-[#9CA3AF]">
                Here&apos;s your progress towards becoming a {currentJobSeeker.targetRole}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-[#9CA3AF]">Overall Match</p>
                <p className="text-2xl font-bold">{currentJobSeeker.matchScore}%</p>
              </div>
              <MatchScoreRing score={currentJobSeeker.matchScore} size="md" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Gap Summary */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">Your Skill Gap Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B7280]">Target Role</span>
            <span className="font-medium text-[#1C1C1E]">{gapAnalysis.targetRole}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Match Progress</span>
              <span className="text-sm font-medium text-[#1C1C1E]">{gapAnalysis.overallMatch}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
              <div
                className="h-full rounded-full bg-[#2D2D2D] transition-all duration-500"
                style={{ width: `${gapAnalysis.overallMatch}%` }}
              />
            </div>
          </div>
          <div>
            <span className="text-sm text-[#6B7280]">Missing Skills</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {gapAnalysis.skillsMissing.slice(0, 6).map((skill) => (
                <SkillBadge key={skill.name} skill={skill.name} variant="outlined" size="sm" />
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-[#E5E5E5] text-[#1C1C1E] hover:bg-[#F3F4F6]"
            onClick={() => navigate('seeker-gap-analysis')}
          >
            View Full Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Top Missing Skills */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">Top Missing Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {topMissingSkills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-lg border border-[#E5E5E5] bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1C1C1E]">{skill.name}</span>
                  <span className="text-sm text-[#6B7280]">{skill.importance}% importance</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
                  <div
                    className="h-full rounded-full bg-[#6B7280]"
                    style={{ width: `${skill.importance}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[#6B7280]">{skill.category}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Learning */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">Recommended Learning</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#6B7280] hover:text-[#1C1C1E]"
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
                className="flex items-start gap-4 rounded-lg border border-[#E5E5E5] bg-white p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6]">
                  <BookOpen className="h-5 w-5 text-[#6B7280]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-[#1C1C1E]">{resource.title}</h4>
                  <p className="text-sm text-[#6B7280]">{resource.provider}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-[#9CA3AF]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {resource.duration}
                    </span>
                    <span className="capitalize">{resource.type}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ExternalLink className="h-4 w-4 text-[#6B7280]" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">Recent Applications</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#6B7280] hover:text-[#1C1C1E]"
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
                <tr className="border-b border-[#E5E5E5]">
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Position</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Match</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Applied</th>
                </tr>
              </thead>
              <tbody>
                {jobSeekerApplications.map((app) => (
                  <tr key={app.id} className="border-b border-[#E5E5E5] last:border-0">
                    <td className="py-3 text-sm text-[#1C1C1E]">
                      {app.jobId === 'job-001' ? 'Senior Frontend Developer' : 
                       app.jobId === 'job-002' ? 'Full Stack Engineer' : 'React Developer'}
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        app.matchScore >= 70 ? 'bg-[#2D2D2D] text-white' :
                        app.matchScore >= 50 ? 'bg-[#9CA3AF] text-white' :
                        'bg-[#E5E5E5] text-[#6B7280]'
                      }`}>
                        {app.matchScore}%
                      </span>
                    </td>
                    <td className="py-3 text-sm capitalize text-[#6B7280]">{app.status}</td>
                    <td className="py-3 text-sm text-[#6B7280]">{app.applyDate}</td>
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
