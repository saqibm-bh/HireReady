import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { learningRoadmap } from '@/lib/mock-data';
import { Check, Circle, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SeekerRoadmap() {
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const [expandedSkills, setExpandedSkills] = useState<string[]>([learningRoadmap[0].skill]);

  const toggleComplete = (skill: string) => {
    setCompletedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleExpand = (skill: string) => {
    setExpandedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const progress = Math.round((completedSkills.length / learningRoadmap.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Learning Roadmap</h1>
        <p className="mt-1 text-[#6B7280]">
          Your personalized path to becoming a Senior Frontend Developer
        </p>
      </div>

      {/* Progress Tracker */}
      <Card className="border-none bg-[#2D2D2D] text-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <p className="mt-1 text-[#9CA3AF]">
                {completedSkills.length} of {learningRoadmap.length} skills completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-sm text-[#9CA3AF]">Complete</p>
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#4B5563]">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative space-y-0">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-[#E5E5E5] md:left-8" />

        {learningRoadmap.map((item, index) => {
          const isCompleted = completedSkills.includes(item.skill);
          const isExpanded = expandedSkills.includes(item.skill);

          return (
            <div key={item.skill} className="relative pl-14 md:pl-20">
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-4 top-6 flex h-5 w-5 items-center justify-center rounded-full md:left-6 md:h-6 md:w-6",
                  isCompleted
                    ? "bg-[#2D2D2D]"
                    : "border-2 border-[#D1D5DB] bg-white"
                )}
              >
                {isCompleted ? (
                  <Check className="h-3 w-3 text-white" />
                ) : (
                  <Circle className="h-2 w-2 text-[#9CA3AF]" />
                )}
              </div>

              <Card className={cn(
                "mb-4 border-none shadow-sm transition-all",
                isCompleted && "opacity-75"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#6B7280]">
                          Step {index + 1}
                        </span>
                        {isCompleted && (
                          <span className="rounded-full bg-[#2D2D2D] px-2 py-0.5 text-xs text-white">
                            Completed
                          </span>
                        )}
                      </div>
                      <CardTitle className="mt-1 text-lg font-semibold text-[#1C1C1E]">
                        {item.skill}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(item.skill)}
                      className="shrink-0"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-[#1C1C1E]">Why it matters</h4>
                      <p className="mt-1 text-sm text-[#6B7280]">{item.whyItMatters}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Clock className="h-4 w-4" />
                      <span>Estimated time: {item.estimatedTime}</span>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm font-medium text-[#1C1C1E]">Resources</h4>
                      <div className="space-y-2">
                        {item.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            className="flex items-center justify-between rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm text-[#1C1C1E] hover:bg-[#F9FAFB]"
                          >
                            <span>{resource.title}</span>
                            <ExternalLink className="h-4 w-4 text-[#6B7280]" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant={isCompleted ? "outline" : "default"}
                      className={cn(
                        "w-full",
                        isCompleted
                          ? "border-[#E5E5E5] text-[#1C1C1E]"
                          : "bg-[#2D2D2D] text-white hover:bg-[#1C1C1E]"
                      )}
                      onClick={() => toggleComplete(item.skill)}
                    >
                      {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                    </Button>
                  </CardContent>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
