import { useNavigation } from '@/lib/navigation-context';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  BookOpen,
  Briefcase,
  User,
  PlusCircle,
  Users,
  ClipboardList,
  ShieldCheck,
  TrendingUp,
  ChevronLeft,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const seekerNavItems = [
  { page: 'seeker-dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { page: 'seeker-resume' as const, label: 'My Resume', icon: FileText },
  { page: 'seeker-gap-analysis' as const, label: 'Gap Analysis', icon: BarChart3 },
  { page: 'seeker-roadmap' as const, label: 'Learning Roadmap', icon: BookOpen },
  { page: 'seeker-applications' as const, label: 'Applied Jobs', icon: Briefcase },
  { page: 'seeker-profile' as const, label: 'Profile', icon: User },
];

const recruiterNavItems = [
  { page: 'recruiter-dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { page: 'recruiter-post-job' as const, label: 'Post a Job', icon: PlusCircle },
  { page: 'recruiter-postings' as const, label: 'My Job Postings', icon: ClipboardList },
  { page: 'recruiter-applicants' as const, label: 'Applicants', icon: Users },
  { page: 'recruiter-profile' as const, label: 'Profile', icon: User },
];

const adminNavItems = [
  { page: 'admin-dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { page: 'admin-users' as const, label: 'Users', icon: Users },
  { page: 'admin-postings' as const, label: 'Job Postings', icon: ClipboardList },
  { page: 'admin-approvals' as const, label: 'Recruiter Approvals', icon: ShieldCheck },
  { page: 'admin-analytics' as const, label: 'Analytics', icon: TrendingUp },
];

export function Sidebar() {
  const { currentPage, currentRole, sidebarCollapsed, navigate, toggleSidebar } = useNavigation();

  const navItems =
    currentRole === 'job-seeker'
      ? seekerNavItems
      : currentRole === 'recruiter'
        ? recruiterNavItems
        : adminNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-200 md:relative md:top-0 md:translate-x-0 md:transition-all",
          sidebarCollapsed ? "-translate-x-full md:w-16" : "translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex items-center justify-end p-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Desktop collapse button */}
          <div className="hidden p-2 md:block">
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto flex"
              onClick={toggleSidebar}
            >
              <ChevronLeft
                className={cn(
                  "h-5 w-5 transition-transform",
                  sidebarCollapsed && "rotate-180"
                )}
              />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  onClick={() => {
                    navigate(item.page);
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#111827] text-white"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
