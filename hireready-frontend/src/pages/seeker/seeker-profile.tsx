import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillBadge } from '@/components/skill-badge';
import { currentJobSeeker, matchScoreHistory } from '@/lib/mock-data';
import { User, MapPin, Target, FileText, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function SeekerProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Profile</h1>
        <p className="mt-1 text-[#6B7280]">
          Manage your profile and track your progress
        </p>
      </div>

      {/* Profile Header */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F3F4F6]">
              <User className="h-12 w-12 text-[#6B7280]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#1C1C1E]">
                {currentJobSeeker.name}
              </h2>
              <div className="mt-2 flex flex-col items-center gap-2 md:flex-row md:items-start">
                <div className="flex items-center gap-1 text-[#6B7280]">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">{currentJobSeeker.targetRole}</span>
                </div>
                <span className="hidden text-[#D1D5DB] md:inline">|</span>
                <div className="flex items-center gap-1 text-[#6B7280]">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{currentJobSeeker.location}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1C1C1E]">
                    {currentJobSeeker.matchScore}%
                  </p>
                  <p className="text-xs text-[#6B7280]">Match Score</p>
                </div>
                <div className="h-10 w-px bg-[#E5E5E5]" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1C1C1E]">
                    {currentJobSeeker.currentSkills.length}
                  </p>
                  <p className="text-xs text-[#6B7280]">Skills</p>
                </div>
                <div className="h-10 w-px bg-[#E5E5E5]" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1C1C1E]">
                    {currentJobSeeker.resumeHistory.length}
                  </p>
                  <p className="text-xs text-[#6B7280]">Resumes</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Skills */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
              Current Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentJobSeeker.currentSkills.map((skill) => (
                <SkillBadge key={skill} skill={skill} variant="filled" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Match Score History */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
              Match Score History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={matchScoreHistory}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1C1C1E',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Match Score']}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6B7280"
                    strokeWidth={2}
                    dot={{ fill: '#1C1C1E', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume Upload History */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
            Resume Upload History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentJobSeeker.resumeHistory.map((resume, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-[#E5E5E5] bg-white p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3F4F6]">
                  <FileText className="h-5 w-5 text-[#6B7280]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1C1C1E]">{resume.filename}</p>
                  <div className="flex items-center gap-1 text-sm text-[#6B7280]">
                    <Calendar className="h-3 w-3" />
                    <span>{resume.date}</span>
                  </div>
                </div>
                {index === 0 && (
                  <span className="rounded-full bg-[#2D2D2D] px-2 py-0.5 text-xs text-white">
                    Current
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
