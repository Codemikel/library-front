import type { Author } from './Author';
import type { Genre } from './Genre';

export interface Book {
    id?: number;
    name: string;
    author_id: number;
    genre_id: number;
    available?: boolean;
    created_at?: string;
    updated_at?: string;
    author?: Author;
    genre?: Genre;
}