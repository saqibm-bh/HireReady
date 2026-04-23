import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allUsers } from '@/lib/mock-data';
import { Users, Trash2, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminUsers() {
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredUsers = roleFilter === 'all' 
    ? allUsers 
    : allUsers.filter((user) => user.role === roleFilter);

  return (
    <div className="space-y-6 liquid-stagger">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
        <p className="mt-1 text-muted-foreground">
          View and manage all platform users
        </p>
      </div>

      {/* Filters */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter by Role:</span>
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48 border-border bg-background">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="job-seeker">Job Seekers</SelectItem>
              <SelectItem value="recruiter">Recruiters</SelectItem>
            </SelectContent>
          </Select>
          <span className="ml-auto text-sm text-muted-foreground">
            Showing {filteredUsers.length} users
          </span>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Join Date</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <span className="text-xs font-medium text-muted-foreground">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        user.role === 'job-seeker' 
                          ? "bg-muted text-muted-foreground" 
                          : "bg-sienna/20 text-sienna border border-sienna/30"
                      )}>
                        {user.role.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                    <td className="py-4">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        user.status === 'active' 
                          ? "bg-sienna/10 text-sienna" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border text-muted-foreground hover:bg-muted cursor-pointer"
                        >
                          <Ban className="mr-1 h-3 w-3" />
                          {user.status === 'active' ? 'Suspend' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border text-muted-foreground hover:text-red-500 hover:border-red-500 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
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
