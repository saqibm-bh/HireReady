import type {
  JobSeeker,
  Recruiter,
  Admin,
  JobPosting,
  Application,
  LearningResource,
  GapAnalysis,
  PlatformStats,
  Skill,
} from './types';

// Current logged-in users (mock)
export const currentJobSeeker: JobSeeker = {
  id: 'js-001',
  name: 'Alex Thompson',
  email: 'alex@example.com',
  role: 'job-seeker',
  avatar: '',
  joinDate: '2024-01-15',
  status: 'active',
  targetRole: 'Senior Frontend Developer',
  location: 'San Francisco, CA',
  currentSkills: ['JavaScript', 'React', 'CSS', 'HTML', 'Git', 'REST APIs', 'Responsive Design'],
  matchScore: 72,
  resumeHistory: [
    { date: '2024-03-01', filename: 'Alex_Thompson_Resume_v3.pdf' },
    { date: '2024-02-15', filename: 'Alex_Thompson_Resume_v2.pdf' },
    { date: '2024-01-15', filename: 'Alex_Thompson_Resume_v1.pdf' },
  ],
};

export const currentRecruiter: Recruiter = {
  id: 'rec-001',
  name: 'Sarah Mitchell',
  email: 'sarah@techcorp.com',
  role: 'recruiter',
  avatar: '',
  joinDate: '2024-02-01',
  status: 'active',
  companyName: 'TechCorp Inc.',
  workEmail: 'sarah@techcorp.com',
};

export const currentAdmin: Admin = {
  id: 'admin-001',
  name: 'Michael Chen',
  email: 'admin@hireready.com',
  role: 'admin',
  avatar: '',
  joinDate: '2023-06-01',
  status: 'active',
};

// Job Seeker specific data
export const gapAnalysis: GapAnalysis = {
  targetRole: 'Senior Frontend Developer',
  overallMatch: 72,
  skillsYouHave: ['JavaScript', 'React', 'CSS', 'HTML', 'Git', 'REST APIs', 'Responsive Design'],
  skillsMissing: [
    { name: 'TypeScript', importance: 95 },
    { name: 'Next.js', importance: 88 },
    { name: 'Testing (Jest/Cypress)', importance: 82 },
    { name: 'State Management (Redux/Zustand)', importance: 78 },
    { name: 'GraphQL', importance: 65 },
    { name: 'CI/CD Pipelines', importance: 58 },
  ],
};

export const topMissingSkills: Skill[] = [
  { name: 'TypeScript', importance: 95, category: 'Programming' },
  { name: 'Next.js', importance: 88, category: 'Framework' },
  { name: 'Testing (Jest/Cypress)', importance: 82, category: 'Quality' },
  { name: 'State Management', importance: 78, category: 'Architecture' },
];

export const learningResources: LearningResource[] = [
  {
    id: 'lr-001',
    skill: 'TypeScript',
    title: 'TypeScript Deep Dive',
    provider: 'Udemy',
    duration: '12 hours',
    url: '#',
    type: 'course',
  },
  {
    id: 'lr-002',
    skill: 'Next.js',
    title: 'Next.js 14 Complete Guide',
    provider: 'Vercel',
    duration: '8 hours',
    url: '#',
    type: 'course',
  },
  {
    id: 'lr-003',
    skill: 'Testing',
    title: 'Testing React Applications',
    provider: 'Frontend Masters',
    duration: '6 hours',
    url: '#',
    type: 'course',
  },
  {
    id: 'lr-004',
    skill: 'State Management',
    title: 'Redux Toolkit Fundamentals',
    provider: 'Redux Team',
    duration: '4 hours',
    url: '#',
    type: 'tutorial',
  },
];

export const learningRoadmap = [
  {
    skill: 'TypeScript',
    whyItMatters: 'Required by 95% of senior frontend roles. Enables better code quality and developer experience.',
    estimatedTime: '2-3 weeks',
    resources: [
      { title: 'TypeScript Handbook', url: '#' },
      { title: 'TypeScript Deep Dive Course', url: '#' },
    ],
    completed: false,
  },
  {
    skill: 'Next.js',
    whyItMatters: 'The most popular React framework. Used by major companies for production applications.',
    estimatedTime: '2 weeks',
    resources: [
      { title: 'Next.js Documentation', url: '#' },
      { title: 'Build a Full-Stack App with Next.js', url: '#' },
    ],
    completed: false,
  },
  {
    skill: 'Testing (Jest/Cypress)',
    whyItMatters: 'Critical for maintaining code quality. Senior developers are expected to write tests.',
    estimatedTime: '1-2 weeks',
    resources: [
      { title: 'Testing React with Jest', url: '#' },
      { title: 'E2E Testing with Cypress', url: '#' },
    ],
    completed: false,
  },
  {
    skill: 'State Management',
    whyItMatters: 'Complex applications require proper state management. Redux and Zustand are industry standards.',
    estimatedTime: '1 week',
    resources: [
      { title: 'Redux Toolkit Guide', url: '#' },
      { title: 'Zustand Crash Course', url: '#' },
    ],
    completed: false,
  },
];

