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
  const [isExporting, setIsExporting] = useState(false);

  const exportHymnFile = async () => {
    setIsExporting(true);
    try {
      // Create a clean hymn object for export (remove any UI-specific properties)
      const hymnForExport = {
        id: hymn.id,
        number: hymn.number,
        title: hymn.title,
        author: hymn.author,
        firstLine: hymn.firstLine,
        category: hymn.category,
        lyrics: hymn.lyrics,
        keySignature: hymn.keySignature,
        musicSheetUrl: hymn.musicSheetUrl
      };

      // Convert hymn data to JSON string with proper formatting
      const hymnData = JSON.stringify(hymnForExport, null, 2);
      
      // Create a blob with the hymn data
      const blob = new Blob([hymnData], { 
        type: 'application/json'
      });
      
      // Create a safe filename by removing special characters
      const safeTitle = hymn.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
      const fileName = `${safeTitle}.hymn`;

      // Create download link and trigger download
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = fileName;
      downloadLink.style.display = 'none';
      
      // Add to DOM, click, and remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
      
      toast({
        title: "Hymn exported successfully",
        description: `"${fileName}" has been saved to your device and is ready to share.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error exporting hymn:', error);
      toast({
        title: "Export failed",
        description: "There was a problem creating the hymn file.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const copyHymnText = async () => {
    try {
      const hymnText = `${hymn.title}\nBy: ${hymn.author}\nCategory: ${hymn.category}\n\n${hymn.lyrics.join('\n\n')}`;
      await navigator.clipboard.writeText(hymnText);
      toast({
        title: "Copied to clipboard",
        description: "The hymn text has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy the hymn text to clipboard.",
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
        <div className="flex flex-col gap-3 py-4">
          <Button
            onClick={exportHymnFile}
            disabled={isExporting}
            className="flex items-center gap-2"
            variant="hymnal"
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Creating file..." : "Export as .hymn file"}
          </Button>
          <Button
            variant="outline"
            onClick={copyHymnText}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy lyrics to clipboard
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            The .hymn file can be shared and imported into other devices running this app.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};