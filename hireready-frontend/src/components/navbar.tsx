import { useNavigation } from '@/lib/navigation-context';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, User } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export function Navbar() {
  const { currentRole, isLoggedIn, navigate, logout, toggleSidebar } = useNavigation();

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between bg-navbar px-4 md:px-6">
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <Button
            variant="ghost"
            size="icon"
            className="text-navbar-foreground hover:bg-white/10 md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <button
          onClick={() => navigate(isLoggedIn ? (currentRole === 'job-seeker' ? 'seeker-dashboard' : currentRole === 'recruiter' ? 'recruiter-dashboard' : 'admin-dashboard') : 'landing')}
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <img src="/assets/images/logo.png" alt="HireReady Logo" className="h-10 w-10" />
          <span className="text-xl font-bold tracking-tight text-navbar-foreground font-heading">HireReady</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        {!isLoggedIn ? (
          <>
            <Button
              variant="ghost"
              className="hidden text-navbar-foreground hover:bg-white/10 sm:inline-flex"
              onClick={() => navigate('auth', { mode: 'login' })}
            >
              Log In
            </Button>
            <Button
              className="bg-sienna text-warm-white hover:bg-sienna/90"
              onClick={() => navigate('auth', { mode: 'signup' })}
            >
              Get Started
            </Button>
          </>
        ) : (
          <>
            <div className="mr-2 hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <User className="h-4 w-4 text-navbar-foreground" />
              </div>
              <span className="text-sm text-navbar-foreground">
                {currentRole === 'job-seeker' ? 'Job Seeker' : currentRole === 'recruiter' ? 'Recruiter' : 'Admin'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-navbar-foreground hover:bg-white/10"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
