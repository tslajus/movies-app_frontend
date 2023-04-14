import { get } from './shared/methods';

export async function fetchMovies(): Promise<Movies> {
  const { data } = await get<Movies>('movies');
  return data;
}

export async function fetchMovieDetails(movieId: number | string): Promise<MovieDetails> {
  const { data } = await get<MovieDetails>(`movies/${movieId}`);
  return data;
}
