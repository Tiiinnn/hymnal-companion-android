import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, Edit, Trash2, Music, FileText } from "lucide-react";
import { Hymn } from "@/data/hymns";

interface HymnDetailProps {
  hymn: Hymn;
  onBack: () => void;
  onFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMusicSheet: () => void;
}

export const HymnDetail = ({ hymn, onBack, onFavorite, onEdit, onDelete, onMusicSheet }: HymnDetailProps) => {
  const [showMusicSheet, setShowMusicSheet] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-hymnal-cream to-hymnal-parchment">
      <header className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-hymnal-burgundy/20 px-4 py-3 safe-area-top">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-hymnal-burgundy truncate mx-4">
            {hymn.title}
          </h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onFavorite}>
              <Heart
                className={`h-5 w-5 transition-all duration-200 ${
                  hymn.isFavorite ? "fill-hymnal-burgundy text-hymnal-burgundy scale-110" : "text-muted-foreground"
                }`}
              />
            </Button>
            <Button variant="ghost" size="icon" onClick={onMusicSheet}>
              <Music className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 pb-24">
        <Card className="mb-6 border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-serif text-hymnal-burgundy">
                  {hymn.number}. {hymn.title}
                </CardTitle>
                <p className="text-muted-foreground mt-1">by {hymn.author}</p>
                {hymn.keySignature && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Music className="h-4 w-4" />
                    Key: {hymn.keySignature}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-6">
              <span className="bg-hymnal-burgundy/10 text-hymnal-burgundy px-3 py-2 rounded-md text-sm font-medium">
                {hymn.category}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-hymnal-burgundy">
                {showMusicSheet ? "Music Sheet" : "Lyrics"}
              </CardTitle>
              {hymn.musicSheetUrl && (
                <div className="flex items-center space-x-2">
                  <Label htmlFor="view-toggle" className="text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 inline mr-1" />
                    Lyrics
                  </Label>
                  <Switch
                    id="view-toggle"
                    checked={showMusicSheet}
                    onCheckedChange={setShowMusicSheet}
                  />
                  <Label htmlFor="view-toggle" className="text-sm text-muted-foreground">
                    <Music className="h-4 w-4 inline mr-1" />
                    Sheet
                  </Label>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {showMusicSheet && hymn.musicSheetUrl ? (
              <div className="text-center">
                <img 
                  src={hymn.musicSheetUrl} 
                  alt={`Music sheet for ${hymn.title}`}
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-soft"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    setShowMusicSheet(false);
                  }}
                />
              </div>
            ) : (
              <div className="space-y-6">
                {hymn.lyrics.map((verse, index) => (
                  <div key={index} className="bg-hymnal-parchment/30 p-4 rounded-lg">
                    <div className="whitespace-pre-line text-foreground leading-relaxed font-serif">
                      {verse}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};