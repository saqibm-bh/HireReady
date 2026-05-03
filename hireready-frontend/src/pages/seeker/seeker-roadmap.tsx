import { useState } from 'react';
import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRoadmap } from '@/hooks/use-roadmap';
import { useGapAnalysis } from '@/hooks/use-gap-analysis';
import { useResume } from '@/hooks/use-resume';
import { toast } from 'sonner';
import { Check, Circle, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SeekerRoadmap() {
  const { navigate } = useNavigation();
  const { data: roadmap, isLoading: isRoadmapLoading, error: roadmapError, completeStep } = useRoadmap();
  const { data: gapAnalysis, isLoading: isGapLoading } = useGapAnalysis();
  const { refreshData: refreshResumeData } = useResume();
  
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const handleToggleComplete = async (stepNumber: number) => {
    setIsUpdating(stepNumber);
    try {
      await completeStep(stepNumber);
      await refreshResumeData(); // Refresh skills on resume page
      toast.success("Step marked as complete! Your skills have been updated.");
    } catch (err) {
      toast.error("Failed to update step status.");
    } finally {
      setIsUpdating(null);
    }
  };

  const isLoading = isRoadmapLoading || isGapLoading;
  const error = roadmapError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sienna border-t-transparent" />
          <p className="text-muted-foreground animate-pulse">Retrieving your roadmap...</p>
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <h2 className="text-xl font-semibold text-foreground">No Roadmap Available</h2>
        <p className="text-muted-foreground text-center max-w-md">
          {error || "We need your gap analysis to generate a roadmap. Please upload your resume first."}
        </p>
        <Button onClick={() => navigate('seeker-resume')} className="bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer">
          Go to Resume Upload
        </Button>
      </div>
    );
  }

  const steps = roadmap.steps;
  const completedStepsCount = steps.filter(s => s.completed).length;
  const progress = Math.round((completedStepsCount / steps.length) * 100);

  return (
    <div className="space-y-6 animate-liquid">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('seeker-gap-analysis')}
          className="cursor-pointer hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Learning Roadmap</h1>
          <p className="mt-1 text-muted-foreground">
            Your personalized path to becoming a {gapAnalysis?.targetRole || 'Professional'}
          </p>
        </div>
      </div>

      {/* Progress Tracker */}
      <Card className="border-border/50 bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <p className="mt-1 text-muted-foreground">
                {completedStepsCount} of {steps.length} skills completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-sienna">{progress}%</p>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted/20">
            <div
              className="h-full rounded-full bg-sienna transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative space-y-0">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-border md:left-8" />

        {steps.map((item, index) => {
          const isCompleted = !!item.completed;
          
          // A step is active if it's the first one or if the previous one is completed
          const isPreviousCompleted = index === 0 || !!steps[index - 1].completed;
          const isActive = !isCompleted && isPreviousCompleted;
          const isLocked = !isCompleted && !isPreviousCompleted;

          return (
            <div key={item.step} className="relative pl-14 md:pl-20">
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-4 top-6 flex h-5 w-5 items-center justify-center rounded-full md:left-6 md:h-6 md:w-6 z-10 transition-colors",
                  isCompleted
                    ? "bg-sienna shadow-[0_0_10px_rgba(var(--sienna-rgb),0.5)]"
                    : isLocked
                      ? "border-2 border-muted bg-muted/50"
                      : "border-2 border-sienna bg-background"
                )}
              >
                {isCompleted ? (
                  <Check className="h-3 w-3 text-warm-white" />
                ) : (
                  <Circle className={cn(
                    "h-2 w-2",
                    isLocked ? "text-muted-foreground/30" : "text-sienna"
                  )} />
                )}
              </div>

              <Card className={cn(
                "mb-6 border-border/50 shadow-sm bg-card transition-all duration-300",
                isCompleted && "opacity-75 grayscale-[0.5]",
                isLocked && "opacity-50"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-xs font-bold uppercase tracking-wider",
                          isLocked ? "text-muted-foreground/50" : "text-sienna"
                        )}>
                          Step {item.step}
                        </span>
                        {isCompleted && (
                          <span className="rounded-full bg-sienna/10 px-2 py-0.5 text-xs text-sienna font-bold">
                            Done
                          </span>
                        )}
                        {isActive && (
                          <span className="rounded-full bg-sienna/10 px-2 py-0.5 text-xs text-sienna font-bold animate-pulse">
                            Current Task
                          </span>
                        )}
                      </div>
                      <CardTitle className={cn(
                        "mt-1 text-xl font-bold font-heading",
                        isLocked ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {item.skill}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-tight">Why it matters</h4>
                    <p className="text-sm leading-relaxed text-foreground/80">{item.why_it_matters}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Estimated time: {item.estimated_time}</span>
                  </div>

                  <Button
                    variant={isCompleted ? "outline" : "default"}
                    disabled={isLocked || isUpdating === item.step}
                    className={cn(
                      "w-full cursor-pointer transition-all duration-300",
                      isCompleted
                        ? "border-border text-foreground hover:bg-muted"
                        : "bg-sienna text-warm-white hover:bg-sienna/90 shadow-md hover:shadow-lg active:scale-[0.98]",
                      isLocked && "cursor-not-allowed grayscale bg-muted text-muted-foreground"
                    )}
                    onClick={() => handleToggleComplete(item.step)}
                  >
                    {isUpdating === item.step ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isCompleted ? (
                      "Completed"
                    ) : (
                      "Mark as Complete"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
