import { useState, useEffect } from 'react';
import { useNavigation } from '@/lib/navigation-context';
import { authApi } from '@/api/endpoint/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Building2, Mail, Lock, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/lib/types';

type AuthMode = 'login' | 'signup';

export function AuthPage() {
  const { navigate, login, pageParams } = useNavigation();
  const [mode, setMode] = useState<AuthMode>(pageParams?.mode || 'login');
  const [selectedRole, setSelectedRole] = useState<'job-seeker' | 'recruiter'>(pageParams?.role || 'job-seeker');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', password: '' });

  useEffect(() => {
    if (pageParams?.mode) setMode(pageParams.mode);
    if (pageParams?.role) setSelectedRole(pageParams.role);
  }, [pageParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      try {
        setIsLoading(true);
        await authApi.register({
          name: formData.name || formData.email.split('@')[0], 
          email: formData.email,
          password: formData.password,
          role: selectedRole
        });
        toast.success('Account Created');
        setMode('login');
        setFormData(prev => ({ ...prev, password: '' }));
      } catch (error: any) {
        toast.error(error.message || 'Failed to create account');
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const response = await authApi.login({
          email: formData.email,
          password: formData.password,
        });
        toast.success('Welcome back!');
        login(response.access_token);
      } catch (error: any) {
        toast.error(error.message || 'Invalid email or password');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-1 pb-6">
          <button
            onClick={() => navigate('landing')}
            className="mb-4 flex items-center gap-2 text-sm text-slate hover:text-sienna transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>
          <CardTitle className="text-2xl font-bold text-graphite font-heading">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </CardTitle>
          <CardDescription className="text-slate font-medium">
            {mode === 'login'
              ? 'Enter your credentials to access your account'
              : 'Get started with HireReady today'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Auth Mode Toggle */}
          <div className="mb-6 flex rounded-lg bg-cloud p-1">
            <button
              onClick={() => setMode('login')}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-bold font-heading transition-all",
                mode === 'login'
                  ? "bg-warm-white text-sienna shadow-sm"
                  : "text-slate hover:text-graphite"
              )}
            >
              Log In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-bold font-heading transition-all",
                mode === 'signup'
                  ? "bg-warm-white text-sienna shadow-sm"
                  : "text-slate hover:text-graphite"
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
                        ? "border-sienna bg-cloud/50"
                        : "border-mist hover:border-slate"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-bold font-heading",
                      selectedRole === 'job-seeker' ? "text-sienna" : "text-slate"
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
                        ? "border-sienna bg-cloud/50"
                        : "border-mist hover:border-slate"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-bold font-heading",
                      selectedRole === 'recruiter' ? "text-sienna" : "text-slate"
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
                <Label htmlFor="name" className="text-graphite font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="border-mist bg-warm-white pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Recruiter-specific fields */}
            {mode === 'signup' && selectedRole === 'recruiter' && (
              <div className="space-y-2">
                <Label htmlFor="company" className="text-graphite font-medium">Company Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                  <Input
                    id="company"
                    placeholder="TechCorp Inc."
                    className="border-mist bg-warm-white pl-10"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-graphite font-medium">
                {mode === 'signup' && selectedRole === 'recruiter' ? 'Work Email' : 'Email'}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                <Input
                  id="email"
                  type="email"
                  placeholder={mode === 'signup' && selectedRole === 'recruiter' ? 'you@company.com' : 'you@example.com'}
                  className="border-mist bg-warm-white pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-graphite font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="border-mist bg-warm-white pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sienna text-warm-white hover:bg-sienna/90 shadow-md transition-all active:scale-[0.98]"
            >
              {isLoading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Create Account')}
            </Button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-6 border-t border-mist pt-6">
            <p className="mb-3 text-center text-sm text-slate font-medium">Quick demo access</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-mist text-graphite hover:bg-cloud hover:text-sienna hover:border-sienna transition-all"
                onClick={() => login('demo-token', 'job-seeker')}
              >
                Job Seeker
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-mist text-graphite hover:bg-cloud hover:text-sienna hover:border-sienna transition-all"
                onClick={() => login('demo-token', 'recruiter')}
              >
                Recruiter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-mist text-graphite hover:bg-cloud hover:text-sienna hover:border-sienna transition-all"
                onClick={() => login('demo-token', 'admin')}
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
