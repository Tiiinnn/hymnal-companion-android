import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save } from "lucide-react";
import { categories } from "@/data/hymns";
import { useToast } from "@/hooks/use-toast";

interface AddHymnFormProps {
  onAddHymn: (hymn: {
    title: string;
    author: string;
    category: string;
    lyrics: string[];
    tune?: string;
  }) => void;
}

export const AddHymnForm = ({ onAddHymn }: AddHymnFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tune, setTune] = useState("");
  const [lyrics, setLyrics] = useState("");
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
    
    onAddHymn({
      title: title.trim(),
      author: author.trim(),
      category,
      lyrics: lyricsArray,
      tune: tune.trim() || undefined,
    });

    // Reset form
    setTitle("");
    setAuthor("");
    setCategory("");
    setTune("");
    setLyrics("");

    toast({
      title: "Hymn Added",
      description: `"${title}" has been added to your collection.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-hymnal-burgundy flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Hymn
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

            <Button type="submit" variant="hymnal" className="w-full">
              <Save className="h-4 w-4" />
              Add Hymn
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};