import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Hymn } from "@/data/hymns";

interface ImportHymnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportHymn: (hymn: Hymn) => void;
}

export const ImportHymnDialog = ({ open, onOpenChange, onImportHymn }: ImportHymnDialogProps) => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const hymnData = JSON.parse(text) as Hymn;
      
      // Validate the hymn data
      if (!hymnData.title || !hymnData.author || !Array.isArray(hymnData.lyrics)) {
        throw new Error("Invalid hymn file format");
      }

      // Generate new ID to avoid conflicts
      const newHymn = {
        ...hymnData,
        id: Date.now()
      };

      onImportHymn(newHymn);
      toast({
        title: "Hymn imported successfully",
        description: `"${newHymn.title}" has been added to your collection.`,
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error importing hymn:', error);
      toast({
        title: "Error importing hymn",
        description: "The file format is not valid or corrupted.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      // Reset the input
      event.target.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Hymn
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <FileText className="h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            Select a .hymn file to import into your collection
          </p>
          <input
            type="file"
            accept=".hymn,.json"
            onChange={handleFileUpload}
            className="hidden"
            id="hymn-file-input"
            disabled={isImporting}
          />
          <Button
            onClick={() => document.getElementById('hymn-file-input')?.click()}
            disabled={isImporting}
            className="w-full"
          >
            {isImporting ? "Importing..." : "Choose File"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};