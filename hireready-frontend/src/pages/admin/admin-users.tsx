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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Users Management</h1>
        <p className="mt-1 text-[#6B7280]">
          View and manage all platform users
        </p>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#6B7280]" />
            <span className="text-sm font-medium text-[#1C1C1E]">Filter by Role:</span>
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48 border-[#E5E5E5] bg-white">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="job-seeker">Job Seekers</SelectItem>
              <SelectItem value="recruiter">Recruiters</SelectItem>
            </SelectContent>
          </Select>
          <span className="ml-auto text-sm text-[#6B7280]">
            Showing {filteredUsers.length} users
          </span>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E5E5]">
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Name</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Role</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Join Date</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-[#6B7280]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#E5E5E5] last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6]">
                          <span className="text-xs font-medium text-[#6B7280]">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-[#1C1C1E]">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        user.role === 'job-seeker' 
                          ? "bg-[#F3F4F6] text-[#6B7280]" 
                          : "bg-[#2D2D2D] text-white"
                      )}>
                        {user.role.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-[#6B7280]">{user.joinDate}</td>
                    <td className="py-4">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        user.status === 'active' 
                          ? "bg-[#E5E5E5] text-[#1C1C1E]" 
                          : "bg-[#9CA3AF] text-white"
                      )}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#E5E5E5] text-[#6B7280]"
                        >
                          <Ban className="mr-1 h-3 w-3" />
                          {user.status === 'active' ? 'Suspend' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#E5E5E5] text-[#6B7280]"
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
