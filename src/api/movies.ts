import { get } from './shared/methods';

type Movies = {
  page: number;
  totalPages: number;
  movies: Movie[];
};

export async function fetchMovies(): Promise<Movies> {
  const { data } = await get<Movies>('movies');
  return data;
}
