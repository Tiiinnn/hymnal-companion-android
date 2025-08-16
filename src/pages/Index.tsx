import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryTabs } from "@/components/CategoryTabs";
import { HymnCard } from "@/components/HymnCard";
import { HymnDetail } from "@/components/HymnDetail";
import { Navigation } from "@/components/Navigation";
import { AddHymnForm } from "@/components/AddHymnForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hymnsData, categories, Hymn } from "@/data/hymns";
import { BookOpen, Music, Heart, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [customHymns, setCustomHymns] = useState<Hymn[]>([]);
  const { toast } = useToast();

  // Combine original hymns with custom hymns
  const allHymns = useMemo(() => {
    return [...hymnsData, ...customHymns];
  }, [customHymns]);

  const filteredHymns = useMemo(() => {
    let hymns = allHymns.map(hymn => ({
      ...hymn,
      isFavorite: favorites.includes(hymn.id)
    }));

    if (activeTab === "favorites") {
      hymns = hymns.filter(hymn => hymn.isFavorite);
    }

    if (activeCategory !== "All") {
      hymns = hymns.filter(hymn => hymn.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      hymns = hymns.filter(hymn =>
        hymn.title.toLowerCase().includes(query) ||
        hymn.author.toLowerCase().includes(query) ||
        hymn.firstLine.toLowerCase().includes(query) ||
        hymn.category.toLowerCase().includes(query)
      );
    }

    return hymns;
  }, [activeTab, activeCategory, searchQuery, favorites, allHymns]);

  const handleAddHymn = (newHymnData: {
    title: string;
    author: string;
    category: string;
    lyrics: string[];
    tune?: string;
  }) => {
    const newHymn: Hymn = {
      id: Date.now(), // Simple ID generation
      number: allHymns.length + 1,
      firstLine: newHymnData.lyrics[0]?.split('\n')[0] || "",
      ...newHymnData,
    };
    
    setCustomHymns(prev => [...prev, newHymn]);
  };

  const handleFavorite = (hymnId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(hymnId)
        ? prev.filter(id => id !== hymnId)
        : [...prev, hymnId];
      
      toast({
        title: prev.includes(hymnId) ? "Removed from favorites" : "Added to favorites",
        description: "Your collection has been updated.",
      });
      
      return newFavorites;
    });
  };

  const handlePlay = (hymn: Hymn) => {
    toast({
      title: "Playing hymn",
      description: `Now playing: ${hymn.title}`,
    });
  };

  const handleShare = (hymn: Hymn) => {
    if (navigator.share) {
      navigator.share({
        title: hymn.title,
        text: `${hymn.firstLine} - by ${hymn.author}`,
        url: window.location.href,
      });
    } else {
      toast({
        title: "Sharing",
        description: "Sharing functionality not available on this device.",
      });
    }
  };

  if (selectedHymn) {
    return (
      <HymnDetail
        hymn={selectedHymn}
        onBack={() => setSelectedHymn(null)}
        onFavorite={() => handleFavorite(selectedHymn.id)}
        onPlay={() => handlePlay(selectedHymn)}
        onShare={() => handleShare(selectedHymn)}
      />
    );
  }

  const renderHome = () => (
    <div className="space-y-6">
      <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-hymnal-burgundy to-hymnal-burgundy-light">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-hymnal-cream p-6">
            <h1 className="text-3xl font-bold font-serif mb-2">Hymns</h1>
            <p className="text-lg opacity-90">Sacred songs for worship & devotion</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Music className="h-8 w-8 text-hymnal-burgundy mx-auto mb-2" />
            <h3 className="font-semibold text-hymnal-burgundy mb-1">{allHymns.length}</h3>
            <p className="text-sm text-muted-foreground">Hymns</p>
          </CardContent>
        </Card>
        <Card className="border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-hymnal-burgundy mx-auto mb-2" />
            <h3 className="font-semibold text-hymnal-burgundy mb-1">{favorites.length}</h3>
            <p className="text-sm text-muted-foreground">Favorites</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-hymnal-burgundy mb-4">Popular Hymns</h2>
        <div className="space-y-3">
          {allHymns.slice(0, 3).map((hymn) => (
            <HymnCard
              key={hymn.id}
              {...hymn}
              isFavorite={favorites.includes(hymn.id)}
              onFavorite={() => handleFavorite(hymn.id)}
              onPlay={() => handlePlay(hymn)}
              onShare={() => handleShare(hymn)}
            />
          ))}
        </div>
        <Button 
          variant="hymnal-outline" 
          onClick={() => setActiveTab("browse")}
          className="w-full mt-4"
        >
          Browse All Hymns
        </Button>
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="space-y-6">
      <SearchBar 
        onSearch={setSearchQuery}
        onFilter={() => toast({ title: "Filters", description: "Advanced filters coming soon!" })}
      />
      
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="space-y-3">
        {filteredHymns.length > 0 ? (
          filteredHymns.map((hymn) => (
            <div key={hymn.id} onClick={() => setSelectedHymn(hymn)}>
              <HymnCard
                {...hymn}
                isFavorite={hymn.isFavorite}
                onFavorite={() => handleFavorite(hymn.id)}
                onPlay={() => handlePlay(hymn)}
                onShare={() => handleShare(hymn)}
              />
            </div>
          ))
        ) : (
          <Card className="border-hymnal-burgundy/20 bg-card/50">
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No hymns found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "home": return renderHome();
      case "browse": return renderBrowse();
      case "favorites": return renderBrowse();
      case "add": return <AddHymnForm onAddHymn={handleAddHymn} />;
      case "settings": return (
        <Card className="border-hymnal-burgundy/20 bg-card/50">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-hymnal-burgundy mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings panel coming soon!</p>
          </CardContent>
        </Card>
      );
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-hymnal-cream to-hymnal-parchment">
      <header className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-hymnal-burgundy/20 px-4 py-3 safe-area-top">
        <h1 className="text-xl font-bold text-hymnal-burgundy text-center">
          {activeTab === "home" ? "Hymns" : 
           activeTab === "browse" ? "Browse Hymns" :
           activeTab === "favorites" ? "My Favorites" :
           activeTab === "add" ? "Add Hymns" : "Settings"}
        </h1>
      </header>

      <main className="px-4 py-6 pb-24">
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
