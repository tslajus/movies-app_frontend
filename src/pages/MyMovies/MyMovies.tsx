import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProfile } from 'providers/ProfileProvider';
import { MovieCard } from 'components';
import { Pagination } from 'features';
import { List } from 'layouts';

import styles from './MyMovies.module.css';

function MyMovies() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activePage = Number(searchParams.get('page')) || 1;
  const { personalMovies, refetchPersonalMovies } = useProfile();

  const handlePageChange = async (selectedPage: number) => {
    navigate(`/my-movies?page=${selectedPage}`);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      await refetchPersonalMovies(activePage);
      if (personalMovies && activePage > personalMovies.totalPages) {
        navigate(`/my-movies?page=${personalMovies.totalPages}`);
      }
    };
    fetchMovies();
  }, [activePage, refetchPersonalMovies, personalMovies, navigate]);

  if (!personalMovies || personalMovies.movies.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.noMoviesText}>No movies added yet.</h2>
      </div>
    );
  }

  const movies = personalMovies.movies;
  const totalPages = personalMovies.totalPages;

  const renderedMovies = movies.map((movie) => {
    return <MovieCard data={movie} key={movie.movieId} movieId={movie.movieId} />;
  });

  return (
    <main className={styles.container}>
      <List>{renderedMovies}</List>
      {personalMovies.totalPages > 1 && <Pagination currentPage={activePage} totalPageCount={totalPages} onPageChange={handlePageChange} />}
    </main>
  );
}

export default MyMovies;
