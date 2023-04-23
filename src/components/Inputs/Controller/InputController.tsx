import { TextInputField, SelectField } from 'components';

type InputControllerProps = FieldInput & {
  control: 'textInput' | 'select';
  options?: Option[];
  isMulti?: boolean;
};

function InputController({ control, name, options = [], placeholder = '', isMulti = false, ...rest }: InputControllerProps) {
  switch (control) {
    case 'textInput':
      return <TextInputField name={name} placeholder={placeholder} {...rest} />;
    case 'select':
      return <SelectField isMulti={isMulti} name={name} options={options} placeholder={placeholder} />;
    default:
      return null;
  }
}

export default InputController;
