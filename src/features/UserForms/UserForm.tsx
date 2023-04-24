import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, ButtonUnderline } from 'components';
import { userSignUp } from 'api/user';

import { SignUpFields, SignUpSchema, signUpInitialValues } from './SignUpForm/SignUpForm';
import { LoginFields, LoginSchema, loginInitialValues } from './LoginForm/LoginForm';
import styles from './UserForm.module.css';

type SignUp = {
  name?: string;
  email: string;
  password: string;
};

type UserForm = {
  closeModal: () => void;
};

const UserForm = ({ closeModal }: UserForm) => {
  const [currentForm, setCurrentForm] = useState<'signup' | 'login'>('signup');
  const toggleForm = () => {
    setCurrentForm((prevForm) => (prevForm === 'signup' ? 'login' : 'signup'));
  };

  return (
    <Formik
      initialValues={currentForm === 'signup' ? signUpInitialValues : loginInitialValues}
      validationSchema={currentForm === 'signup' ? SignUpSchema : LoginSchema}
      onSubmit={async (values: SignUp, { resetForm }) => {
        if (currentForm === 'signup') {
          if (values.name) {
            await userSignUp(values.name, values.email, values.password);
            resetForm();
            setCurrentForm('login');
          }
        } else {
          console.log('Login values:', values);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form} id="user-form">
          <span className={styles.header}>Please {currentForm === 'signup' ? 'sign-up' : 'login'}</span>

          <div className={styles.fields}>
            {currentForm === 'signup' ? <SignUpFields errors={errors} touched={touched} /> : <LoginFields errors={errors} touched={touched} />}

            <div className={styles.question}>
              {currentForm === 'signup' ? 'Already a user?' : 'Not a user yet?'}
              <button className={styles.toggleBtn} type="button" onClick={toggleForm}>
                {currentForm === 'signup' ? 'Sign-in!' : 'Sign-up!'}
              </button>
            </div>
          </div>

          <div className={styles.footer}>
            <ButtonUnderline text="Cancel" onClick={closeModal} /> <Button text={currentForm === 'signup' ? 'Sign Up' : 'Login'} type="submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
