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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Resume Upload</h1>
        <p className="mt-1 text-[#6B7280]">
          Upload your resume to extract skills and analyze your job fit
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
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
                  ? "border-[#2D2D2D] bg-[#F9FAFB]"
                  : "border-[#D1D5DB] hover:border-[#9CA3AF]"
              )}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-8 w-8 text-[#6B7280]" />
                  <div className="text-left">
                    <p className="font-medium text-[#1C1C1E]">{uploadedFile}</p>
                    <p className="text-sm text-[#6B7280]">Ready to analyze</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={() => setUploadedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-[#9CA3AF]" />
                  <p className="mt-4 text-sm font-medium text-[#1C1C1E]">
                    Drag and drop your resume here
                  </p>
                  <p className="mt-1 text-xs text-[#6B7280]">
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
              <label className="mb-2 block text-sm font-medium text-[#1C1C1E]">
                Target Role
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <Input
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="e.g., Senior Frontend Developer"
                  className="border-[#E5E5E5] bg-white pl-10"
                />
              </div>
              {showSuggestions && targetRole && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-[#E5E5E5] bg-white shadow-lg">
                  {filteredSuggestions.map((role) => (
                    <button
                      key={role}
                      className="w-full px-4 py-2 text-left text-sm text-[#1C1C1E] hover:bg-[#F3F4F6]"
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
              className="w-full bg-[#2D2D2D] text-white hover:bg-[#1C1C1E]"
              disabled={!uploadedFile || !targetRole}
              onClick={handleAnalyze}
            >
              Analyze Resume
            </Button>
          </CardContent>
        </Card>

        {/* Extracted Skills Section */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
              {analyzed ? 'Extracted Skills' : 'Your Current Skills'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyzed ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-lg bg-[#F3F4F6] p-3">
                  <CheckCircle className="h-5 w-5 text-[#2D2D2D]" />
                  <span className="text-sm text-[#1C1C1E]">
                    Analysis complete! Found {currentJobSeeker.currentSkills.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentJobSeeker.currentSkills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="filled" />
                  ))}
                </div>
                <div className="pt-4">
                  <h4 className="mb-2 text-sm font-medium text-[#1C1C1E]">
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
                <p className="text-sm text-[#6B7280]">
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
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1C1C1E]">
            Resume History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentJobSeeker.resumeHistory.map((resume, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-[#E5E5E5] bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#6B7280]" />
                  <div>
                    <p className="font-medium text-[#1C1C1E]">{resume.filename}</p>
                    <p className="text-sm text-[#6B7280]">{resume.date}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-[#E5E5E5]">
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
