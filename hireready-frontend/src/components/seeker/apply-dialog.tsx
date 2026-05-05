import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, Loader2 } from 'lucide-react';

interface ApplyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  onApply: (file: File) => Promise<void>;
  isApplying: boolean;
}

export function ApplyDialog({ isOpen, onClose, jobTitle, onApply, isApplying }: ApplyDialogProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleApply = async () => {
    if (file) {
      try {
        await onApply(file);
        setFile(null);
        onClose();
      } catch (err) {
        // Error handling is handled in the hook
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isApplying && !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Upload your resume to complete your application. Only PDF files are supported.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {!file ? (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border/50 rounded-2xl cursor-pointer hover:bg-muted/30 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="p-3 rounded-full bg-sienna/10 mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-sienna" />
                </div>
                <p className="mb-2 text-sm text-foreground font-medium">Click to upload your resume</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">PDF only (max 5MB)</p>
              </div>
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="p-4 rounded-xl bg-sienna/5 border border-sienna/20 flex items-center justify-between animate-liquid">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sienna/10">
                  <FileText className="h-5 w-5 text-sienna" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold truncate max-w-[200px]">{file.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={isApplying}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isApplying}>
            Cancel
          </Button>
          <Button 
            className="bg-sienna text-warm-white hover:bg-sienna/90 px-8 font-bold" 
            disabled={!file || isApplying}
            onClick={handleApply}
          >
            {isApplying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
