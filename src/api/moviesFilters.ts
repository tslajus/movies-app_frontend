import { get } from './shared/methods';

export async function fetchGenres(): Promise<Genre[]> {
  const { data } = await get<Genre[]>('genres');
  return data;
}

export async function fetchSortOptions(): Promise<SortOption[]> {
  const { data } = await get<SortOption[]>('sort-options');
  return data;
}
