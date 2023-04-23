import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchMovies } from 'api/movies';
import { Loader, MovieCard } from 'components';
import { ListFilters, Pagination } from 'features';
import { List } from 'layouts';

function MoviesList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activePage = Number(searchParams.get('page')) || 1;
  const title = searchParams.get('title') || '';
  const genres = searchParams.get('genres') || '';
  const sort = searchParams.get('sort') || '';

  const { data } = useQuery(['movies', activePage, title, genres, sort], () => fetchMovies(activePage, title, genres, sort), { keepPreviousData: true });

  const handlePageChange = async (selectedPage: number, filters: Record<string, string>) => {
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

  return (
    <main>
      <ListFilters />
      <List>{renderedMovies}</List>
      <Pagination currentPage={activePage} filters={{ title, genres, sort }} totalPageCount={data.totalPages} onPageChange={handlePageChange} />
    </main>
  );
}

export default MoviesList;
