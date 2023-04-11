import { useQuery } from '@tanstack/react-query';
import { fetchStatus } from 'api/health';

import { Header, Footer } from '../';
import styles from './Layout.module.css';

function Layout() {
  const { data: healthy } = useQuery(['status'], fetchStatus);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>API status: {healthy ? 'is running' : 'something is wrong'}</main>
      <Footer />
    </div>
  );
}

export default Layout;
