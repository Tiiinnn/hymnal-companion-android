import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="w-full">
      <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
        <TabsList className="grid w-full bg-hymnal-burgundy/10 p-1 rounded-lg" style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}>
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="data-[state=active]:bg-hymnal-burgundy data-[state=active]:text-hymnal-cream whitespace-nowrap text-sm font-medium transition-all duration-300"
          >
            {category}
          </TabsTrigger>
        ))}
        </TabsList>
      </Tabs>
    </div>
  );
};