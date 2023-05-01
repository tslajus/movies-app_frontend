import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchMovies } from 'api/movies';
import { Loader, MovieCard } from 'components';
import { ListFilters, Pagination } from 'features';
import { List } from 'layouts';

import styles from './MoviesList.module.css';

function MoviesList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activePage = Number(searchParams.get('page')) || 1;

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

  const { data } = useQuery(
    ['movies', activePage, filters.title, filters.genres, filters.sort],
    () => fetchMovies(activePage, filters.title, filters.genres, filters.sort),
    { keepPreviousData: true },
  );

  const handlePageChange = async (selectedPage: number) => {
    const queryParams = new URLSearchParams(filters);
    queryParams.set('page', String(selectedPage));
    navigate(`/?${queryParams.toString()}`);
  };

  if (!data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const movies = data.movies;

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
      <Pagination currentPage={activePage} totalPageCount={data.totalPages} onPageChange={handlePageChange} />
    </main>
  );
}

export default MoviesList;
