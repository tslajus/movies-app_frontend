import { Field } from 'formik';

import SelectFieldBase from './SelectFieldBase';

function SelectField({ name, options = [], placeholder, isMulti = false, ...rest }: SelectField) {
  return (
    <Field>
      {({ form }: { form: Form }) => <SelectFieldBase form={form} isMulti={isMulti} name={name} options={options} placeholder={placeholder} {...rest} />}
    </Field>
  );
}

export default SelectField;
