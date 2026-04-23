import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillBadge } from '@/components/skill-badge';
import { currentJobSeeker, matchScoreHistory } from '@/lib/mock-data';
import { User, MapPin, Target, FileText, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function SeekerProfile() {
  const initials = currentJobSeeker.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile and track your progress
        </p>
      </div>

      {/* Profile Header */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sienna/10 border-2 border-sienna/20">
              <span className="text-3xl font-bold text-sienna">{initials}</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground font-heading">
                {currentJobSeeker.name}
              </h2>
              <div className="mt-2 flex flex-col items-center gap-2 md:flex-row md:items-start">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Target className="h-4 w-4 text-sienna" />
                  <span className="text-sm">{currentJobSeeker.targetRole}</span>
                </div>
                <span className="hidden text-border md:inline">|</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-sienna" />
                  <span className="text-sm">{currentJobSeeker.location}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold text-sienna">
                    {currentJobSeeker.matchScore}%
                  </p>
                  <p className="text-xs text-muted-foreground">Match Score</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {currentJobSeeker.currentSkills.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Skills</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {currentJobSeeker.resumeHistory.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Resumes</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Skills */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground font-heading">
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
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground font-heading">
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
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--foreground)',
                    }}
                    itemStyle={{ color: 'var(--foreground)' }}
                    formatter={(value: number) => [`${value}%`, 'Match Score']}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--sienna)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--sienna)', r: 4, strokeWidth: 2, stroke: 'var(--card)' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume Upload History */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground font-heading">
            Resume Upload History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentJobSeeker.resumeHistory.map((resume, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-border bg-background p-4 hover:bg-muted/10 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
                  <FileText className="h-5 w-5 text-sienna" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{resume.filename}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{resume.date}</span>
                  </div>
                </div>
                {index === 0 && (
                  <span className="rounded-full bg-sienna/10 text-sienna border border-sienna/20 px-2 py-0.5 text-xs font-medium">
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
