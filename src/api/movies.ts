import { get } from './shared/methods';

export async function fetchMovies(page: number, title?: string, genres?: string, sort?: string): Promise<Movies> {
  const { data } = await get<Movies>(`movies?page=${page}${title ? `&title=${title}` : ''}${genres ? `&genres=${genres}` : ''}${sort ? `&sort=${sort}` : ''}`);
  return data;
}

export async function fetchMovieDetails(movieId: number | string): Promise<MovieDetails> {
  const { data } = await get<MovieDetails>(`movies/${movieId}`);
  return data;
}
