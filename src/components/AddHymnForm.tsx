import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import { categories } from "@/data/hymns";
import { useToast } from "@/hooks/use-toast";

interface AddHymnFormProps {
  onAddHymn: (hymn: {
    title: string;
    author: string;
    category: string;
    lyrics: string[];
    keySignature?: string;
    musicSheetUrl?: string;
  }) => void;
}

export const AddHymnForm = ({ onAddHymn }: AddHymnFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [lyrics, setLyrics] = useState([""]);
  const [keySignature, setKeySignature] = useState("");
  const [musicSheetUrl, setMusicSheetUrl] = useState("");
  const [musicSheetFile, setMusicSheetFile] = useState<File | null>(null);
  const { toast } = useToast();

  const addVerse = () => {
    setLyrics([...lyrics, ""]);
  };

  const removeVerse = (index: number) => {
    if (lyrics.length > 1) {
      setLyrics(lyrics.filter((_, i) => i !== index));
    }
  };

  const updateVerse = (index: number, value: string) => {
    const newLyrics = [...lyrics];
    newLyrics[index] = value;
    setLyrics(newLyrics);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setMusicSheetFile(file);
        // Create a local URL for preview
        const url = URL.createObjectURL(file);
        setMusicSheetUrl(url);
        toast({
          title: "Music Sheet Added",
          description: "Music sheet image has been uploaded successfully.",
        });
      } else {
        toast({
          title: "Invalid File",
          description: "Please select an image file for the music sheet.",
          variant: "destructive",
        });
      }
    }
  };

  const removeMusicSheet = () => {
    setMusicSheetFile(null);
    setMusicSheetUrl("");
    toast({
      title: "Music Sheet Removed",
      description: "Music sheet has been removed.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !author.trim() || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const filteredLyrics = lyrics.filter(verse => verse.trim());
    if (filteredLyrics.length === 0) {
      toast({
        title: "Missing Lyrics",
        description: "Please add at least one verse.",
        variant: "destructive",
      });
      return;
    }
    
    onAddHymn({
      title: title.trim(),
      author,
      category,
      lyrics: filteredLyrics,
      keySignature: keySignature.trim() || undefined,
      musicSheetUrl: musicSheetUrl.trim() || undefined,
    });

    // Reset form
    setTitle("");
    setAuthor("");
    setCategory("");
    setLyrics([""]);
    setKeySignature("");
    setMusicSheetUrl("");
    setMusicSheetFile(null);

    toast({
      title: "Hymn Added",
      description: `"${title}" has been added to your collection.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-hymnal-cream to-hymnal-parchment">
      <header className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-hymnal-burgundy/20 px-4 py-3 safe-area-top z-50">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-hymnal-burgundy">Add New Hymn</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 py-6 pb-24">
        <Card className="border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-hymnal-burgundy flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Hymn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter hymn title"
                    className="bg-card/50 border-hymnal-burgundy/20 focus:border-hymnal-burgundy"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                    className="bg-card/50 border-hymnal-burgundy/20 focus:border-hymnal-burgundy"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="bg-card/50 border-hymnal-burgundy/20 focus:border-hymnal-burgundy">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== "All").map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="keySignature">Key Signature (Optional)</Label>
                  <Input
                    id="keySignature"
                    value={keySignature}
                    onChange={(e) => setKeySignature(e.target.value)}
                    placeholder="e.g., G Major, C Minor"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Verses *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addVerse}>
                    <Plus className="h-4 w-4" />
                    Add Verse
                  </Button>
                </div>
                <div className="space-y-4">
                  {lyrics.map((verse, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm font-medium">Verse {index + 1}</Label>
                        {lyrics.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeVerse(index)}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <Textarea
                        value={verse}
                        onChange={(e) => updateVerse(index, e.target.value)}
                        placeholder={`Enter verse ${index + 1} lyrics...`}
                        className="min-h-[120px] bg-card/50 border-hymnal-burgundy/20 focus:border-hymnal-burgundy font-serif resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="musicSheet">Music Sheet (Optional)</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <label htmlFor="musicSheetFile" className="flex-1">
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-hymnal-burgundy/30 rounded-lg cursor-pointer hover:border-hymnal-burgundy/50 transition-colors">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-hymnal-burgundy mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {musicSheetFile ? musicSheetFile.name : "Click to upload music sheet"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG, PDF up to 10MB</p>
                        </div>
                      </div>
                      <input
                        id="musicSheetFile"
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {musicSheetFile && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={removeMusicSheet}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {musicSheetUrl && (
                    <div className="mt-2">
                      {musicSheetFile?.type === 'application/pdf' ? (
                        <div className="w-full max-w-md bg-gray-100 rounded-lg p-4 text-center">
                          <p className="text-sm text-muted-foreground">PDF Preview: {musicSheetFile.name}</p>
                        </div>
                      ) : (
                        <img 
                          src={musicSheetUrl} 
                          alt="Music sheet preview"
                          className="w-full max-w-md rounded-lg shadow-soft"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" variant="hymnal" className="w-full">
                <Plus className="h-4 w-4" />
                Add Hymn
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};