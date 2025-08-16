import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Play, Share } from "lucide-react";

interface HymnCardProps {
  title: string;
  number: number;
  author: string;
  firstLine: string;
  category: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onPlay?: () => void;
  onShare?: () => void;
}

export const HymnCard = ({
  title,
  number,
  author,
  firstLine,
  category,
  isFavorite = false,
  onFavorite,
  onPlay,
  onShare,
}: HymnCardProps) => {
  return (
    <Card className="hover:shadow-elegant transition-all duration-300 border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-serif text-hymnal-burgundy mb-1">
              {number}. {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">by {author}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFavorite}
            className="hover:bg-hymnal-burgundy/10"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-hymnal-burgundy text-hymnal-burgundy" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 mb-3 italic">{firstLine}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-hymnal-burgundy/10 text-hymnal-burgundy px-2 py-1 rounded-full">
            {category}
          </span>
          <div className="flex gap-2">
            <Button variant="hymnal-outline" size="sm" onClick={onPlay}>
              <Play className="h-4 w-4" />
              Listen
            </Button>
            <Button variant="ghost" size="sm" onClick={onShare}>
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};