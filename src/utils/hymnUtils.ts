import { Hymn } from "@/data/hymns";

export const sortHymnsAlphabetically = (hymns: Hymn[]): Hymn[] => {
  const sorted = [...hymns].sort((a, b) => a.title.localeCompare(b.title));
  
  // Reassign numbers based on alphabetical order
  return sorted.map((hymn, index) => ({
    ...hymn,
    number: index + 1
  }));
};