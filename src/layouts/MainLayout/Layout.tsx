import { ReactNode } from 'react';

import { Header, Footer } from '..';
import styles from './Layout.module.css';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
