import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Globe, GraduationCap, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ApplicationResponse } from '@/services/job-service';
import { SkillBadge } from '@/components/skill-badge';

interface ApplicationDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  application: ApplicationResponse | null;
}

export function ApplicationDetailDialog({ isOpen, onClose, application }: ApplicationDetailDialogProps) {
  if (!application) return null;

  const { job } = application;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card border-border shadow-2xl custom-scrollbar">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sienna/10 text-sienna text-[10px] font-bold uppercase tracking-wider">
              {job.employment_type}
            </span>
          </div>
          <DialogTitle className="text-3xl font-bold font-heading">{job.title}</DialogTitle>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-sienna" />
              {job.work_location}
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-sienna" />
              {job.experience_level} Level
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-sienna" />
              Applied {format(new Date(application.applied_at), 'MMMM dd, yyyy')}
            </div>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-8">
          <section className="space-y-3">
            <h4 className="text-lg font-bold font-heading">Your Uploaded Resume</h4>
            <div className="p-4 rounded-xl border border-border bg-muted/30 flex items-center justify-between group hover:border-sienna/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sienna/10">
                  <FileText className="h-5 w-5 text-sienna" />
                </div>
                <div>
                  <p className="text-sm font-bold">Resume for Application</p>
                  <p className="text-[10px] text-muted-foreground">PDF Document</p>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="gap-2 border-sienna text-sienna hover:bg-sienna hover:text-warm-white">
                <a href={application.resume_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  View Resume
                </a>
              </Button>
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-lg font-bold font-heading">Job Description</h4>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm">
              {job.description}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-lg font-bold font-heading">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.required_skills.map(skill => (
                <SkillBadge key={skill} skill={skill} variant="outlined" size="md" />
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
