import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkillBadge } from '@/components/skill-badge';
import { currentJobSeeker, suggestedRoles } from '@/lib/mock-data';
import { Upload, FileText, X, Search, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SeekerResume() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files?.[0]) {
      setUploadedFile(files[0].name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setUploadedFile(files[0].name);
    }
  };

  const filteredSuggestions = suggestedRoles.filter((role) =>
    role.toLowerCase().includes(targetRole.toLowerCase())
  );

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Resume Upload</h1>
        <p className="mt-1 text-muted-foreground">
          Upload your resume to extract skills and analyze your job fit
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              Upload Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Drag and Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "relative rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                dragActive
                  ? "border-sienna bg-sienna/5"
                  : "border-border hover:border-muted-foreground"
              )}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{uploadedFile}</p>
                    <p className="text-sm text-muted-foreground">Ready to analyze</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 cursor-pointer"
                    onClick={() => setUploadedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium text-foreground">
                    Drag and drop your resume here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    or click to browse (PDF, DOC, DOCX)
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </>
              )}
            </div>

            {/* Target Role Input */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Target Role
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="e.g., Senior Frontend Developer"
                  className="border-border bg-background pl-10"
                />
              </div>
              {showSuggestions && targetRole && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-card shadow-lg overflow-hidden">
                  {filteredSuggestions.map((role) => (
                    <button
                      key={role}
                      className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => {
                        setTargetRole(role);
                        setShowSuggestions(false);
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              className="w-full bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer disabled:opacity-50"
              disabled={!uploadedFile || !targetRole}
              onClick={handleAnalyze}
            >
              Analyze Resume
            </Button>
          </CardContent>
        </Card>

        {/* Extracted Skills Section */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              {analyzed ? 'Extracted Skills' : 'Your Current Skills'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyzed ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                  <CheckCircle className="h-5 w-5 text-sienna" />
                  <span className="text-sm text-foreground">
                    Analysis complete! Found {currentJobSeeker.currentSkills.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentJobSeeker.currentSkills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="filled" />
                  ))}
                </div>
                <div className="pt-4">
                  <h4 className="mb-2 text-sm font-medium text-foreground">
                    Additional skills detected:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge skill="Problem Solving" variant="outlined" />
                    <SkillBadge skill="Team Collaboration" variant="outlined" />
                    <SkillBadge skill="Agile/Scrum" variant="outlined" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  These are the skills from your most recent resume:
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentJobSeeker.currentSkills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="filled" />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resume History */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Resume History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentJobSeeker.resumeHistory.map((resume, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:bg-muted/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{resume.filename}</p>
                    <p className="text-sm text-muted-foreground">{resume.date}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted cursor-pointer">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
