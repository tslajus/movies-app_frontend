import styles from './TextInputField.module.css';

function TextInputBase({ field, label, placeholder = '', error, touched, ...rest }: TextInput) {
  return (
    <div className={styles.input}>
      {label && (
        <label className={styles.label} htmlFor={field.name}>
          {label}
        </label>
      )}
      <input className={styles.inputField} placeholder={placeholder} {...field} {...rest} />
      {touched && error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default TextInputBase;
