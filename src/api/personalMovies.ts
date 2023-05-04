import { get, post, deleteReq } from './shared/methods';

export async function addPersonalMovie(movie: any, token: string): Promise<{ success: true } | { success: false; message: string }> {
  try {
    await post('my-movies', movie, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: 'Failed to add movie' };
  }
}

export async function deletePersonalMovie(movieId: any, token: string): Promise<{ success: true } | { success: false; message: string }> {
  try {
    await deleteReq(`my-movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: 'Failed to delete movie' };
  }
}

export async function fetchPersonalMovies(token: string): Promise<Movies | null> {
  try {
    const { data } = await get<Movies>('my-movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    console.error('Failed to fetch personal movies:', error);
    return null;
  }
}
