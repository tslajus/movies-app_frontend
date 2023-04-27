import { InputController } from 'components';
import * as Yup from 'yup';

type SignUpFieldsProps = {
  errors: {
    name?: string;
    email?: string;
    password?: string;
  };
  touched: {
    name?: boolean;
    email?: boolean;
    password?: boolean;
  };
};

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Name must be at least 3 characters').max(50, 'Name must be at most 50 characters').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'At least one uppercase letter required')
    .matches(/[0-9]/, 'At least one number required')
    .matches(/[!#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~]/, 'At least one special character required')
    .required('Required'),
});

export const signUpInitialValues = {
  name: '',
  email: '',
  password: '',
};

export const SignUpFields: React.FC<SignUpFieldsProps> = ({ errors, touched }) => {
  return (
    <>
      <InputController control="textInput" error={errors.name} label="Full name" name="name" placeholder="Enter full name" touched={touched.name} type="text" />

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
