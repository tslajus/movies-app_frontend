import { useQuery } from '@tanstack/react-query';
import { fetchStatus } from 'api/health';
import { MyMoviesLogo } from 'components/Icons';

import styles from './App.module.css';

function App(): JSX.Element {
  const { data: healthy } = useQuery(['status'], fetchStatus);

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <MyMoviesLogo className={styles.icon} />
        <p>My Movies</p>
        <p>API Status: {healthy ? 'Is running' : 'Something is wrong!'}</p>
      </header>
    </div>
  );
}

export default App;
