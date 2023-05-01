import styles from './CoverAlternate.module.css';

function CoverAlternate({ title }: { title: string }) {
  return (
    <div className={styles.cover}>
      <p>{title}</p>
    </div>
  );
}

export default CoverAlternate;
