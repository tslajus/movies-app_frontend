import { useState, useEffect } from 'react';
import { useProfile } from 'providers/ProfileProvider';
import { useMediaQuery } from 'hooks';
import { MyMoviesLogo } from 'components/Icons';
import { HamburgerBtn, ButtonUnderline, Modal } from 'components';
import { NavLink } from 'react-router-dom';
import { UserForm } from 'features';

import { ROUTES } from '../../navigation/routes';
import { Sidebar } from '../';
import styles from './Header.module.css';

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signedIn, logout } = useProfile();

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

  const handleClickLogout = () => {
    logout();
    setIsHamburgerOpen(false);
  };

  const renderedNav = (
    <nav className={`${styles.navList} ${isSmallScreen && styles.navListSmall}`} id="sidebar">
      <ButtonUnderline text="Movies" to={ROUTES.MOVIES} isNav onClick={handleCloseSidebar} />
      {signedIn && <ButtonUnderline text="My Movies" to={ROUTES.MY_MOVIES} isNav onClick={handleCloseSidebar} />}
      {signedIn ? <ButtonUnderline text="Logout" onClick={handleClickLogout} /> : <ButtonUnderline text="Sign in/up" onClick={handleClickSignIn} />}
    </nav>
  );

  const renderedHeader = isSmallScreen ? <HamburgerBtn isActive={isHamburgerOpen} onClick={handleHamburgerClick} /> : renderedNav;

  return (
    <>
      <header className={styles.header}>
        <NavLink to={ROUTES.INDEX}>
          <MyMoviesLogo className={styles.icon} />
        </NavLink>
        {renderedHeader}
      </header>

      {isHamburgerOpen && <Sidebar onBackdropClick={handleHamburgerClick}>{renderedNav}</Sidebar>}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <UserForm closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default Header;
