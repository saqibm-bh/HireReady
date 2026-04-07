import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserRole } from './types';

type Page =
  | 'landing'
  | 'auth'
  // Job Seeker pages
  | 'seeker-dashboard'
  | 'seeker-resume'
  | 'seeker-gap-analysis'
  | 'seeker-roadmap'
  | 'seeker-applications'
  | 'seeker-profile'
  // Recruiter pages
  | 'recruiter-dashboard'
  | 'recruiter-post-job'
  | 'recruiter-postings'
  | 'recruiter-applicants'
  | 'recruiter-profile'
  // Admin pages
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-postings'
  | 'admin-approvals'
  | 'admin-analytics';

interface NavigationContextType {
  currentPage: Page;
  currentRole: UserRole | null;
  isLoggedIn: boolean;
  sidebarCollapsed: boolean;
  navigate: (page: Page) => void;
  login: (role: UserRole) => void;
  logout: () => void;
  toggleSidebar: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const login = (role: UserRole) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    if (role === 'job-seeker') {
      setCurrentPage('seeker-dashboard');
    } else if (role === 'recruiter') {
      setCurrentPage('recruiter-dashboard');
    } else {
      setCurrentPage('admin-dashboard');
    }
  };

  const logout = () => {
    setCurrentRole(null);
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        currentRole,
        isLoggedIn,
        sidebarCollapsed,
        navigate,
        login,
        logout,
        toggleSidebar,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
