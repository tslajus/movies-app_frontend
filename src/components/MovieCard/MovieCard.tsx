import { useState } from 'react';
import { StarIcon } from 'components/Icons';
import { useProfile } from 'providers/ProfileProvider';

import { CoverAlternate } from '../';
import { Favorite } from '../';
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

  return `${year}-${month}-${day}`;
}

function MovieCard({ data, movieId }: MovieCardProps) {
  const { signedIn } = useProfile();
  const formattedReleaseDate = formatDate(data.releaseDate);

  const brokenImg = <CoverAlternate title={data.title} />;
  const [imgError, setImgError] = useState(false);

  const handleImgError = () => {
    setImgError(true);
  };

  return (
    <div className={styles.card}>
      <a href={`/movies/${movieId}`}>{imgError ? brokenImg : <img alt={data.title} src={data.posterPath} onError={handleImgError} />}</a>

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
