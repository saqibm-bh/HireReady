import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SkillBadge } from '@/components/skill-badge';
import { JobResponse } from '@/lib/types/job';
import { 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  FileText,
  MapPin,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

interface JobDetailDialogProps {
  job: JobResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobDetailDialog({ job, isOpen, onClose }: JobDetailDialogProps) {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-4 bg-navbar text-navbar-foreground">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-sienna px-3 py-1 text-xs font-bold text-warm-white uppercase tracking-wider">
              {job.employment_type}
            </div>
            <DialogTitle className="text-3xl font-bold font-heading text-navbar-foreground">
              {job.title}
            </DialogTitle>
            <div className="flex flex-wrap gap-6 text-navbar-foreground/80">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-sienna" />
                <span className="capitalize">{job.work_location}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-sienna" />
                <span className="capitalize">
                  {job.experience_level === 'junior' ? 'Junior Level' : 
                   job.experience_level === 'senior' ? 'Senior Level' : 
                   `${job.experience_level} Level`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-sienna" />
                <span>Posted {format(new Date(job.created_at), 'MMMM dd, yyyy')}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 pt-6 space-y-8 overflow-y-auto max-h-[60vh] custom-scrollbar bg-card">
          {/* Skills Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-foreground font-heading flex items-center gap-2">
              <FileText className="h-5 w-5 text-sienna" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.required_skills.map(skill => (
                <SkillBadge key={skill} skill={skill} variant="filled" size="md" />
              ))}
            </div>
          </section>

          {/* Description Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-foreground font-heading">Job Description</h3>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm border-l-2 border-sienna/20 pl-4">
              {job.description}
            </div>
          </section>

          {/* Additional Info */}
          <section className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
             <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase">Work Arrangement</p>
                <div className="flex items-center gap-2 text-sm text-foreground">
                   <MapPin className="h-4 w-4 text-sienna" />
                   <span className="capitalize">{job.work_location}</span>
                </div>
             </div>
             <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase">Employment Status</p>
                <div className="flex items-center gap-2 text-sm text-foreground">
                   <Clock className="h-4 w-4 text-sienna" />
                   <span className="capitalize">{job.employment_type}</span>
                </div>
             </div>
          </section>
        </div>

        <div className="p-6 bg-muted/30 border-t border-border flex justify-end">
          <Button onClick={onClose} variant="outline" className="border-border text-foreground hover:bg-muted">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
