import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchMovies } from 'api/movies';
import { Loader, MovieCard } from 'components';
import { Pagination } from 'features';
import { List } from 'layouts';

function MoviesList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activePage = Number(searchParams.get('page')) || 1;
  const { data } = useQuery(['movies', activePage], () => fetchMovies(activePage), { keepPreviousData: true });

  const handlePageChange = async (selectedPage: number) => {
    navigate(`/?page=${selectedPage}`);
    const movies = await fetchMovies(selectedPage);
    return movies;
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

  return (
    <main>
      <List>{renderedMovies}</List>
      <Pagination currentPage={activePage} totalPageCount={data.totalPages} onPageChange={handlePageChange} />
    </main>
  );
}

export default MoviesList;
