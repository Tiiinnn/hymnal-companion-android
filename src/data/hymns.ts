import hymnsJson from './hymns.json';

export interface Hymn {
  id: number;
  number: number;
  title: string;
  author: string;
  firstLine: string;
  category: string;
  lyrics: string[];
  keySignature?: string;
  isFavorite?: boolean;
  musicSheetUrl?: string;
  addedAt?: number;
}

export const hymnsData: Hymn[] = hymnsJson.hymns;
export const categories: string[] = hymnsJson.categories;