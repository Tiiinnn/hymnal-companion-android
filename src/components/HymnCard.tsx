import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Edit, Trash2, Music } from "lucide-react";

interface HymnCardProps {
  title: string;
  number: number;
  author: string;
  firstLine: string;
  category: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMusicSheet?: () => void;
  onClick?: () => void;
}

export const HymnCard = ({
  title,
  number,
  author,
  firstLine,
  category,
  isFavorite = false,
  onFavorite,
  onEdit,
  onDelete,
  onMusicSheet,
  onClick,
}: HymnCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  const handleMusicSheetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMusicSheet?.();
  };

  return (
    <Card 
      className="hover:shadow-elegant transition-all duration-300 border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-serif text-hymnal-burgundy mb-1">
              {number}. {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">by {author}</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className="hover:bg-hymnal-burgundy/10 hover:scale-110 transition-all duration-200"
            >
              <Heart
                className={`h-5 w-5 transition-all duration-200 ${
                  isFavorite ? "fill-hymnal-burgundy text-hymnal-burgundy scale-110" : "text-muted-foreground"
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMusicSheetClick}
              className="hover:bg-hymnal-burgundy/10"
            >
              <Music className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEditClick}
              className="hover:bg-hymnal-burgundy/10"
            >
              <Edit className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteClick}
              className="hover:bg-red-100 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 mb-3 italic">{firstLine}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-hymnal-burgundy/10 text-hymnal-burgundy px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};