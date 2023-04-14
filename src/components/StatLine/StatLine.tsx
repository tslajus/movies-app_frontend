import styles from './StatLine.module.css';

function StatLine({ name, value }: { name: string; value: string | number }) {
  return (
    <span className={styles.row}>
      <dt>{name}:</dt>
      <dd>
        <strong>{value}</strong>
      </dd>
    </span>
  );
}

export default StatLine;
