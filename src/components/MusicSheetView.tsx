import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music, Download } from "lucide-react";
import { Hymn } from "@/data/hymns";

interface MusicSheetViewProps {
  hymn: Hymn;
  onBack: () => void;
}

export const MusicSheetView = ({ hymn, onBack }: MusicSheetViewProps) => {
  // Sample music sheet images - in a real app, these would be stored with each hymn
  const musicSheetImages = [
    "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-hymnal-cream to-hymnal-parchment">
      <header className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-hymnal-burgundy/20 px-4 py-3 safe-area-top">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-hymnal-burgundy truncate mx-4">
            Music Sheet
          </h1>
          <Button variant="ghost" size="icon">
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 pb-24">
        <Card className="mb-6 border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-hymnal-burgundy flex items-center gap-2">
              <Music className="h-5 w-5" />
              {hymn.number}. {hymn.title}
            </CardTitle>
            <p className="text-muted-foreground">by {hymn.author}</p>
            {hymn.keySignature && (
              <p className="text-sm text-muted-foreground">
                Key: {hymn.keySignature}
              </p>
            )}
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {musicSheetImages.map((imageUrl, index) => (
            <Card key={index} className="border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <img
                  src={imageUrl}
                  alt={`Music sheet page ${index + 1} for ${hymn.title}`}
                  className="w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Page {index + 1}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};