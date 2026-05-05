import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkillBadge } from '@/components/skill-badge';
import { useJobs } from '@/hooks/use-jobs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ApplyDialog } from '@/components/seeker/apply-dialog';
import { 
  Search, 
  Clock, 
  Briefcase, 
  Globe, 
  GraduationCap, 
  Filter, 
  Loader2, 
  ChevronRight,
  X,
  SearchX
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function SeekerJobPostings() {
  const { allJobs, isLoading, fetchAllJobs, applyToJob, isApplying } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    title: [] as string[],
    experience_level: [] as string[],
    work_location: [] as string[],
    employment_type: [] as string[]
  });

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value) 
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      title: [],
      experience_level: [],
      work_location: [],
      employment_type: []
    });
  };

  const activeFilterCount = Object.values(filters).flat().length;

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.required_skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTitle = filters.title.length === 0 || 
        filters.title.some(t => job.title.toLowerCase().includes(t.toLowerCase()));

      const matchesExperience = filters.experience_level.length === 0 || 
        filters.experience_level.includes(job.experience_level);
      
      const matchesLocation = filters.work_location.length === 0 || 
        filters.work_location.includes(job.work_location);
      
      const matchesType = filters.employment_type.length === 0 || 
        filters.employment_type.includes(job.employment_type);

      return matchesSearch && matchesTitle && matchesExperience && matchesLocation && matchesType;
    });
  }, [allJobs, searchQuery, filters]);

  const selectedJob = useMemo(() => {
    return allJobs.find(j => j.id === selectedJobId) || (filteredJobs.length > 0 ? filteredJobs[0] : null);
  }, [allJobs, selectedJobId, filteredJobs]);

  useEffect(() => {
    if (!selectedJobId && filteredJobs.length > 0) {
      setSelectedJobId(filteredJobs[0].id);
    }
  }, [filteredJobs, selectedJobId]);

  const filterOptions = {
    title: [
      'Network Engineering',
      'Software Engineering',
      'Data Engineering',
      'Data Science & Analytics',
      'DevOps & Automation',
      'IT & Security',
      'Backend Engineering'
    ],
    experience_level: ['Junior Level', 'Senior Level'],
    work_location: ['Remote', 'Onsite', 'Hybrid'],
    employment_type: ['Full-time', 'Part-time', 'Internship', 'Contract']
  };

  const handleApply = async (file: File) => {
    if (selectedJob) {
      await applyToJob(selectedJob.id, file);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6 animate-liquid">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Find Your Next Role</h1>
          <p className="text-muted-foreground">Discover opportunities that match your skills and career goals</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex gap-4 items-center bg-card p-4 rounded-xl border border-border/50 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title, skills, or description..." 
            className="pl-10 border-none bg-muted/50 focus-visible:ring-sienna"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={activeFilterCount > 0 ? "secondary" : "outline"} className="gap-2 border-border/50 relative">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[450px] p-6 bg-card border-border shadow-2xl overflow-y-auto max-h-[80vh]" align="end">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-bold font-heading text-lg">Refine Results</h4>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs text-sienna hover:text-sienna/80 p-0">
                    Clear all
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Job Roles */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Briefcase className="h-3 w-3" />
                    Job Roles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.title.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleFilter('title', opt)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                          filters.title.includes(opt)
                            ? "bg-sienna border-sienna text-warm-white shadow-sm"
                            : "bg-muted/50 border-border/50 text-foreground hover:border-sienna/30"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <GraduationCap className="h-3 w-3" />
                    Experience Level
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.experience_level.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleFilter('experience_level', opt)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                          filters.experience_level.includes(opt)
                            ? "bg-sienna border-sienna text-warm-white shadow-sm"
                            : "bg-muted/50 border-border/50 text-foreground hover:border-sienna/30"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Location */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    Work Location
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.work_location.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleFilter('work_location', opt)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                          filters.work_location.includes(opt)
                            ? "bg-sienna border-sienna text-warm-white shadow-sm"
                            : "bg-muted/50 border-border/50 text-foreground hover:border-sienna/30"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Employment Type */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    Employment Type
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.employment_type.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleFilter('employment_type', opt)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                          filters.employment_type.includes(opt)
                            ? "bg-sienna border-sienna text-warm-white shadow-sm"
                            : "bg-muted/50 border-border/50 text-foreground hover:border-sienna/30"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground mr-2 font-medium">Active filters:</span>
          {Object.entries(filters).map(([key, values]) => 
            values.map(val => (
              <Badge 
                key={val} 
                variant="secondary" 
                onClick={() => toggleFilter(key as any, val)}
                className="gap-1 bg-muted/50 text-foreground border-border/50 px-2 py-1 cursor-pointer hover:bg-sienna/10 hover:border-sienna/30 transition-all group"
              >
                {val}
                <X className="h-3 w-3 text-muted-foreground group-hover:text-sienna" />
              </Badge>
            ))
          )}
        </div>
      )}

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-sienna" />
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-card rounded-2xl border border-dashed border-border p-12 animate-liquid">
          <div className="p-4 rounded-full bg-muted/30">
            <SearchX className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground font-heading">No Job Postings Found</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">
              We couldn't find any jobs matching your current filters or search query. Try adjusting your preferences.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="mt-4 border-sienna text-sienna hover:bg-sienna hover:text-warm-white"
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Left: Job List */}
          <div className="w-full md:w-[400px] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer group relative",
                  selectedJobId === job.id 
                    ? "border-sienna bg-sienna/5 shadow-md" 
                    : "border-border/50 bg-card hover:border-sienna/30 hover:shadow-sm"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={cn(
                    "font-bold font-heading truncate pr-4",
                    selectedJobId === job.id ? "text-sienna" : "text-foreground"
                  )}>
                    {job.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {job.work_location}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.employment_type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {job.required_skills.slice(0, 3).map(skill => (
                    <SkillBadge key={skill} skill={skill} variant="outlined" size="sm" />
                  ))}
                  {job.required_skills.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">+{job.required_skills.length - 3}</span>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-border/30 flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">
                    Posted {format(new Date(job.created_at), 'MMM dd')}
                  </span>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    selectedJobId === job.id ? "text-sienna translate-x-1" : "text-muted-foreground"
                  )} />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Job Detail View */}
          <div className="hidden md:flex flex-1 flex-col bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            {selectedJob ? (
              <>
                {/* Detail Header */}
                <div className="p-8 border-b border-border/50 bg-navbar text-navbar-foreground">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-sienna px-3 py-1 text-xs font-bold text-warm-white uppercase tracking-wider">
                        {selectedJob.employment_type}
                      </div>
                      <h2 className="text-3xl font-bold font-heading text-navbar-foreground">{selectedJob.title}</h2>
                      <div className="flex flex-wrap gap-6 text-navbar-foreground/80">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-sienna" />
                          <span className="capitalize">{selectedJob.work_location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-sienna" />
                          <span className="capitalize">{selectedJob.experience_level} Level</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-sienna" />
                          <span>Posted {format(new Date(selectedJob.created_at), 'MMMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-sienna text-warm-white hover:bg-sienna/90 px-10 font-bold shadow-lg shadow-black/20"
                      onClick={() => setIsApplyDialogOpen(true)}
                    >
                      Apply Now
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedJob.required_skills.map(skill => (
                      <SkillBadge key={skill} skill={skill} variant="filled" size="md" />
                    ))}
                  </div>
                </div>

                {/* Detail Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                  <section className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground font-heading">Role Description</h3>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {selectedJob.description}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground font-heading">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.required_skills.map(skill => (
                        <SkillBadge key={skill} skill={skill} variant="outlined" size="md" />
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground font-heading">Key Requirements</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Ability to work in a <span className="text-foreground font-medium capitalize">{selectedJob.work_location}</span> environment</li>
                      <li>Professional experience at a <span className="text-foreground font-medium capitalize">{selectedJob.experience_level}</span> level</li>
                    </ul>
                  </section>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center p-12 text-center text-muted-foreground">
                Select a job from the list to view full details.
              </div>
            )}
          </div>
        </div>
      )}

      {selectedJob && (
        <ApplyDialog
          isOpen={isApplyDialogOpen}
          onClose={() => setIsApplyDialogOpen(false)}
          jobTitle={selectedJob.title}
          onApply={handleApply}
          isApplying={isApplying}
        />
      )}
    </div>
  );
}
