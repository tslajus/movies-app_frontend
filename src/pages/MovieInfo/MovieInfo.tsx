import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from 'api/movies';
import { InfoBox } from 'features';
import { Loader, CoverAlternate } from 'components';

import styles from './MovieInfo.module.css';

function MovieInfo() {
  const { movieId = '' } = useParams<{ movieId: string }>();

  const { data, isFetching } = useQuery(['movie', movieId], () => fetchMovieDetails(movieId));
  const [imgError, setImgError] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(isFetching);

  useEffect(() => {
    setLoaderVisible(true);
    const timer = setTimeout(() => {
      if (!isFetching) {
        setLoaderVisible(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [isFetching]);

  if (loaderVisible) {
    return <Loader />;
  }

  const posterPath = data?.posterPath || '';
  const backdropPath = data?.backdropPath || '';
  const brokenImg = <CoverAlternate title={data?.title || ''} />;

  const handleImgLoad = () => {
    setIsImgLoading(false);
  };

  const handleImgError = () => {
    setImgError(true);
    handleImgLoad();
  };

  return (
    <main className={styles.container} style={{ backgroundImage: `url(${backdropPath})` }}>
      <div className={styles.movieBox}>
        <div className={styles.poster}>
          {imgError ? (
            brokenImg
          ) : (
            <img alt={data?.title || ''} src={posterPath} style={isImgLoading ? { display: 'none' } : {}} onError={handleImgError} onLoad={handleImgLoad} />
          )}
          {isImgLoading && <Loader backgroundSize="cover" isGray isNoBackground isNoLoader />}
        </div>

        {data && <InfoBox data={data} />}
      </div>
      <div className={styles.backgroundOverlay} />
    </main>
  );
}

export default MovieInfo;
