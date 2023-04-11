import styles from './HamburgerButton.module.css';

type Props = {
  isActive: boolean;
  onClick?: () => void;
};

function HamburgerButton({ isActive = false, onClick }: Props) {
  return (
    <button className={`${styles.hamburger} ${isActive && styles.isActive}`} onClick={onClick}>
      <span className={styles.hamburgerBar}></span>
    </button>
  );
}

export default HamburgerButton;
