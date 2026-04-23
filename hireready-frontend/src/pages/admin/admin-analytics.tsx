import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { platformStats, analyticsData } from '@/lib/mock-data';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, Users, Briefcase, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const COLORS = ['var(--sienna)', 'var(--slate)', 'var(--mist)'];

export function AdminAnalytics() {
  return (
    <div className="space-y-6 liquid-stagger">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="mt-1 text-muted-foreground">
          Platform statistics and insights
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Total Users', value: platformStats.totalUsers, growth: '+12%' },
          { label: 'Active Seekers', value: platformStats.activeJobSeekers, growth: '+8%' },
          { label: 'Job Postings', value: platformStats.totalJobPostings, growth: '+24%' },
          { label: 'Monthly Growth', value: '+29%', highlight: true },
        ].map((stat, i) => (
          <Card key={i} className="border-border/50 shadow-sm bg-card hover-scale cursor-pointer">
            <CardContent className="p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className={cn(
                  "mt-2 text-3xl font-bold font-heading",
                  stat.highlight ? "text-sienna" : "text-foreground"
                )}>
                  {stat.value}
                </p>
                {stat.growth && (
                  <p className="mt-1 text-xs text-sienna font-medium">
                    {stat.growth} <span className="text-muted-foreground font-normal">from last month</span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Most Searched Roles */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground font-heading">
              Most Searched Job Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.mostSearchedRoles}
                  layout="vertical"
                  margin={{ left: 0, right: 30 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="role"
                    axisLine={false}
                    tickLine={false}
                    width={130}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--foreground)',
                    }}
                    itemStyle={{ color: 'var(--sienna)' }}
                  />
                  <Bar dataKey="searches" fill="var(--sienna)" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground font-heading">
              User Role Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {analyticsData.userDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--foreground)',
                    }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span className="text-xs font-medium text-muted-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Growth */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground font-heading">
            Platform Growth Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.platformGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                />
                <YAxis
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
                  itemStyle={{ color: 'var(--sienna)' }}
                  formatter={(value: number) => [`${value} users`, 'Total Users']}
                />
                <Line
                  type="monotone"
                  dataKey="users"
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
  );
}
