import styles from './Tag.module.css';

function Tag({ genre }: { genre: string }) {
  return <div className={styles.tag}>{genre}</div>;
}

export default Tag;
