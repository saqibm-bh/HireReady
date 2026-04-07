import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { platformStats, analyticsData } from '@/lib/mock-data';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, Users, Briefcase, Search } from 'lucide-react';

const COLORS = ['#1C1C1E', '#4B5563', '#9CA3AF'];

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Analytics</h1>
        <p className="mt-1 text-[#6B7280]">
          Platform statistics and insights
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F3F4F6] p-2">
                <Users className="h-5 w-5 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">
                  {platformStats.totalUsers}
                </p>
                <p className="text-sm text-[#6B7280]">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F3F4F6] p-2">
                <Search className="h-5 w-5 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">
                  {platformStats.activeJobSeekers}
                </p>
                <p className="text-sm text-[#6B7280]">Active Seekers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F3F4F6] p-2">
                <Briefcase className="h-5 w-5 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">
                  {platformStats.totalJobPostings}
                </p>
                <p className="text-sm text-[#6B7280]">Job Postings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F3F4F6] p-2">
                <TrendingUp className="h-5 w-5 text-[#6B7280]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1C1E]">+29%</p>
                <p className="text-sm text-[#6B7280]">Monthly Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Most Searched Roles */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
              Most Searched Job Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.mostSearchedRoles}
                  layout="vertical"
                  margin={{ left: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="role"
                    axisLine={false}
                    tickLine={false}
                    width={130}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1C1C1E',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="searches" fill="#2D2D2D" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
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
                      backgroundColor: '#1C1C1E',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: '#6B7280', fontSize: 12 }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Growth */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
            Platform Growth Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.platformGrowth}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
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
                  formatter={(value: number) => [`${value} users`, 'Total Users']}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#2D2D2D"
                  strokeWidth={2}
                  dot={{ fill: '#1C1C1E', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
