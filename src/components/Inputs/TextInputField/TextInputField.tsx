import { Field, useFormikContext } from 'formik';

import TextInputFieldBase from './TextInputFieldBase';

function TextInputField({ name, placeholder = '', ...rest }: FieldInput) {
  const { handleSubmit } = useFormikContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return <Field component={TextInputFieldBase} id={name} name={name} placeholder={placeholder} onKeyDown={handleKeyDown} {...rest} />;
}

export default TextInputField;
