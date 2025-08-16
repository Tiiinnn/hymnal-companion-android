import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
}

export const SearchBar = ({ onSearch, onFilter }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search hymns, authors, or first lines..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-card/50 backdrop-blur-sm border-hymnal-burgundy/20 focus:border-hymnal-burgundy"
        />
      </div>
      <Button type="submit" variant="hymnal" size="default">
        Search
      </Button>
      <Button type="button" variant="hymnal-outline" size="icon" onClick={onFilter}>
        <Filter className="h-4 w-4" />
      </Button>
    </form>
  );
};