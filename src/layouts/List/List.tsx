import { ReactNode } from 'react';

import styles from './List.module.css';

type ListProps = {
  children: ReactNode;
};

function List({ children }: ListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.list}>{children}</div>
    </div>
  );
}
export default List;
