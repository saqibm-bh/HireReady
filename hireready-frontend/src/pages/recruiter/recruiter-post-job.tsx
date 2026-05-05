import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, CheckCircle, Search, Loader2, Globe, Briefcase, GraduationCap } from 'lucide-react';
import { useJobs } from '@/hooks/use-jobs';
import { Input } from '@/components/ui/input';

export function RecruiterPostJob() {
  const { metadata, createJob, isCreating } = useJobs();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experience_level: '',
    work_location: '',
    employment_type: '',
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearch, setSkillSearch] = useState('');
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Filter skills based on search
  const filteredSkills = useMemo(() => {
    if (!metadata || !skillSearch) return [];
    return metadata.skills
      .filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()) && !selectedSkills.includes(s))
      .slice(0, 10);
  }, [metadata, skillSearch, selectedSkills]);

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkillSearch('');
      setShowSkillDropdown(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJob({
        ...formData,
        required_skills: selectedSkills
      });
      setSubmitted(true);
    } catch (err) {
      // Error handled by hook toasts
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center animate-liquid">
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
              onClick={() => {
                setSubmitted(false);
                setFormData({ 
                  title: '', 
                  description: '',
                  experience_level: '',
                  work_location: '',
                  employment_type: '',
                });
                setSelectedSkills([]);
              }}
            >
              Post Another Job
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isTitleSelected = !!formData.title;

  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Post a Job</h1>
        <p className="mt-1 text-muted-foreground">
          Create a new job posting and start receiving applications
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <Card className={`border-border/50 shadow-sm bg-card transition-opacity duration-300`}>
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
                <Select 
                  value={formData.title} 
                  onValueChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
                >
                  <SelectTrigger id="title" className="border-border bg-background">
                    <SelectValue placeholder="Select target role" />
                  </SelectTrigger>
                  <SelectContent>
                    {metadata?.roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className={`space-y-2 transition-all duration-500 ${!isTitleSelected ? 'opacity-40 pointer-events-none grayscale' : 'opacity-100'}`}>
                <Label htmlFor="description" className="text-foreground">
                  Job Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  className="min-h-[200px] border-border bg-background"
                  required={isTitleSelected}
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className={`space-y-6 transition-all duration-500 ${!isTitleSelected ? 'opacity-40 pointer-events-none grayscale' : 'opacity-100'}`}>
            <Card className="border-border/50 shadow-sm bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Requirements & Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 relative">
                  <Label className="text-foreground">Required Skills</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Search className="h-4 w-4" />
                    </div>
                    <Input
                      value={skillSearch}
                      onChange={(e) => {
                        setSkillSearch(e.target.value);
                        setShowSkillDropdown(true);
                      }}
                      onFocus={() => setShowSkillDropdown(true)}
                      placeholder="Search and add skills..."
                      className="pl-9 border-border bg-background"
                    />
                  </div>

                  {/* Searchable Dropdown */}
                  {showSkillDropdown && filteredSkills.length > 0 && (
                    <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-xl animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-1">
                        {filteredSkills.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            className="flex w-full items-center px-3 py-2 text-sm text-foreground hover:bg-sienna/10 hover:text-sienna rounded-sm transition-colors text-left"
                            onClick={() => addSkill(skill)}
                          >
                            <Plus className="mr-2 h-3 w-3" />
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected Skills Tags */}
                  <div className="mt-4 flex flex-wrap gap-2 min-h-[40px]">
                    {selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 rounded-full bg-sienna/10 px-3 py-1 text-sm text-sienna font-medium border border-sienna/20 animate-liquid"
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
                    {selectedSkills.length === 0 && (
                      <p className="text-xs text-muted-foreground italic">No skills added yet.</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Experience Level
                    </Label>
                    <Select 
                      value={formData.experience_level}
                      onValueChange={(val) => setFormData(prev => ({ ...prev, experience_level: val }))}
                    >
                      <SelectTrigger className="border-border bg-background">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Work Location
                    </Label>
                    <Select 
                      value={formData.work_location}
                      onValueChange={(val) => setFormData(prev => ({ ...prev, work_location: val }))}
                    >
                      <SelectTrigger className="border-border bg-background">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onsite">Onsite</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Employment Type
                    </Label>
                    <Select 
                      value={formData.employment_type}
                      onValueChange={(val) => setFormData(prev => ({ ...prev, employment_type: val }))}
                    >
                      <SelectTrigger className="border-border bg-background">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={
                isCreating || 
                !formData.title || 
                !formData.description || 
                !formData.experience_level ||
                !formData.work_location ||
                !formData.employment_type ||
                selectedSkills.length === 0
              }
              className="w-full bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer shadow-lg hover:shadow-sienna/20 transition-all disabled:opacity-50"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting Job...
                </>
              ) : (
                'Post Job'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
