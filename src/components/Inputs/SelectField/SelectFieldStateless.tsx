import Select from 'react-select';

import { selectFieldStyles } from './SelectFieldStyles';

function SelectFieldStateless({ options, placeholder, isMulti = false }: SelectField) {
  return <Select isMulti={isMulti} options={options} placeholder={placeholder} styles={selectFieldStyles} />;
}

export default SelectFieldStateless;