export const jobSeekerApplications: Application[] = [
  {
    id: 'app-001',
    jobId: 'job-001',
    jobSeekerId: 'js-001',
    seekerName: 'Alex Thompson',
    matchScore: 78,
    skillsMatch: ['React', 'JavaScript', 'CSS'],
    missingSkills: ['TypeScript', 'Next.js'],
    applyDate: '2024-03-10',
    status: 'shortlisted',
  },
  {
    id: 'app-002',
    jobId: 'job-002',
    jobSeekerId: 'js-001',
    seekerName: 'Alex Thompson',
    matchScore: 65,
    skillsMatch: ['React', 'JavaScript'],
    missingSkills: ['TypeScript', 'GraphQL', 'Node.js'],
    applyDate: '2024-03-08',
    status: 'pending',
  },
  {
    id: 'app-003',
    jobId: 'job-003',
    jobSeekerId: 'js-001',
    seekerName: 'Alex Thompson',
    matchScore: 82,
    skillsMatch: ['React', 'JavaScript', 'CSS', 'Git'],
    missingSkills: ['TypeScript'],
    applyDate: '2024-03-05',
    status: 'reviewed',
  },
];

export const matchScoreHistory = [
  { month: 'Jan', score: 58 },
  { month: 'Feb', score: 64 },
  { month: 'Mar', score: 72 },
];

// Recruiter specific data
export const recruiterJobPostings: JobPosting[] = [
  {
    id: 'job-001',
    title: 'Senior Frontend Developer',
    description: 'We are looking for a senior frontend developer to join our team...',
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Testing'],
    experienceLevel: 'senior',
    jobType: 'full-time',
    recruiterId: 'rec-001',
    companyName: 'TechCorp Inc.',
    postedDate: '2024-03-01',
    applicantCount: 24,
    avgMatchScore: 71,
  },
  {
    id: 'job-002',
    title: 'Full Stack Engineer',
    description: 'Join our engineering team to build modern web applications...',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    experienceLevel: 'mid',
    jobType: 'full-time',
    recruiterId: 'rec-001',
    companyName: 'TechCorp Inc.',
    postedDate: '2024-02-20',
    applicantCount: 18,
    avgMatchScore: 68,
  },
  {
    id: 'job-003',
    title: 'React Developer',
    description: 'Looking for a React developer to work on our product...',
    requiredSkills: ['React', 'JavaScript', 'CSS', 'Git', 'Agile'],
    experienceLevel: 'mid',
    jobType: 'remote',
    recruiterId: 'rec-001',
    companyName: 'TechCorp Inc.',
    postedDate: '2024-02-15',
    applicantCount: 32,
    avgMatchScore: 74,
  },
];

export const jobApplicants: Application[] = [
  {
    id: 'app-101',
    jobId: 'job-001',
    jobSeekerId: 'js-001',
    seekerName: 'Alex Thompson',
    matchScore: 78,
    skillsMatch: ['React', 'CSS', 'Testing'],
    missingSkills: ['TypeScript', 'Next.js'],
    applyDate: '2024-03-10',
    status: 'pending',
  },
  {
    id: 'app-102',
    jobId: 'job-001',
    jobSeekerId: 'js-002',
    seekerName: 'Jordan Lee',
    matchScore: 92,
    skillsMatch: ['React', 'TypeScript', 'Next.js', 'Testing'],
    missingSkills: ['Tailwind CSS'],
    applyDate: '2024-03-09',
    status: 'shortlisted',
  },
  {
    id: 'app-103',
    jobId: 'job-001',
    jobSeekerId: 'js-003',
    seekerName: 'Taylor Kim',
    matchScore: 65,
    skillsMatch: ['React', 'CSS'],
    missingSkills: ['TypeScript', 'Next.js', 'Testing'],
    applyDate: '2024-03-08',
    status: 'pending',
  },
  {
    id: 'app-104',
    jobId: 'job-001',
    jobSeekerId: 'js-004',
    seekerName: 'Morgan Davis',
    matchScore: 45,
    skillsMatch: ['CSS'],
    missingSkills: ['React', 'TypeScript', 'Next.js', 'Testing'],
    applyDate: '2024-03-07',
    status: 'rejected',
  },
  {
    id: 'app-105',
    jobId: 'job-001',
    jobSeekerId: 'js-005',
    seekerName: 'Casey Brown',
    matchScore: 85,
    skillsMatch: ['React', 'TypeScript', 'Next.js'],
    missingSkills: ['Testing', 'Tailwind CSS'],
    applyDate: '2024-03-06',
    status: 'reviewed',
  },
];

