import { TextInputField, SelectField } from 'components';

function InputController({ control, name, label, options = [], placeholder = '', isMulti = false, touched, error, ...rest }: InputController) {
  switch (control) {
    case 'textInput':
      return <TextInputField error={error} label={label} name={name} placeholder={placeholder} touched={touched} {...rest} />;
    case 'select':
      return <SelectField isMulti={isMulti} name={name} options={options} placeholder={placeholder} />;
    default:
      return null;
  }
}

export default InputController;
