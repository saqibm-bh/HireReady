import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { SkillBadge } from '@/components/skill-badge';
import { Filter, ArrowUpDown, Loader2, ExternalLink, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useJobs } from '@/hooks/use-jobs';
import { useApplicants } from '@/hooks/use-applicants';
import { format } from 'date-fns';

export function RecruiterApplicants() {
  const { postings, fetchMyPostings } = useJobs();
  const { applicants, isLoading, fetchApplicants } = useApplicants();
  
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [minMatchScore, setMinMatchScore] = useState([0]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchMyPostings();
    fetchApplicants();
  }, [fetchMyPostings, fetchApplicants]);

  // Set default selected job when postings load
  useEffect(() => {
    if (postings.length > 0 && selectedJob === 'all') {
      // Keep it as 'all' or pick first one? Let's stay 'all' to show everything by default
    }
  }, [postings, selectedJob]);

  const filteredApplicants = useMemo(() => {
    return applicants
      .filter((app) => (selectedJob === 'all' || app.job_id === selectedJob) && app.match_score >= minMatchScore[0])
      .sort((a, b) => sortOrder === 'desc' ? b.match_score - a.match_score : a.match_score - b.match_score);
  }, [applicants, selectedJob, minMatchScore, sortOrder]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-heading">Applicants</h1>
        <p className="mt-1 text-muted-foreground">
          Review and manage candidates for your job postings
        </p>
      </div>

      {/* Filters */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            {/* Job Selector */}
            <div className="flex-1 space-y-2">
              <label className="text-sm font-bold text-foreground uppercase tracking-wider">Job Posting</label>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="border-border bg-background cursor-pointer">
                  <SelectValue placeholder="All Postings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="cursor-pointer font-medium">All Postings</SelectItem>
                  {postings.map((job) => (
                    <SelectItem key={job.id} value={job.id} className="cursor-pointer">
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Match Score Filter */}
            <div className="w-full space-y-2 lg:w-64">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Min Match Score
                </label>
                <span className="text-sm text-sienna font-bold">{minMatchScore[0]}%</span>
              </div>
              <Slider
                value={minMatchScore}
                onValueChange={setMinMatchScore}
                max={100}
                step={5}
                className="py-2 cursor-pointer"
              />
            </div>

            {/* Sort Button */}
            <Button
              variant="outline"
              className="shrink-0 border-border text-foreground hover:bg-muted cursor-pointer font-bold"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            >
              <ArrowUpDown className="mr-2 h-4 w-4 text-sienna" />
              Sort: {sortOrder === 'desc' ? 'Highest' : 'Lowest'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applicants Table */}
      <Card className="border-border/50 shadow-sm bg-card overflow-hidden">
        <CardHeader className="pb-2 border-b border-border/50">
          <CardTitle className="flex items-center justify-between text-lg font-bold text-foreground font-heading">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-sienna" />
              {filteredApplicants.length} Applicants
            </div>
            {isLoading && <Loader2 className="h-5 w-5 animate-spin text-sienna" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex min-h-[40vh] items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-sienna" />
            </div>
          ) : filteredApplicants.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-3">
               <div className="p-4 bg-muted rounded-full">
                  <User className="h-8 w-8 text-muted-foreground" />
               </div>
              <p className="text-muted-foreground font-medium">No applicants match your criteria</p>
              <Button variant="link" onClick={() => { setSelectedJob('all'); setMinMatchScore([0]); }} className="text-sienna">
                 Clear all filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-6 py-4 text-left font-bold text-muted-foreground uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-4 text-left font-bold text-muted-foreground uppercase tracking-wider">Job Title</th>
                    <th className="px-6 py-4 text-center font-bold text-muted-foreground uppercase tracking-wider">Match Score</th>
                    <th className="px-6 py-4 text-left font-bold text-muted-foreground uppercase tracking-wider">Matched Skills</th>
                    <th className="px-6 py-4 text-left font-bold text-muted-foreground uppercase tracking-wider">Missing Skills</th>
                    <th className="px-6 py-4 text-left font-bold text-muted-foreground uppercase tracking-wider">Applied On</th>
                    <th className="px-6 py-4 text-center font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-center font-bold text-muted-foreground uppercase tracking-wider">Resume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredApplicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sienna/10 border border-sienna/20 shadow-inner">
                            <span className="text-xs font-black text-sienna">
                              {getInitials(applicant.seeker_name)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground group-hover:text-sienna transition-colors">
                              {applicant.seeker_name}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                               <Mail className="h-3 w-3" />
                               {applicant.seeker_email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="font-medium text-foreground">{applicant.job_title}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-bold shadow-sm",
                          applicant.match_score >= 80 ? "bg-sienna text-warm-white" :
                          applicant.match_score >= 60 ? "bg-slate text-warm-white" :
                          applicant.match_score >= 40 ? "bg-muted text-foreground border border-border" :
                          "bg-muted/50 text-muted-foreground"
                        )}>
                          {applicant.match_score}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {applicant.matched_skills.slice(0, 3).map((skill) => (
                            <SkillBadge key={skill} skill={skill} variant="filled" size="sm" />
                          ))}
                          {applicant.matched_skills.length > 3 && (
                            <span className="text-[10px] font-bold text-muted-foreground bg-muted rounded px-1 flex items-center">
                              +{applicant.matched_skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {applicant.missing_skills.slice(0, 2).map((skill) => (
                            <SkillBadge key={skill} skill={skill} variant="outlined" size="sm" />
                          ))}
                          {applicant.missing_skills.length > 2 && (
                            <span className="text-[10px] font-bold text-muted-foreground">
                              +{applicant.missing_skills.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground font-medium">
                         {format(new Date(applicant.applied_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={cn(
                          "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-tighter border",
                          applicant.status === 'shortlisted' ? "bg-sienna/10 text-sienna border-sienna/30" :
                          applicant.status === 'applied' ? "bg-slate/10 text-slate border-slate/30" :
                          "bg-muted text-muted-foreground border-border"
                        )}>
                          {applicant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                         <a 
                            href={applicant.resume_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-sienna/10 text-muted-foreground hover:text-sienna transition-all"
                         >
                            <ExternalLink className="h-4 w-4" />
                         </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
