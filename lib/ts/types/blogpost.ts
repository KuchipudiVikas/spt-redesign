interface Thumbnail {
  id: number;
  documentId: string;
  url: string;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  content: string;
  slug: string;
  index: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string;
  locale: string;
  Thumbnail: Thumbnail;
}