export const recruiterStats = {
  totalPostings: 3,
  totalApplicants: 74,
  avgMatchScore: 71,
  pendingReviews: 12,
};

// Admin specific data
export const platformStats: PlatformStats = {
  totalUsers: 1248,
  activeJobSeekers: 892,
  pendingRecruiterApprovals: 7,
  totalJobPostings: 156,
};

export const allUsers = [
  { id: 'js-001', name: 'Alex Thompson', role: 'job-seeker', joinDate: '2024-01-15', status: 'active' },
  { id: 'js-002', name: 'Jordan Lee', role: 'job-seeker', joinDate: '2024-01-20', status: 'active' },
  { id: 'js-003', name: 'Taylor Kim', role: 'job-seeker', joinDate: '2024-02-01', status: 'active' },
  { id: 'js-004', name: 'Morgan Davis', role: 'job-seeker', joinDate: '2024-02-10', status: 'suspended' },
  { id: 'rec-001', name: 'Sarah Mitchell', role: 'recruiter', joinDate: '2024-02-01', status: 'active' },
  { id: 'rec-002', name: 'David Wilson', role: 'recruiter', joinDate: '2024-02-15', status: 'active' },
  { id: 'rec-003', name: 'Emily Garcia', role: 'recruiter', joinDate: '2024-03-01', status: 'active' },
];

export const pendingRecruiters: Recruiter[] = [
  {
    id: 'rec-pending-001',
    name: 'Jennifer Adams',
    email: 'jennifer@startupx.io',
    role: 'recruiter',
    joinDate: '2024-03-12',
    status: 'active',
    companyName: 'StartupX',
    workEmail: 'jennifer@startupx.io',
  },
  {
    id: 'rec-pending-002',
    name: 'Robert Chen',
    email: 'robert@innovate.co',
    role: 'recruiter',
    joinDate: '2024-03-11',
    status: 'active',
    companyName: 'Innovate Co.',
    workEmail: 'robert@innovate.co',
  },
  {
    id: 'rec-pending-003',
    name: 'Lisa Park',
    email: 'lisa@globaltech.com',
    role: 'recruiter',
    joinDate: '2024-03-10',
    status: 'active',
    companyName: 'GlobalTech',
    workEmail: 'lisa@globaltech.com',
  },
];

export const recentActivity = [
  { id: 1, action: 'New job seeker registered', user: 'Emma Wilson', time: '5 minutes ago' },
  { id: 2, action: 'Job posting created', user: 'Sarah Mitchell', time: '15 minutes ago' },
  { id: 3, action: 'Recruiter approval pending', user: 'Jennifer Adams', time: '1 hour ago' },
  { id: 4, action: 'User suspended', user: 'Morgan Davis', time: '2 hours ago' },
  { id: 5, action: 'New application submitted', user: 'Alex Thompson', time: '3 hours ago' },
];

export const analyticsData = {
  mostSearchedRoles: [
    { role: 'Frontend Developer', searches: 245 },
    { role: 'Full Stack Engineer', searches: 198 },
    { role: 'Backend Developer', searches: 167 },
    { role: 'DevOps Engineer', searches: 134 },
    { role: 'Data Scientist', searches: 112 },
  ],
  platformGrowth: [
    { month: 'Oct', users: 320 },
    { month: 'Nov', users: 480 },
    { month: 'Dec', users: 650 },
    { month: 'Jan', users: 820 },
    { month: 'Feb', users: 980 },
    { month: 'Mar', users: 1248 },
  ],
  userDistribution: [
    { name: 'Job Seekers', value: 892 },
    { name: 'Recruiters', value: 156 },
    { name: 'Admins', value: 3 },
  ],
};

export const suggestedRoles = [
  'Senior Frontend Developer',
  'Full Stack Engineer',
  'React Developer',
  'Software Engineer',
  'Frontend Engineer',
  'UI/UX Developer',
  'JavaScript Developer',
  'Web Developer',
];
