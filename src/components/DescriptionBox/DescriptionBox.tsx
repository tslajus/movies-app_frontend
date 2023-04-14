import styles from './Description.module.css';

function DescriptionBox({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.description}>
      <h3>{title}</h3>
      <span>{description}</span>
    </div>
  );
}

export default DescriptionBox;
