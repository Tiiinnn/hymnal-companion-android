import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Hymn } from "@/data/hymns";

interface ShareHymnDialogProps {
  hymn: Hymn;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShareHymnDialog = ({ hymn, open, onOpenChange }: ShareHymnDialogProps) => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const shareHymn = async () => {
    setIsSharing(true);
    try {
      const hymnData = JSON.stringify(hymn, null, 2);
      const blob = new Blob([hymnData], { type: 'application/json' });
      const file = new File([blob], `${hymn.title.replace(/\s+/g, '_')}.hymn`, { type: 'application/json' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `Share ${hymn.title}`,
          text: `Check out this hymn: ${hymn.title}`,
          files: [file]
        });
        toast({
          title: "Hymn shared successfully",
          description: "The hymn has been shared.",
        });
      } else {
        // Fallback: download the file
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${hymn.title.replace(/\s+/g, '_')}.hymn`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: "File downloaded",
          description: "The hymn file has been downloaded. You can share it manually.",
        });
      }
    } catch (error) {
      console.error('Error sharing hymn:', error);
      toast({
        title: "Error sharing hymn",
        description: "There was a problem sharing the hymn.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
      onOpenChange(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      const hymnText = `${hymn.title}\nBy: ${hymn.author}\n\n${hymn.lyrics.join('\n\n')}`;
      await navigator.clipboard.writeText(hymnText);
      toast({
        title: "Copied to clipboard",
        description: "The hymn text has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error copying text",
        description: "Could not copy the hymn text.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share "{hymn.title}"
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Button
            onClick={shareHymn}
            disabled={isSharing}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isSharing ? "Sharing..." : "Share as File"}
          </Button>
          <Button
            variant="outline"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy Text
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};