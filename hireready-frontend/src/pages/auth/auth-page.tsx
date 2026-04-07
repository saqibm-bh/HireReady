import { useState } from 'react';
import { useNavigation } from '@/lib/navigation-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Building2, Mail, Lock, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/lib/types';

type AuthMode = 'login' | 'signup';

export function AuthPage() {
  const { navigate, login } = useNavigation();
  const [mode, setMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<'job-seeker' | 'recruiter'>('job-seeker');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#F5F5F5] px-4 py-12">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-1 pb-6">
          <button
            onClick={() => navigate('landing')}
            className="mb-4 flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1C1C1E]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>
          <CardTitle className="text-2xl font-bold text-[#1C1C1E]">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </CardTitle>
          <CardDescription className="text-[#6B7280]">
            {mode === 'login'
              ? 'Enter your credentials to access your account'
              : 'Get started with HireReady today'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Auth Mode Toggle */}
          <div className="mb-6 flex rounded-lg bg-[#F3F4F6] p-1">
            <button
              onClick={() => setMode('login')}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
                mode === 'login'
                  ? "bg-white text-[#1C1C1E] shadow-sm"
                  : "text-[#6B7280] hover:text-[#1C1C1E]"
              )}
            >
              Log In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
                mode === 'signup'
                  ? "bg-white text-[#1C1C1E] shadow-sm"
                  : "text-[#6B7280] hover:text-[#1C1C1E]"
              )}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection (Signup only) */}
            {mode === 'signup' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('job-seeker')}
                    className={cn(
                      "flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all",
                      selectedRole === 'job-seeker'
                        ? "border-[#1C1C1E] bg-[#F9FAFB]"
                        : "border-[#E5E5E5] hover:border-[#9CA3AF]"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-medium",
                      selectedRole === 'job-seeker' ? "text-[#1C1C1E]" : "text-[#6B7280]"
                    )}>
                      Job Seeker
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('recruiter')}
                    className={cn(
                      "flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all",
                      selectedRole === 'recruiter'
                        ? "border-[#1C1C1E] bg-[#F9FAFB]"
                        : "border-[#E5E5E5] hover:border-[#9CA3AF]"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-medium",
                      selectedRole === 'recruiter' ? "text-[#1C1C1E]" : "text-[#6B7280]"
                    )}>
                      Recruiter
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Name (Signup only) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#1C1C1E]">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="border-[#E5E5E5] bg-white pl-10"
                  />
                </div>
              </div>
            )}

            {/* Recruiter-specific fields */}
            {mode === 'signup' && selectedRole === 'recruiter' && (
              <div className="space-y-2">
                <Label htmlFor="company" className="text-[#1C1C1E]">Company Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <Input
                    id="company"
                    placeholder="TechCorp Inc."
                    className="border-[#E5E5E5] bg-white pl-10"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1C1C1E]">
                {mode === 'signup' && selectedRole === 'recruiter' ? 'Work Email' : 'Email'}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <Input
                  id="email"
                  type="email"
                  placeholder={mode === 'signup' && selectedRole === 'recruiter' ? 'you@company.com' : 'you@example.com'}
                  className="border-[#E5E5E5] bg-white pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1C1C1E]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="border-[#E5E5E5] bg-white pl-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#111827] text-white hover:bg-[#1C1C1E]"
            >
              {mode === 'login' ? 'Log In' : 'Create Account'}
            </Button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-6 border-t border-[#E5E5E5] pt-6">
            <p className="mb-3 text-center text-sm text-[#6B7280]">Quick demo access</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#E5E5E5] text-[#1C1C1E] hover:bg-[#F3F4F6]"
                onClick={() => login('job-seeker')}
              >
                Job Seeker
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#E5E5E5] text-[#1C1C1E] hover:bg-[#F3F4F6]"
                onClick={() => login('recruiter')}
              >
                Recruiter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#E5E5E5] text-[#1C1C1E] hover:bg-[#F3F4F6]"
                onClick={() => login('admin')}
              >
                Admin
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
