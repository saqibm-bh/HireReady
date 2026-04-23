import { useNavigation } from '@/lib/navigation-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';

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





const roles = ["dream job", "career move", "tech role", "perfect match", "next step"];

export function LandingPage() {
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background animate-liquid">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navbar px-4 pt-20 pb-56 md:px-6 md:pt-32 md:pb-80">
        {/* Bridge Illustration */}
        <div className="absolute bottom-0 left-0 right-0 opacity-30 pointer-events-none select-none">
          <img
            src={theme === 'dark' ? '/assets/images/hero_bridge_dark.png' : '/assets/images/hero_bridge_light.png'}
            alt="Bridge illustration"
            className="w-full h-auto block"
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center animate-liquid -mt-12 md:-mt-20">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-cloud md:text-5xl lg:text-6xl">
            Know exactly what&apos;s standing between you and your
            <div className="mt-2 h-[1.2em] overflow-hidden">
              <span
                key={roles[roleIndex]}
                className="inline-block text-sienna animate-ticker"
              >
                {roles[roleIndex]}
              </span>
            </div>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-navbar-foreground/80 md:text-xl">
            Upload your resume, choose your target role, and get a detailed skill gap analysis with a personalized learning roadmap to close the gap.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-16">
            <Button
              size="lg"
              className="w-full bg-sienna text-warm-white hover:bg-sienna/90 sm:w-auto"
              onClick={() => navigate('auth', { mode: 'signup', role: 'job-seeker' })}
            >
              Get Started as Job Seeker
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`w-full border-mist bg-transparent sm:w-auto ${theme === 'dark' ? 'border-mist text-mist hover:bg-mist/10' : 'border-graphite text-warm-white hover:bg-graphite/5'}`}
              onClick={() => navigate('auth', { mode: 'signup', role: 'recruiter' })}
            >
              Post a Job as Recruiter
            </Button>
          </div>
        </div>
      </section>

      {/* Job Seekers Section */}
      <section className="bg-background px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-foreground mb-4 font-heading">
            For Job Seekers
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Bridge the gap between where you are and where you want to be
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {seekerFeatures.map((feature) => (
              <Card key={feature.title} className="glass-panel">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-card-foreground font-heading">{feature.title}</h3>
                  <p className="mt-3 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiters Section */}
      <section className="bg-muted/30 px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-foreground mb-4 font-heading">
            For Recruiters
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Find the right candidates faster with skill-based matching and insights
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {recruiterFeatures.map((feature) => (
              <Card key={feature.title} className="glass-panel">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-card-foreground font-heading">{feature.title}</h3>
                  <p className="mt-3 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>







      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/50 px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold text-foreground mb-2 font-heading">HireReady</h3>
              <p className="text-sm text-muted-foreground">
                Bridging skill gaps and connecting talent with opportunity.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 font-heading">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('landing')}
                    className="text-sm text-muted-foreground hover:text-sienna transition-colors"
                  >
                    Home
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 font-heading">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-sienna transition-colors">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-sienna transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 font-heading">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-sienna transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2026 HireReady. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
