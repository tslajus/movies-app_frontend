import styles from './TextInputField.module.css';

type TextInput = React.InputHTMLAttributes<HTMLInputElement> & {
  field: Field;
};

function TextInputBase({ field, placeholder = '', ...rest }: TextInput) {
  return <input className={styles.inputField} placeholder={placeholder} type="text" {...field} {...rest} />;
}

export default TextInputBase;
