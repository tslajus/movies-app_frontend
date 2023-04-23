import { StarIcon } from 'components/Icons';

import styles from './MovieCard.module.css';

function MovieCard({ data, movieId }: { data: Movie; movieId: number | string }) {
  return (
    <div className={styles.card}>
      <a href={`/movies/${movieId}`}>
        <img alt={data.title} src={data.posterPath} />
      </a>

      <div className={styles.movieInfo}>
        <div>
          <div className={styles.rating}>
            <StarIcon className={styles.ratingIcon} />
            <p className={styles.ratingAverage}>{Math.round(data.voteAverage * 10) / 10}</p>
          </div>
          <p className={styles.title}>{data.title}</p>
        </div>

        <p>{data.releaseDate}</p>
      </div>
    </div>
  );
}

export default MovieCard;
