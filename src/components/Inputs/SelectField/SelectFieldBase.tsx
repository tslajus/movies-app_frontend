import Select from 'react-select';

import { selectFieldStyles } from './SelectFieldStyles';

function SelectFieldBase({ options, name, form, placeholder, isMulti = false, ...rest }: SelectField) {
  const fieldValue = form.values[name];

  const handleChange = (selectedOption: any) => {
    if (isMulti) {
      form.setFieldValue(name, selectedOption ? selectedOption.map((option: Option) => option.value) : []);
    } else {
      form.setFieldValue(name, selectedOption ? selectedOption.value : '');
    }
  };

  const value = isMulti
    ? Array.isArray(fieldValue)
      ? fieldValue.map((value: string) => options.find((option: Option) => option.value === value))
      : []
    : options.find((option: Option) => option.value === fieldValue);

  return (
    <Select
      isMulti={isMulti}
      key={fieldValue}
      name={name}
      options={options}
      placeholder={placeholder}
      styles={selectFieldStyles}
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
}

export default SelectFieldBase;
