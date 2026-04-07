import { useNavigation } from '@/lib/navigation-context';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, User } from 'lucide-react';

export function Navbar() {
  const { currentRole, isLoggedIn, navigate, logout, toggleSidebar } = useNavigation();

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between bg-[#1C1C1E] px-4 md:px-6">
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <button
          onClick={() => navigate(isLoggedIn ? (currentRole === 'job-seeker' ? 'seeker-dashboard' : currentRole === 'recruiter' ? 'recruiter-dashboard' : 'admin-dashboard') : 'landing')}
          className="flex items-center gap-2"
        >
          <span className="text-lg font-semibold text-white">HireReady</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {!isLoggedIn ? (
          <>
            <Button
              variant="ghost"
              className="hidden text-white hover:bg-white/10 sm:inline-flex"
              onClick={() => navigate('auth')}
            >
              Log In
            </Button>
            <Button
              className="bg-white text-[#1C1C1E] hover:bg-gray-200"
              onClick={() => navigate('auth')}
            >
              Get Started
            </Button>
          </>
        ) : (
          <>
            <div className="mr-2 hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-white">
                {currentRole === 'job-seeker' ? 'Job Seeker' : currentRole === 'recruiter' ? 'Recruiter' : 'Admin'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
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
