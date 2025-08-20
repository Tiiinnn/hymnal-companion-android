import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Heart, Search, Plus, Settings, Upload, ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onImportHymn?: () => void;
  onSettings?: () => void;
}

export const Navigation = ({ activeTab, onTabChange, onImportHymn, onSettings }: NavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "browse", label: "Browse", icon: Search },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "add", label: "Add Hymns", icon: Plus },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tabs]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const allTabs = onImportHymn ? [...tabs, { id: "import", label: "Import", icon: Upload }] : tabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-hymnal-burgundy/20 py-2 safe-area-bottom">
      <div className="relative max-w-full mx-auto">
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-md h-8 w-8"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
          onScroll={checkScrollButtons}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allTabs.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "hymnal" : "ghost"}
              size="sm"
              onClick={() => {
                if (id === "settings" && onSettings) {
                  onSettings();
                } else if (id === "import" && onImportHymn) {
                  onImportHymn();
                } else {
                  onTabChange(id);
                }
              }}
              className="flex flex-col gap-1 h-auto py-2 px-3 flex-shrink-0 min-w-[64px]"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs whitespace-nowrap">{label}</span>
            </Button>
          ))}
        </div>

        {showRightArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-md h-8 w-8"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </nav>
  );
};