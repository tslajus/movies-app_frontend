import styles from './Button.module.css';

function Button({ text, type = 'button', ...rest }: Button) {
  return (
    <button className={styles.btn} type={type} {...rest}>
      {text}
    </button>
  );
}

export default Button;
