import { NavLink } from 'react-router-dom';

import styles from './ButtonUnderline.module.css';

type ButtonUnderline = {
  isNav?: boolean;
  to?: string;
  text?: string;
  onClick?: () => void;
};

const ButtonUnderline: React.FC<ButtonUnderline> = ({ text, isNav = false, to = '', ...rest }) => {
  const NavLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? `${styles.navLinkActive}` : `${styles.navLink}`);

  return (
    <>
      {isNav ? (
        <NavLink className={NavLinkClass} to={to} {...rest}>
          {text}
        </NavLink>
      ) : (
        <button className={styles.btn} {...rest}>
          {text}
        </button>
      )}
    </>
  );
};

export default ButtonUnderline;
