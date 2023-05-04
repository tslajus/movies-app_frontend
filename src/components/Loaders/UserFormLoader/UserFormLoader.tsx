import styles from './UserFormLoader.module.css';

function UserFormLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default UserFormLoader;
