import { Button } from "@/components/ui/button";
import { Home, Heart, Search, Plus, Settings } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "browse", label: "Browse", icon: Search },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "add", label: "Add Hymns", icon: Plus },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-hymnal-burgundy/20 px-4 py-2 safe-area-bottom">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? "hymnal" : "ghost"}
            size="sm"
            onClick={() => onTabChange(id)}
            className="flex flex-col gap-1 h-auto py-2 px-3"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};