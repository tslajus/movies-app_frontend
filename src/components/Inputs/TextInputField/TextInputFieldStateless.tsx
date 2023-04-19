import styles from './TextInputStateless.module.css';

function TextInputFieldStateless({ placeholder, value, ...rest }: TextInput) {
  return <input className={styles.inputField} placeholder={placeholder} type="text" {...rest} />;
}

export default TextInputFieldStateless;
