

import { NavigationProvider, useNavigation } from '@/lib/navigation-context';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { Toaster } from 'sonner';

// Pages
import { LandingPage } from '@/pages/landing/landing-page';
import { AuthPage } from '@/pages/auth/auth-page';

// Seeker Pages
import { SeekerDashboard } from '@/pages/seeker/seeker-dashboard';
import { SeekerResume } from '@/pages/seeker/seeker-resume';
import { SeekerGapAnalysis } from '@/pages/seeker/seeker-gap-analysis';
import { SeekerRoadmap } from '@/pages/seeker/seeker-roadmap';
import { SeekerApplications } from '@/pages/seeker/seeker-applications';
import { SeekerProfile } from '@/pages/seeker/seeker-profile';

// Recruiter Pages
import { RecruiterDashboard } from '@/pages/recruiter/recruiter-dashboard';
import { RecruiterPostJob } from '@/pages/recruiter/recruiter-post-job';
import { RecruiterPostings } from '@/pages/recruiter/recruiter-postings';
import { RecruiterApplicants } from '@/pages/recruiter/recruiter-applicants';
import { RecruiterProfile } from '@/pages/recruiter/recruiter-profile';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/admin-dashboard';
import { AdminUsers } from '@/pages/admin/admin-users';
import { AdminPostings } from '@/pages/admin/admin-postings';
import { AdminApprovals } from '@/pages/admin/admin-approvals';
import { AdminAnalytics } from '@/pages/admin/admin-analytics';

import { ThemeProvider } from '@/components/theme-provider';

function PageRouter() {
  const { currentPage, isLoggedIn, sidebarCollapsed } = useNavigation();

  // Render landing page
  if (currentPage === 'landing') {
    return (
      <>
        <Navbar />
        <LandingPage />
      </>
    );
  }

  // Render auth page
  if (currentPage === 'auth') {
    return (
      <>
        <Navbar />
        <AuthPage />
      </>
    );
  }

  // Render authenticated pages with sidebar
  if (isLoggedIn) {
    const renderPage = () => {
      switch (currentPage) {
        // Seeker pages
        case 'seeker-dashboard':
          return <SeekerDashboard />;
        case 'seeker-resume':
          return <SeekerResume />;
        case 'seeker-gap-analysis':
          return <SeekerGapAnalysis />;
        case 'seeker-roadmap':
          return <SeekerRoadmap />;
        case 'seeker-applications':
          return <SeekerApplications />;
        case 'seeker-profile':
          return <SeekerProfile />;
        // Recruiter pages
        case 'recruiter-dashboard':
          return <RecruiterDashboard />;
        case 'recruiter-post-job':
          return <RecruiterPostJob />;
        case 'recruiter-postings':
          return <RecruiterPostings />;
        case 'recruiter-applicants':
          return <RecruiterApplicants />;
        case 'recruiter-profile':
          return <RecruiterProfile />;
        // Admin pages
        case 'admin-dashboard':
          return <AdminDashboard />;
        case 'admin-users':
          return <AdminUsers />;
        case 'admin-postings':
          return <AdminPostings />;
        case 'admin-approvals':
          return <AdminApprovals />;
        case 'admin-analytics':
          return <AdminAnalytics />;
        default:
          return <SeekerDashboard />;
      }
    };

    return (
      <>
        <Navbar />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <Sidebar />
          <main className={`flex-1 bg-background p-4 transition-all md:p-6 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-0'}`}>
            <div className="mx-auto max-w-7xl">
              {renderPage()}
            </div>
          </main>
        </div>
      </>
    );
  }

  // Fallback
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="hireready-theme">
      <NavigationProvider>
        <PageRouter />
        <Toaster position="bottom-right" />
      </NavigationProvider>
    </ThemeProvider>
  );
}
