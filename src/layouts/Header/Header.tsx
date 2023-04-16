import { useState, useEffect } from 'react';
import { useMediaQuery } from 'hooks';
import { MyMoviesLogo } from 'components/Icons';
import { HamburgerBtn } from 'components';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../navigation/routes';
import { Sidebar } from '../';
import styles from './Header.module.css';

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('768px');

  useEffect(() => {
    if (!isSmallScreen) {
      setIsHamburgerOpen(false);
    }
  }, [isSmallScreen]);

  const handleClick = () => setIsHamburgerOpen(!isHamburgerOpen);
  const handleCloseSidebar = () => setIsHamburgerOpen(false);

  const NavLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? `${styles.navLinkActive}` : `${styles.navLink}`);
  const renderedNav = (
    <nav className={`${styles.navList} ${isSmallScreen && styles.navListSmall}`} id="sidebar">
      <NavLink className={NavLinkClass} to={ROUTES.MOVIES} onClick={handleCloseSidebar}>
        Movies
      </NavLink>
      <NavLink className={NavLinkClass} to={ROUTES.LOGIN} onClick={handleCloseSidebar}>
        Sign in/up
      </NavLink>
    </nav>
  );

  const renderedHeader = isSmallScreen ? <HamburgerBtn isActive={isHamburgerOpen} onClick={handleClick} /> : renderedNav;

  return (
    <>
      <header className={styles.header}>
        <NavLink to={ROUTES.MOVIES}>
          <MyMoviesLogo className={styles.icon} />
        </NavLink>
        {renderedHeader}
      </header>
      {isHamburgerOpen && <Sidebar onBackdropClick={handleClick}>{renderedNav}</Sidebar>}
    </>
  );
}

export default Header;
