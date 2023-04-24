import { Field, useFormikContext } from 'formik';

import TextInputFieldBase from './TextInputFieldBase';

function TextInputField({ name, placeholder = '', label, error, touched, ...rest }: FieldInput) {
  const { handleSubmit, setFieldTouched } = useFormikContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
  };

  return (
    <Field
      component={TextInputFieldBase}
      error={error}
      id={name}
      label={label}
      name={name}
      placeholder={placeholder}
      touched={touched}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
}

export default TextInputField;
