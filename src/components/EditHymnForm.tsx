import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Save, X } from "lucide-react";
import { categories, Hymn } from "@/data/hymns";
import { useToast } from "@/hooks/use-toast";

interface EditHymnFormProps {
  hymn: Hymn;
  onSave: (hymn: Hymn) => void;
  onCancel: () => void;
}

export const EditHymnForm = ({ hymn, onSave, onCancel }: EditHymnFormProps) => {
  const [title, setTitle] = useState(hymn.title);
  const [author, setAuthor] = useState(hymn.author);
  const [category, setCategory] = useState(hymn.category);
  const [tune, setTune] = useState(hymn.tune || "");
  const [lyrics, setLyrics] = useState(hymn.lyrics.join('\n\n'));
  const [musicSheetUrl, setMusicSheetUrl] = useState(hymn.musicSheetUrl || "");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !author.trim() || !category || !lyrics.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Split lyrics by double line breaks to create verses
    const lyricsArray = lyrics.split('\n\n').filter(verse => verse.trim());
    
    const updatedHymn: Hymn = {
      ...hymn,
      title: title.trim(),
      author: author.trim(),
      category,
      lyrics: lyricsArray,
      tune: tune.trim() || undefined,
      firstLine: lyricsArray[0]?.split('\n')[0] || "",
      musicSheetUrl: musicSheetUrl.trim() || undefined,
    };

    onSave(updatedHymn);

    toast({
      title: "Hymn Updated",
      description: `"${title}" has been updated successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-hymnal-cream to-hymnal-parchment">
      <header className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-hymnal-burgundy/20 px-4 py-3 safe-area-top">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-hymnal-burgundy">
            Edit Hymn
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 py-6 pb-24">
        <Card className="border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-hymnal-burgundy flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Hymn Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter hymn title"
                    className="bg-card/50 border-hymnal-burgundy/20 focus:border-hymnal-burgundy"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                    className="bg-card/50 border-hymnal-burgundy/20 focus:border-hymnal-burgundy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
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
                <div className="space-y-2">
                  <Label htmlFor="tune">Tune (Optional)</Label>
                  <Input
                    id="tune"
                    value={tune}
                    onChange={(e) => setTune(e.target.value)}
                    placeholder="Enter tune name"
                    className="bg-card/50 border-hymnal-burgundy/20 focus:border-hymnal-burgundy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lyrics">Lyrics *</Label>
                <Textarea
                  id="lyrics"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  placeholder="Enter hymn lyrics. Separate verses with double line breaks (press Enter twice)."
                  className="min-h-[200px] bg-card/50 border-hymnal-burgundy/20 focus:border-hymnal-burgundy font-serif"
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Separate each verse with a blank line for proper formatting.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="musicSheet">Music Sheet URL (Optional)</Label>
                  {musicSheetUrl && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setMusicSheetUrl("")}
                    >
                      Remove Sheet
                    </Button>
                  )}
                </div>
                <Input
                  id="musicSheet"
                  type="url"
                  value={musicSheetUrl}
                  onChange={(e) => setMusicSheetUrl(e.target.value)}
                  placeholder="Enter URL for music sheet image"
                  className="bg-card/50 border-hymnal-burgundy/20 focus:border-hymnal-burgundy"
                />
                {musicSheetUrl && (
                  <div className="mt-2">
                    <img 
                      src={musicSheetUrl} 
                      alt="Music sheet preview"
                      className="w-full max-w-sm rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Add or replace the music sheet image URL.
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="submit" variant="hymnal" className="flex-1">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button type="button" variant="hymnal-outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};