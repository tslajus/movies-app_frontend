import { InputController } from 'components';
import * as Yup from 'yup';

type LoginFieldsProps = {
  errors: {
    email?: string;
    password?: string;
  };
  touched: {
    email?: boolean;
    password?: boolean;
  };
};

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
});

export const loginInitialValues = {
  email: '',
  password: '',
};

export const LoginFields: React.FC<LoginFieldsProps> = ({ errors, touched }) => {
  return (
    <>
      <InputController
        control="textInput"
        error={errors.email}
        label="User email"
        name="email"
        placeholder="Enter user email"
        touched={touched.email}
        type="email"
      />

      <InputController
        control="textInput"
        error={errors.password}
        label="User password"
        name="password"
        placeholder="Enter user password"
        touched={touched.password}
        type="password"
      />
    </>
  );
};
