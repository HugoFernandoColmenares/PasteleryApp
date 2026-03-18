export interface NewsArticle {
    id: string; // GUID
    title: string;
    date: string;
    category: string;
    summary: string;
    content: string;
    author: string;
    imageUrl?: string;
}
