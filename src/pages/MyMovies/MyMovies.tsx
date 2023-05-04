import { useState, useEffect } from 'react';
import { useProfile } from 'providers/ProfileProvider';
import { List } from 'layouts';
import { Loader } from 'components';
import { MovieCard } from 'features';

import styles from './MyMovies.module.css';

function MyMovies() {
  const { personalMovies, refetchPersonalMovies, isLoading, isRefetching } = useProfile();
  const [loaderVisible, setLoaderVisible] = useState(isLoading || isRefetching);

  useEffect(() => {
    refetchPersonalMovies();
  }, [refetchPersonalMovies]);

  useEffect(() => {
    setLoaderVisible(true);
    const timer = setTimeout(() => {
      if (!isLoading && !isRefetching) {
        setLoaderVisible(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, isRefetching]);

  if (loaderVisible) {
    return <Loader />;
  }

  if (!personalMovies || personalMovies.movies.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2 className={styles.noMoviesText}>No movies added yet.</h2>
      </div>
    );
  }

  const movies = personalMovies.movies;

  const renderedMovies = movies.map((movie) => {
    return <MovieCard data={movie} key={movie.movieId} movieId={movie.movieId} />;
  });

  return (
    <main className={styles.container}>
      <List>{renderedMovies}</List>
    </main>
  );
}

export default MyMovies;
