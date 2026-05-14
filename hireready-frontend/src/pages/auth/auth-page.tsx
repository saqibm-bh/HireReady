import { useState, useEffect } from 'react';
import { useNavigation } from '@/lib/navigation-context';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Building2, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LoginRequest, UserSignupRequest } from '@/lib/types/auth';

type AuthMode = 'login' | 'signup';

export function AuthPage() {
  const { navigate, login: navLogin, pageParams } = useNavigation();
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>(pageParams?.mode || 'login');
  const [selectedRole, setSelectedRole] = useState<'job-seeker' | 'recruiter'>(pageParams?.role || 'job-seeker');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (pageParams?.mode) setMode(pageParams.mode);
    if (pageParams?.role) setSelectedRole(pageParams.role);
  }, [pageParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      try {
        await register({
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
          role: selectedRole
        });
        toast.success('Account Created');
        setMode('login');
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      } catch (error: any) {
        const errorMessage = error.response?.data?.detail || error.message || 'Failed to create account';
        toast.error(errorMessage);
      }
    } else {
      try {
        await login({
          email: formData.email,
          password: formData.password,
        });
        toast.success('Welcome back!');
      } catch (error: any) {
        const errorMessage = error.response?.status === 401
          ? 'Invalid credentials'
          : (error.response?.data?.detail || error.message || 'Invalid email or password');
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12 animate-liquid">
      <Card className="w-full max-w-md border-border/50 shadow-lg bg-card">
        <CardHeader className="space-y-1 pb-6">
          <button
            onClick={() => navigate('landing')}
            className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-sienna transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>
          <CardTitle className="text-2xl font-bold text-foreground font-heading">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            {mode === 'login'
              ? 'Enter your credentials to access your account'
              : 'Get started with HireReady today'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Auth Mode Toggle */}
          <div className="mb-6 flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setMode('login')}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-bold font-heading transition-all",
                mode === 'login'
                  ? "bg-background text-sienna shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Log In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-bold font-heading transition-all",
                mode === 'signup'
                  ? "bg-background text-sienna shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
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
                        ? "border-sienna bg-muted/50"
                        : "border-border hover:border-slate"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-bold font-heading",
                      selectedRole === 'job-seeker' ? "text-sienna" : "text-muted-foreground"
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
                        ? "border-sienna bg-muted/50"
                        : "border-border hover:border-slate"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-bold font-heading",
                      selectedRole === 'recruiter' ? "text-sienna" : "text-muted-foreground"
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
                <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="border-border bg-background pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="border-border bg-background pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-border bg-background pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-sienna transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Signup only) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="border-border bg-background pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-sienna transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sienna text-warm-white hover:bg-sienna/90 shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Create Account')}
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
}
