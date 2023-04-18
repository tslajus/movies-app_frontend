import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from 'api/movies';
import { InfoBox } from 'features';
import { Loader } from 'components';

import styles from './MovieInfo.module.css';

function MovieInfo() {
  const { movieId = '' } = useParams<{ movieId: string }>();

  const { data } = useQuery(['movie', movieId], () => fetchMovieDetails(movieId));

  if (!data) {
    return <Loader />;
  }

  const { posterPath, backdropPath } = data;

  return (
    <main className={styles.container} style={{ backgroundImage: `url(${backdropPath})` }}>
      <div className={styles.movieBox}>
        <div className={styles.poster}>
          <img src={posterPath} />
        </div>

        <InfoBox data={data} />
      </div>
      <div className={styles.backgroundOverlay} />
    </main>
  );
}

export default MovieInfo;
