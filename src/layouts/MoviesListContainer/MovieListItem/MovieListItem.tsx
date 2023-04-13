import { StarIcon } from 'components/Icons';

import styles from './MovieListItem.module.css';

function MovieListItem({ data }: { data: Movie }) {
  return (
    <div className={styles.movieCard}>
      <a href="#">
        <img alt={data.title} src={data.posterPath} />
      </a>

      <div className={styles.movieInfo}>
        <div className={styles.rating}>
          <StarIcon className={styles.ratingIcon} />
          <p className={styles.ratingAverage}>{data.voteAverage}</p>
        </div>
        <p className={styles.title}>{data.title}</p>

        <p>{data.releaseDate}</p>
      </div>
    </div>
  );
}

export { MovieListItem };
