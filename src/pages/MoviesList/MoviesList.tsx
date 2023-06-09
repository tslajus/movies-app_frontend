import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchMovies } from 'api/movies';
import { Loader } from 'components';
import { ListFilters, MovieCard, Pagination } from 'features';
import { List } from 'layouts';

import styles from './MoviesList.module.css';

function MoviesList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activePage = Number(searchParams.get('page')) || 1;
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    title: searchParams.get('title') || '',
    genres: searchParams.get('genres') || '',
    sort: searchParams.get('sort') || '',
  });

  useEffect(() => {
    setFilters({
      title: searchParams.get('title') || '',
      genres: searchParams.get('genres') || '',
      sort: searchParams.get('sort') || '',
    });
  }, [searchParams]);

  const handlePageChange = async (selectedPage: number) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      }
    });
    queryParams.set('page', String(selectedPage));
    navigate(`/?${queryParams.toString()}`);
  };

  const { data } = useQuery(
    ['movies', activePage, filters.title, filters.genres, filters.sort],
    () => fetchMovies(activePage, filters.title, filters.genres, filters.sort),
    { keepPreviousData: true, onSuccess: () => setIsLoading(false), staleTime: Infinity, cacheTime: 1000 * 60 * 60 * 24 },
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (data) {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const movies = data?.movies || [];

  const renderedMovies = movies.map((movie) => {
    return <MovieCard data={movie} key={movie.movieId} movieId={movie.movieId} />;
  });

  const noMoviesText = (
    <div className={styles.container}>
      <h2 className={styles.noMoviesText}>No movies found matching your search criteria.</h2>
    </div>
  );

  return (
    <main className={styles.container}>
      <ListFilters />
      {movies.length === 0 && noMoviesText}
      <List>{renderedMovies}</List>
      <Pagination currentPage={activePage} totalPageCount={data?.totalPages || 1} onPageChange={handlePageChange} />
    </main>
  );
}

export default MoviesList;
