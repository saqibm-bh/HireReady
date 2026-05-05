import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkillBadge } from '@/components/skill-badge';
import { useResume } from '@/hooks/use-resume';
import { useNavigation } from '@/lib/navigation-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, X, Search, Info, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function SeekerResume() {
  const { userData, refreshUser, navigate } = useNavigation();
  const { history, skills, isLoading, isUploading, uploadResume } = useResume();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState(userData?.target_role || '');

  // Sync targetRole with userData when it loads
  useEffect(() => {
    if (userData?.target_role) {
      setTargetRole(userData.target_role);
    }
  }, [userData?.target_role]);

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
    if (files?.[0] && files[0].type === 'application/pdf') {
      setSelectedFile(files[0]);
    } else {
      toast.error('Please upload a PDF file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0] && files[0].type === 'application/pdf') {
      setSelectedFile(files[0]);
    } else {
      toast.error('Please upload a PDF file');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !targetRole) return;
    try {
      await uploadResume(selectedFile, targetRole);
      setSelectedFile(null);
      await refreshUser(); // Fixed: Use refreshUser from navigation context
    } catch (error) {
      // Error is handled in the hook's toast
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sienna" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-liquid">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resume Upload</h1>
          <p className="mt-1 text-muted-foreground">
            Upload your resume to extract skills and analyze your job fit
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('seeker-gap-analysis')}
          className="border-sienna text-sienna hover:bg-sienna/10 cursor-pointer"
        >
          View Gap Analysis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
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
              {selectedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">Ready to analyze</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 cursor-pointer"
                    onClick={() => setSelectedFile(null)}
                    disabled={isUploading}
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
                    or click to browse (PDF only)
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </>
              )}
            </div>

            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Target Role <span className="text-sienna">*</span>
              </label>
              <Select value={targetRole} onValueChange={setTargetRole}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Select a target role" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Network Engineering',
                    'Software Engineering',
                    'Data Engineering',
                    'Data Science & Analytics',
                    'DevOps & Automation',
                    'IT & Security',
                    'Backend Engineering'
                  ].map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedFile || !targetRole || isUploading}
              onClick={handleAnalyze}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Analyze Resume'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Extracted Skills Section */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              Your Current Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {skills.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Unique skills extracted from your resume history:
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="filled" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Info className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm font-medium text-foreground">No skills extracted yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Upload your first resume to see your skill profile here.
                </p>
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
          {history.length > 0 ? (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:bg-muted/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-sienna/10 p-2">
                      <FileText className="h-5 w-5 text-sienna" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.filename || 'Unnamed Resume'}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                      {item.skills.length} skills
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-border rounded-lg">
              <Upload className="h-10 w-10 text-muted-foreground mb-4 opacity-20" />
              <p className="text-sm font-medium text-foreground">No resume history found</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your uploaded resumes will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
