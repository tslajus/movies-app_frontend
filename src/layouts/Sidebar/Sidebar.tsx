import { ReactNode } from 'react';

import styles from './Sidebar.module.css';

type Props = {
  children?: ReactNode;
  onBackdropClick?: () => void;
};

function Sidebar({ children, onBackdropClick }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>{children}</div>
      <div className={styles.backdrop} onClick={onBackdropClick} />
    </div>
  );
}

export default Sidebar;
