import { useQuery } from '@tanstack/react-query';
import { fetchStatus } from 'api/health';

import styles from './MoviesListContainer.module.css';

function MoviesListContainer() {
  const { data: healthy } = useQuery(['status'], fetchStatus);

  return <div className={styles.list}>API status: {healthy ? 'is running' : 'something is wrong'}</div>;
}
export default MoviesListContainer;
