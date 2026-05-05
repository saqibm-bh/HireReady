import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SkillBadge } from '@/components/skill-badge';
import { useResume } from '@/hooks/use-resume';
import { useNavigation } from '@/lib/navigation-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, X, Search, Info, Loader2, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { format } from 'date-fns';

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
      await refreshUser();
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
          <h1 className="text-2xl font-bold text-foreground font-heading">Resume Upload</h1>
          <p className="mt-1 text-muted-foreground">
            Upload your resume to extract skills and analyze your job fit
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('seeker-gap-analysis')}
          className="border-sienna text-sienna hover:bg-sienna/10 cursor-pointer font-bold shadow-sm"
        >
          View Gap Analysis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <Card className="border-border/50 shadow-sm bg-card overflow-hidden">
          <CardHeader className="pb-2 border-b border-border/50">
            <CardTitle className="text-lg font-bold text-foreground font-heading flex items-center gap-2">
              <Upload className="h-5 w-5 text-sienna" />
              Upload Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "relative rounded-xl border-2 border-dashed p-10 text-center transition-all",
                dragActive
                  ? "border-sienna bg-sienna/5 scale-[0.98]"
                  : "border-border hover:border-sienna/50 hover:bg-muted/30"
              )}
            >
              {selectedFile ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-sienna/10 p-3 rounded-lg">
                    <FileText className="h-8 w-8 text-sienna" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-foreground truncate max-w-[200px]">{selectedFile.name}</p>
                    <p className="text-xs text-sienna font-bold">Ready for analysis</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer hover:bg-red-50 hover:text-red-500 rounded-full"
                    onClick={() => setSelectedFile(null)}
                    disabled={isUploading}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mx-auto h-16 w-16 bg-sienna/5 rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-sienna" />
                  </div>
                  <p className="text-sm font-bold text-foreground">
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

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground uppercase tracking-widest">
                Target Role <span className="text-sienna font-black">*</span>
              </label>
              <Select value={targetRole} onValueChange={setTargetRole}>
                <SelectTrigger className="w-full bg-background border-border h-11 focus:ring-sienna">
                  <SelectValue placeholder="Select your target career path" />
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
                    <SelectItem key={role} value={role} className="font-medium">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer h-12 font-bold text-lg shadow-lg hover:shadow-sienna/20 transition-all disabled:opacity-50"
              disabled={!selectedFile || !targetRole || isUploading}
              onClick={handleAnalyze}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Extracting Skills...
                </>
              ) : (
                'Analyze Resume'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Extracted Skills Section */}
        <Card className="border-border/50 shadow-sm bg-card overflow-hidden">
          <CardHeader className="pb-2 border-b border-border/50">
            <CardTitle className="text-lg font-bold text-foreground font-heading flex items-center gap-2">
              <Info className="h-5 w-5 text-sienna" />
              Your Skill Inventory
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {skills.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-medium">
                  We've successfully extracted these {skills.length} skills from your resume history:
                </p>
                <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  {skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="filled" size="md" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-sienna/5 p-4">
                  <Search className="h-8 w-8 text-sienna/40" />
                </div>
                <p className="mt-4 text-sm font-bold text-foreground">No skills extracted yet</p>
                <p className="mt-1 text-xs text-muted-foreground max-w-[200px]">
                  Upload your first resume to see your professional skill profile here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resume History */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-foreground font-heading">
            Resume History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="grid gap-3 grid-cols-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:border-sienna/30 transition-all group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="rounded-lg bg-sienna/10 p-2 shrink-0">
                      <FileText className="h-5 w-5 text-sienna" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-foreground truncate group-hover:text-sienna transition-colors">
                         Resume - {format(new Date(item.created_at), 'MMM dd, yyyy')}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{format(new Date(item.created_at), 'p')}</span>
                        <span>•</span>
                        <span className="font-bold text-sienna/70">{item.skills.length} skills</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                     <a 
                        href={item.filename || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-sienna/10 text-muted-foreground hover:text-sienna transition-all"
                        title="View Resume"
                     >
                        <ExternalLink className="h-4 w-4" />
                     </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-border rounded-xl bg-muted/10">
              <Upload className="h-10 w-10 text-muted-foreground/20 mb-4" />
              <p className="text-sm font-bold text-foreground">No history yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your analyzed resumes will be archived here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
