import styles from './CoverAlternate.module.css';

function CoverAlternate({ title }: { title: string }) {
  return <div className={styles.cover}>{title}</div>;
}

export default CoverAlternate;
