import { useState, useEffect } from 'react';
import { useMediaQuery } from 'hooks';
import { MyMoviesLogo } from 'components/Icons';
import { HamburgerBtn, Modal } from 'components';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../navigation/routes';
import { Sidebar } from '../';
import styles from './Header.module.css';

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSmallScreen = useMediaQuery('768px');

  useEffect(() => {
    if (!isSmallScreen) {
      setIsHamburgerOpen(false);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    if (!isHamburgerOpen) {
      setIsModalOpen(false);
    }
  }, [isHamburgerOpen]);

  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };
  const handleCloseSidebar = () => setIsHamburgerOpen(false);
  const handleClickSignIn = () => {
    setIsModalOpen(true);
  };

  const NavLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? `${styles.navLinkActive}` : `${styles.navLink}`);
  const renderedNav = (
    <nav className={`${styles.navList} ${isSmallScreen && styles.navListSmall}`} id="sidebar">
      <NavLink className={NavLinkClass} to={ROUTES.MOVIES} onClick={handleCloseSidebar}>
        Movies
      </NavLink>
      <button className={styles.btn} onClick={handleClickSignIn}>
        Sign in/up
      </button>
    </nav>
  );

  const renderedHeader = isSmallScreen ? <HamburgerBtn isActive={isHamburgerOpen} onClick={handleHamburgerClick} /> : renderedNav;

  return (
    <>
      <header className={styles.header}>
        <NavLink to={ROUTES.MOVIES}>
          <MyMoviesLogo className={styles.icon} />
        </NavLink>
        {renderedHeader}
      </header>

      {isHamburgerOpen && <Sidebar onBackdropClick={handleHamburgerClick}>{renderedNav}</Sidebar>}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <h2>My Modal</h2>
          <p>Modal content goes here</p>
        </Modal>
      )}
    </>
  );
}

export default Header;
