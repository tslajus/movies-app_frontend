type Styles = {
  control?: (provided: any, state: any) => any;
  option?: (provided: any, state: any) => any;
  menu?: (provided: any, state: any) => any;
  placeholder?: (provided: any, state: any) => any;
  clearIndicator?: (provided: any, state: any) => any;
  container?: (provided: any, state: any) => any;
  dropdownIndicator?: (provided: any, state: any) => any;
  group?: (provided: any, state: any) => any;
  groupHeading?: (provided: any, state: any) => any;
  indicatorsContainer?: (provided: any, state: any) => any;
  indicatorSeparator?: (provided: any, state: any) => any;
  input?: (provided: any, state: any) => any;
  loadingIndicator?: (provided: any, state: any) => any;
  loadingMessage?: (provided: any, state: any) => any;
  menuList?: (provided: any, state: any) => any;
  menuPortal?: (provided: any, state: any) => any;
  multiValue?: (provided: any, state: any) => any;
  multiValueLabel?: (provided: any, state: any) => any;
  multiValueRemove?: (provided: any, state: any) => any;
  noOptionsMessage?: (provided: any, state: any) => any;
  singleValue?: (provided: any, state: any) => any;
  valueContainer?: (provided: any, state: any) => any;
};

export const selectFieldStyles: Styles = {
  clearIndicator: (styles) => ({ ...styles, display: 'none' }),
  container: (styles) => ({ ...styles, flex: '1' }),
  control: (styles, state) => ({
    ...styles,
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-font)',
    borderRadius: '3px',
    fontSize: '1.4rem',
    ':hover': {
      border: state.isFocused && '1px solid var(--color-secondary)',
      outline: state.isFocused && '1px solid var(--color-secondary)',
    },
    ...(state.isFocused && {
      border: '1px solid var(--color-secondary)',
      outline: '1px solid var(--color-secondary)',
    }),
  }),
  dropdownIndicator: (styles) => ({ ...styles, color: 'var(--color-placeholder)', padding: '0 1rem', ':hover': { color: 'var(--color-font-dark)' } }),
  indicatorSeparator: (styles) => ({ ...styles, backgroundColor: 'var(--color-font)', margin: '.8rem 0' }),
  input: (styles) => ({ ...styles, color: 'var(--color-font)' }),
  menu: (styles) => ({ ...styles, backgroundColor: 'none', backdropFilter: 'saturate(200%) blur(4rem)', borderRadius: 'none', transform: 'translateY(.5rem)' }),
  multiValue: (styles) => ({ ...styles, backgroundColor: 'var(--color-secondary)', fontSize: '1.4rem' }),
  multiValueLabel: (styles) => ({ ...styles, padding: '.1rem' }),
  multiValueRemove: (styles) => ({ ...styles, color: 'var(--color-font-dark)' }),
  option: (styles) => ({
    ...styles,
    backgroundColor: 'none',
    padding: '.8rem 1.5rem',
    fontSize: '1.4rem',
    ':hover': { backgroundColor: 'var(--color-secondary)', color: 'var(--color-font-dark)' },
  }),
  noOptionsMessage: (styles) => ({ ...styles, backgroundFilter: 'none', color: 'var(--color-font)', fontSize: '1.4rem' }),
  placeholder: (styles) => ({ ...styles, color: 'var(--color-placeholder)', fontSize: '1.4rem' }),
  singleValue: (styles) => ({ ...styles, color: 'var(--color-font)' }),
  valueContainer: (styles, state) => ({
    ...styles,
    margin: '0 .5rem',
    ...(state.isSelected && {
      color: 'var(--color-font)',
    }),
  }),
};
