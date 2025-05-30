export interface WorkDetailProps {
  title: string;
  logline: string;
  synopsis: string;
  thumbnailUrl: string;
  openDate?: string;
  category: string;
  genre: string;
  tags: string[];
  writers: { id: string; name: string }[];
  platformList?: { id: string; type: string; url: string }[];
}
