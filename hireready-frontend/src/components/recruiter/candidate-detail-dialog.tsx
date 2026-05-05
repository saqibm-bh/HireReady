import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Mail, Calendar, ExternalLink, User, Target, TrendingUp, Info } from 'lucide-react';
import { format } from 'date-fns';
import { JobApplicantResponse } from '@/lib/types/job';
import { SkillBadge } from '@/components/skill-badge';

interface CandidateDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: JobApplicantResponse | null;
}

export function CandidateDetailDialog({ isOpen, onClose, applicant }: CandidateDetailDialogProps) {
  if (!applicant) return null;

  const initials = applicant.seeker_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card border-border shadow-2xl custom-scrollbar p-0">
        <div className="relative">
           {/* Header Banner */}
           <div className="bg-sienna/5 h-32 w-full border-b border-border/50" />
           
           <div className="px-8 pb-8">
              {/* Profile Header Overlay */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12 mb-8">
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-card border-4 border-card shadow-xl overflow-hidden ring-4 ring-sienna/10">
                   <div className="flex h-full w-full items-center justify-center bg-sienna/10">
                      <span className="text-4xl font-black text-sienna">{initials}</span>
                   </div>
                </div>
                <div className="flex-1 text-center md:text-left pb-2">
                  <h2 className="text-3xl font-black text-foreground font-heading tracking-tight">
                    {applicant.seeker_name}
                  </h2>
                  <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/30 px-3 py-1 rounded-full text-sm">
                      <Mail className="h-4 w-4" />
                      {applicant.seeker_email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Application Info */}
                <div className="space-y-6">
                  <section>
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Target className="h-4 w-4 text-sienna" />
                       Application Details
                    </h4>
                    <Card className="bg-muted/30 border-border/50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                         <span className="text-sm text-muted-foreground">Applied For</span>
                         <span className="text-sm font-bold text-foreground">{applicant.job_title}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm text-muted-foreground">Applied Date</span>
                         <span className="text-sm font-bold text-foreground">
                            {format(new Date(applicant.applied_at), 'MMMM dd, yyyy')}
                         </span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm text-muted-foreground">Match Accuracy</span>
                         <span className="text-sm font-black text-sienna">{applicant.match_score}%</span>
                      </div>
                    </Card>
                  </section>

                  <section>
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                       <FileText className="h-4 w-4 text-sienna" />
                       Resume Document
                    </h4>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background group hover:border-sienna/30 transition-all">
                       <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-sienna" />
                          <span className="text-sm font-bold">PDF Resume</span>
                       </div>
                       <Button asChild variant="ghost" size="sm" className="hover:bg-sienna/10 text-sienna">
                          <a href={applicant.resume_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                             View <ExternalLink className="h-3 w-3" />
                          </a>
                       </Button>
                    </div>
                  </section>
                </div>

                {/* Skill Analysis */}
                <div className="space-y-6">
                  <section>
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                       <TrendingUp className="h-4 w-4 text-sienna" />
                       Skill Matching
                    </h4>
                    <div className="space-y-4">
                       <div>
                          <p className="text-xs font-bold text-green-600 mb-2 uppercase tracking-tighter">Matched Skills ({applicant.matched_skills.length})</p>
                          <div className="flex flex-wrap gap-1.5">
                             {applicant.matched_skills.length > 0 ? (
                               applicant.matched_skills.map(s => (
                                 <SkillBadge key={s} skill={s} variant="filled" size="sm" />
                               ))
                             ) : (
                               <p className="text-xs text-muted-foreground italic">No matching skills found.</p>
                             )}
                          </div>
                       </div>
                       <div>
                          <p className="text-xs font-bold text-sienna mb-2 uppercase tracking-tighter">Missing Skills ({applicant.missing_skills.length})</p>
                          <div className="flex flex-wrap gap-1.5">
                             {applicant.missing_skills.length > 0 ? (
                               applicant.missing_skills.map(s => (
                                 <SkillBadge key={s} skill={s} variant="outlined" size="sm" />
                               ))
                             ) : (
                               <p className="text-xs text-green-600 font-bold italic">Perfect Match! No skills missing.</p>
                             )}
                          </div>
                       </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 flex justify-end">
                 <Button onClick={onClose} variant="outline" className="font-bold border-border hover:bg-muted">
                    Close Profile
                 </Button>
              </div>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
