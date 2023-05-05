import styles from './Tag.module.css';

interface TagProps {
  genre: string;
  onClick?: () => void;
}

function Tag({ genre, onClick }: TagProps) {
  return (
    <div className={styles.tag} onClick={onClick}>
      {genre}
    </div>
  );
}

export default Tag;
