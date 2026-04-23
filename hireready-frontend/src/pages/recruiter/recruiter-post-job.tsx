import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, CheckCircle } from 'lucide-react';

export function RecruiterPostJob() {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md border-border/50 shadow-sm bg-card">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sienna">
              <CheckCircle className="h-8 w-8 text-warm-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-heading">Job Posted Successfully!</h2>
            <p className="mt-2 text-muted-foreground">
              Your job posting is now live and candidates can start applying.
            </p>
            <Button
              className="mt-6 bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer"
              onClick={() => setSubmitted(false)}
            >
              Post Another Job
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 liquid-stagger">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Post a Job</h1>
        <p className="mt-1 text-muted-foreground">
          Create a new job posting and start receiving applications
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <Card className="border-border/50 shadow-sm bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">
                  Job Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Frontend Developer"
                  className="border-border bg-background"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Job Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  className="min-h-[200px] border-border bg-background"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="border-border/50 shadow-sm bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Required Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Add a skill (e.g., React)"
                      className="border-border bg-background"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="shrink-0 border-border cursor-pointer hover:bg-muted"
                      onClick={addSkill}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 rounded-full bg-sienna/10 px-3 py-1 text-sm text-sienna font-medium border border-sienna/20"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-sienna/70 transition-colors cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Experience Level</Label>
                  <Select>
                    <SelectTrigger className="border-border bg-background">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="lead">Lead / Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Job Type</Label>
                  <Select>
                    <SelectTrigger className="border-border bg-background">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer"
            >
              Post Job
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
