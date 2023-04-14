import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from 'api/movies';
import { Loader, StatLine, DescriptionBox, Tag } from 'components';

import styles from './MovieInfo.module.css';

function MovieInfo() {
  const { movieId = '' } = useParams<{ movieId: string }>();

  const { data } = useQuery(['movie', movieId], () => fetchMovieDetails(movieId));

  if (!data) {
    return <Loader />;
  }

  const { title, posterPath, releaseDate, tagline, runtime, voteAverage, voteCount, budget, revenue, overview, productionCompanies, backdropPath, genres } =
    data;

  const formattedBudget = `$${budget.toLocaleString()}`;
  const formattedRevenue = `$${revenue.toLocaleString()}`;
  const formattedRuntime = `${runtime} min`;
  const formattedCompanies = productionCompanies.map((company) => company.name).join(', ');
  const genreTags = genres.map((genre) => {
    return <Tag genre={genre.name} key={genre.id} />;
  });

  return (
    <main className={styles.container} style={{ backgroundImage: `url(${backdropPath})` }}>
      <div className={styles.movieBox}>
        <div className={styles.poster}>
          <img src={posterPath} />
        </div>
        <div>
          <h2 className={styles.title}>
            {title} <span>({releaseDate})</span>
          </h2>
          <h3 className={styles.tagline}>{tagline}</h3>
          <div className={styles.tags}>{genreTags}</div>

          <dl className={styles.statistics}>
            <StatLine name="Duration" value={formattedRuntime} />
            <StatLine name="Vote average" value={voteAverage} />
            <StatLine name="Vote count" value={voteCount} />
            <StatLine name="Budget" value={formattedBudget} />
            <StatLine name="Revenue" value={formattedRevenue} />
          </dl>
          <DescriptionBox description={overview} title="Overview" />
          <DescriptionBox description={formattedCompanies} title="Production Companies" />
        </div>
      </div>
      <div className={styles.backgroundOverlay} />
    </main>
  );
}

export default MovieInfo;
