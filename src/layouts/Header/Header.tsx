import { useState } from 'react';
import { MyMoviesLogo } from 'components/Icons';
import { HamburgerBtn } from 'components';

import styles from './Header.module.css';

function Header() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive(!isActive);

  return (
    <header className={styles.header}>
      <MyMoviesLogo className={styles.icon} />
      <HamburgerBtn isActive={isActive} onClick={handleClick} />
    </header>
  );
}

export default Header;
