export interface MovieItem {
  id: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  genres: string[];
  runtime: number;
}

export type SortOrder = 'asc' | 'desc';
export type SearchBy = 'title' | 'genres';

export interface MoviesParams {
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
  searchBy?: SearchBy;
  filter?: string[] | string;
  offset?: number;
  limit?: number;
}
