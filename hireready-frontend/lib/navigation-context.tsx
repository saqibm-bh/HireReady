import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserRole } from './types';
import type { UserResponse } from './types/auth';
import { authService } from '@/services/auth-service';

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
  userData: UserResponse | null;
  sidebarCollapsed: boolean;
  pageParams: any;
  navigate: (page: Page, params?: any) => void;
  login: (token: string, fallbackRole?: UserRole) => void;
  logout: () => void;
  toggleSidebar: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageParams, setPageParams] = useState<any>({});

  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.role) {
        setIsLoggedIn(true);
        setCurrentRole(decoded.role as UserRole);
        // Fetch full user data
        authService.getCurrentUser()
          .then(setUserData)
          .catch(() => {
            localStorage.removeItem('auth_token');
            setIsLoggedIn(false);
            setCurrentRole(null);
          });
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  const navigate = (page: Page, params?: any) => {
    setCurrentPage(page);
    setPageParams(params || {});
  };

  const login = (token: string, fallbackRole?: UserRole) => {
    let role = fallbackRole;
    if (token !== 'demo-token') {
      localStorage.setItem('auth_token', token);
      const decoded = decodeToken(token);
      if (decoded && decoded.role) {
        role = decoded.role as UserRole;
      }
    }

    if (role) {
      setCurrentRole(role);
      setIsLoggedIn(true);
      
      // Fetch user data if it's not a demo login
      if (token !== 'demo-token') {
        authService.getCurrentUser().then(setUserData);
      } else {
        // Set mock user data for demo
        setUserData({
          id: 'demo',
          email: 'demo@example.com',
          name: 'Demo User',
          role: role
        });
      }

      if (role === 'job-seeker') {
        setCurrentPage('seeker-dashboard');
      } else if (role === 'recruiter') {
        setCurrentPage('recruiter-dashboard');
      } else {
        setCurrentPage('admin-dashboard');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setCurrentRole(null);
    setUserData(null);
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
        userData,
        sidebarCollapsed,
        pageParams,
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
