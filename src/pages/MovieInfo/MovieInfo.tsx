import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from 'api/movies';
import { InfoBox } from 'features';
import { Loader, CoverAlternate } from 'components';

import styles from './MovieInfo.module.css';

function MovieInfo() {
  const { movieId = '' } = useParams<{ movieId: string }>();

  const { data } = useQuery(['movie', movieId], () => fetchMovieDetails(movieId));
  const [imgError, setImgError] = useState(false);

  if (!data) {
    return <Loader />;
  }

  const { posterPath, backdropPath } = data;
  const brokenImg = <CoverAlternate title={data.title} />;

  const handleImgError = () => {
    setImgError(true);
  };

  return (
    <main className={styles.container} style={{ backgroundImage: `url(${backdropPath})` }}>
      <div className={styles.movieBox}>
        <div className={styles.poster}>{imgError ? brokenImg : <img alt={data.title} src={posterPath} onError={handleImgError} />}</div>

        <InfoBox data={data} />
      </div>
      <div className={styles.backgroundOverlay} />
    </main>
  );
}

export default MovieInfo;
