import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryTabs } from "@/components/CategoryTabs";
import { HymnCard } from "@/components/HymnCard";
import { HymnDetail } from "@/components/HymnDetail";
import { EditHymnForm } from "@/components/EditHymnForm";
import { MusicSheetView } from "@/components/MusicSheetView";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { ImportHymnDialog } from "@/components/ImportHymnDialog";
import { SettingsDialog } from "@/components/SettingsDialog";
import { Navigation } from "@/components/Navigation";
import { AddHymnForm } from "@/components/AddHymnForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hymnsData, categories, Hymn } from "@/data/hymns";
import { sortHymnsAlphabetically } from "@/utils/hymnUtils";
import { BookOpen, Music, Heart, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [editingHymn, setEditingHymn] = useState<Hymn | null>(null);
  const [viewingMusicSheet, setViewingMusicSheet] = useState<Hymn | null>(null);
  const [deleteHymn, setDeleteHymn] = useState<Hymn | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [customHymns, setCustomHymns] = useState<Hymn[]>([]);
  const { toast } = useToast();

  // Combine and sort hymns alphabetically
  const allHymns = useMemo(() => {
    const combined = [...hymnsData, ...customHymns];
    return sortHymnsAlphabetically(combined);
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
    keySignature?: string;
    musicSheetUrl?: string;
  }) => {
    const newHymn: Hymn = {
      id: Date.now(),
      number: 0, // Will be recalculated when sorted
      firstLine: newHymnData.lyrics[0]?.split('\n')[0] || "",
      addedAt: Date.now(),
      ...newHymnData,
    };
    
    setCustomHymns(prev => [...prev, newHymn]);
  };

  const handleEditHymn = (updatedHymn: Hymn) => {
    if (hymnsData.find(h => h.id === updatedHymn.id)) {
      // Can't edit original hymns, show message
      toast({
        title: "Cannot Edit",
        description: "Original hymns cannot be edited. You can only edit custom hymns you've added.",
        variant: "destructive",
      });
      return;
    }

    setCustomHymns(prev => 
      prev.map(hymn => hymn.id === updatedHymn.id ? updatedHymn : hymn)
    );
    setEditingHymn(null);
  };

  const handleDeleteHymn = (hymn: Hymn) => {
    if (hymnsData.find(h => h.id === hymn.id)) {
      toast({
        title: "Cannot Delete",
        description: "Original hymns cannot be deleted. You can only delete custom hymns you've added.",
        variant: "destructive",
      });
      return;
    }

    setCustomHymns(prev => prev.filter(h => h.id !== hymn.id));
    setFavorites(prev => prev.filter(id => id !== hymn.id));
    setDeleteHymn(null);
    
    toast({
      title: "Hymn Deleted",
      description: `"${hymn.title}" has been removed from your collection.`,
    });
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

  // Handle different views
  if (viewingMusicSheet) {
    return (
      <MusicSheetView
        hymn={viewingMusicSheet}
        onBack={() => setViewingMusicSheet(null)}
      />
    );
  }

  if (editingHymn) {
    return (
      <EditHymnForm
        hymn={editingHymn}
        onSave={handleEditHymn}
        onCancel={() => setEditingHymn(null)}
      />
    );
  }

  if (selectedHymn) {
    return (
      <HymnDetail
        hymn={selectedHymn}
        onBack={() => setSelectedHymn(null)}
        onFavorite={() => handleFavorite(selectedHymn.id)}
        onEdit={() => setEditingHymn(selectedHymn)}
        onDelete={() => setDeleteHymn(selectedHymn)}
        onMusicSheet={() => setViewingMusicSheet(selectedHymn)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 text-center">
            <Music className="h-6 w-6 sm:h-8 sm:w-8 text-hymnal-burgundy mx-auto mb-2" />
            <h3 className="text-sm sm:text-base font-semibold text-hymnal-burgundy mb-1">{allHymns.length}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Hymns</p>
          </CardContent>
        </Card>
        <Card className="border-hymnal-burgundy/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 text-center">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-hymnal-burgundy mx-auto mb-2" />
            <h3 className="text-sm sm:text-base font-semibold text-hymnal-burgundy mb-1">{favorites.length}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Favorites</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="sticky top-16 bg-gradient-to-b from-hymnal-cream to-hymnal-parchment/95 backdrop-blur-sm pb-2 mb-4 z-10">
          <h2 className="text-xl font-semibold text-hymnal-burgundy">Recent Hymns</h2>
        </div>
        <div className="space-y-3">
          {allHymns.filter(hymn => hymn.addedAt).sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)).slice(0, 3).length > 0 ? 
            allHymns.filter(hymn => hymn.addedAt).sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)).slice(0, 3).map((hymn) => (
            <HymnCard
              key={hymn.id}
              {...hymn}
              isFavorite={favorites.includes(hymn.id)}
              onFavorite={() => handleFavorite(hymn.id)}
              onEdit={() => setEditingHymn(hymn)}
              onDelete={() => setDeleteHymn(hymn)}
              onMusicSheet={() => setViewingMusicSheet(hymn)}
              onClick={() => setSelectedHymn(hymn)}
            />
          )) : allHymns.slice(0, 3).map((hymn) => (
            <HymnCard
              key={hymn.id}
              {...hymn}
              isFavorite={favorites.includes(hymn.id)}
              onFavorite={() => handleFavorite(hymn.id)}
              onEdit={() => setEditingHymn(hymn)}
              onDelete={() => setDeleteHymn(hymn)}
              onMusicSheet={() => setViewingMusicSheet(hymn)}
              onClick={() => setSelectedHymn(hymn)}
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
      <div className="sticky top-16 bg-gradient-to-b from-hymnal-cream to-hymnal-parchment/95 backdrop-blur-sm pb-4 z-10 space-y-4">
        <SearchBar onSearch={setSearchQuery} />
        
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="space-y-3">
        {filteredHymns.length > 0 ? (
          filteredHymns.map((hymn) => (
            <HymnCard
              key={hymn.id}
              {...hymn}
              isFavorite={hymn.isFavorite}
              onFavorite={() => handleFavorite(hymn.id)}
              onEdit={() => setEditingHymn(hymn)}
              onDelete={() => setDeleteHymn(hymn)}
              onMusicSheet={() => setViewingMusicSheet(hymn)}
              onClick={() => setSelectedHymn(hymn)}
            />
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

      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onImportHymn={() => setShowImportDialog(true)}
        onSettings={() => setShowSettingsDialog(true)}
      />

      <DeleteConfirmDialog
        hymn={deleteHymn}
        open={!!deleteHymn}
        onConfirm={() => deleteHymn && handleDeleteHymn(deleteHymn)}
        onCancel={() => setDeleteHymn(null)}
      />

      <ImportHymnDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImportHymn={handleAddHymn}
      />

      <SettingsDialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      />
    </div>
  );
};

export default Index;