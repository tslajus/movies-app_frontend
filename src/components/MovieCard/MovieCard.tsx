import { StarIcon } from 'components/Icons';

import styles from './MovieCard.module.css';

function MovieCard({ data }: { data: Movie }) {
  return (
    <div className={styles.card}>
      <a href="#">
        <img alt={data.title} src={data.posterPath} />
      </a>

      <div className={styles.movieInfo}>
        <div>
          <div className={styles.rating}>
            <StarIcon className={styles.ratingIcon} />
            <p className={styles.ratingAverage}>{data.voteAverage}</p>
          </div>
          <p className={styles.title}>{data.title}</p>
        </div>

        <p>{data.releaseDate}</p>
      </div>
    </div>
  );
}

export default MovieCard;
