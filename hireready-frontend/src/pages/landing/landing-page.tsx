import { useNavigation } from '@/lib/navigation-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const seekerFeatures = [
  {
    title: 'Skill Gap Analysis',
    description: 'Upload your resume and see exactly which skills you need to land your target role.',
  },
  {
    title: 'Learning Roadmap',
    description: 'Get a personalized learning path with curated resources to bridge your skill gaps.',
  },
  {
    title: 'Match Scoring',
    description: 'See your compatibility score with job postings and track your progress over time.',
  },
];

const recruiterFeatures = [
  {
    title: 'Smart Candidate Matching',
    description: 'Match candidates with job requirements based on skills and experience.',
  },
  {
    title: 'Skill-Based Insights',
    description: 'Understand candidate skill gaps and identify qualified talent pool with precision.',
  },
  {
    title: 'Efficiency & Accuracy',
    description: 'Reduce hiring time and find the perfect candidates faster with data-driven insights.',
  },
];



export function LandingPage() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-[#1C1C1E] px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Know exactly what&apos;s standing between you and your dream job
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-[#9CA3AF] md:text-xl">
            Upload your resume, choose your target role, and get a detailed skill gap analysis with a personalized learning roadmap to close the gap.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-white text-[#1C1C1E] hover:bg-gray-200 sm:w-auto"
              onClick={() => navigate('auth')}
            >
              Get Started as Job Seeker
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white bg-transparent text-white hover:bg-white/10 sm:w-auto"
              onClick={() => navigate('auth')}
            >
              Post a Job as Recruiter
            </Button>
          </div>
        </div>
      </section>

      {/* Job Seekers Section */}
      <section className="bg-white px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-[#1C1C1E] mb-4">
            For Job Seekers
          </h2>
          <p className="text-center text-lg text-[#6B7280] mb-12 max-w-2xl mx-auto">
            Bridge the gap between where you are and where you want to be
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {seekerFeatures.map((feature) => (
              <Card key={feature.title} className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-[#1C1C1E]">{feature.title}</h3>
                  <p className="mt-3 text-[#6B7280]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiters Section */}
      <section className="bg-[#F5F5F5] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-[#1C1C1E] mb-4">
            For Recruiters
          </h2>
          <p className="text-center text-lg text-[#6B7280] mb-12 max-w-2xl mx-auto">
            Find the right candidates faster with skill-based matching and insights
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {recruiterFeatures.map((feature) => (
              <Card key={feature.title} className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-[#1C1C1E]">{feature.title}</h3>
                  <p className="mt-3 text-[#6B7280]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>







      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] bg-white px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-[#1C1C1E] mb-2">HireReady</h3>
              <p className="text-sm text-[#6B7280]">
                Bridging skill gaps and connecting talent with opportunity.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1C1C1E] mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('landing')}
                    className="text-sm text-[#6B7280] hover:text-[#1C1C1E] transition-colors"
                  >
                    Home
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1C1C1E] mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-[#6B7280] hover:text-[#1C1C1E] transition-colors">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#6B7280] hover:text-[#1C1C1E] transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1C1C1E] mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-[#6B7280] hover:text-[#1C1C1E] transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#E5E5E5] pt-8">
            <p className="text-center text-sm text-[#6B7280]">
              © 2026 HireReady. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
