import { useState } from 'react';
import { StarIcon } from 'components/Icons';
import { useProfile } from 'providers/ProfileProvider';

import { Favorite, Loader, CoverAlternate } from '../../components';
import styles from './MovieCard.module.css';

type MovieCardProps = {
  data: Movie;
  movieId: number | string;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (isNaN(year) || isNaN(parseInt(month)) || isNaN(parseInt(day))) {
    return '';
  }

  return `${year}-${month}-${day}`;
}

function MovieCard({ data, movieId }: MovieCardProps) {
  const { signedIn } = useProfile();
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const brokenImg = <CoverAlternate title={data.title} />;
  const formattedReleaseDate = formatDate(data.releaseDate);

  const handleImgLoad = () => {
    setIsImgLoading(false);
  };

  const handleImgError = () => {
    setImgError(true);
    handleImgLoad();
  };

  return (
    <div className={styles.card}>
      <a href={`/movies/${movieId}`}>
        {imgError ? (
          brokenImg
        ) : (
          <img alt={data.title} src={data.posterPath} style={isImgLoading ? { display: 'none' } : {}} onError={handleImgError} onLoad={handleImgLoad} />
        )}
        {isImgLoading && <Loader backgroundSize="cover" isGray isTransparent />}
      </a>

      <div className={styles.movieInfo}>
        <div>
          <div className={styles.rating}>
            <StarIcon className={styles.ratingIcon} />
            <p className={styles.ratingAverage}>{Math.round(data.voteAverage * 10) / 10}</p>
          </div>
          <p className={styles.title}>{data.title}</p>
        </div>

        <div className={styles.footer}>
          <p>{formattedReleaseDate}</p>
          {signedIn && <Favorite movie={data} />}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
