import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useProfile } from 'providers/ProfileProvider';
import { Button, ButtonUnderline, UserFormLoader } from 'components';
import { userSignUp, userLogin } from 'api/user';

import { SignUpFields, SignUpSchema, signUpInitialValues } from './SignUpForm/SignUpForm';
import { LoginFields, LoginSchema, loginInitialValues } from './LoginForm/LoginForm';
import styles from './UserForm.module.css';

type UserForm = {
  closeModal: () => void;
};

const UserForm = ({ closeModal }: UserForm) => {
  const [currentForm, setCurrentForm] = useState<'signup' | 'login'>('signup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useProfile();

  const toggleForm = () => {
    setCurrentForm((prevForm) => (prevForm === 'signup' ? 'login' : 'signup'));
    setErrorMessage(null);
    setWelcomeMessage(null);
  };

  return (
    <Formik
      initialValues={currentForm === 'signup' ? signUpInitialValues : loginInitialValues}
      validationSchema={currentForm === 'signup' ? SignUpSchema : LoginSchema}
      onSubmit={async (values: UserFormValues) => {
        setIsSubmitting(true);
        setErrorMessage(null);

        if (currentForm === 'signup') {
          if (values.name) {
            const signUpResult = await userSignUp(values.name, values.email, values.password);

            if (signUpResult.success) {
              setWelcomeMessage(`Welcome ${values.name}, please login with your new credentials`);
              setCurrentForm('login');
            } else {
              setErrorMessage(signUpResult.message);
            }
          }
        } else {
          const loginResult = await userLogin(values.email, values.password);
          if (loginResult.success) {
            login(values.email, values.password);
            closeModal();
          } else {
            setErrorMessage(loginResult.message);
          }
        }
        setIsSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form} id="user-form">
          <div className={styles.header}>
            <span>Please {currentForm === 'signup' ? 'sign-up' : 'login'}</span>
            {welcomeMessage && <span className={styles.welcome}>{welcomeMessage}</span>}
          </div>

          {isSubmitting ? (
            <UserFormLoader />
          ) : (
            <div className={styles.fields}>
              {currentForm === 'signup' ? <SignUpFields errors={errors} touched={touched} /> : <LoginFields errors={errors} touched={touched} />}

              <div className={styles.question}>
                {currentForm === 'signup' ? 'Already a user?' : 'Not a user yet?'}
                <button className={styles.toggleBtn} type="button" onClick={toggleForm}>
                  {currentForm === 'signup' ? 'Sign-in!' : 'Sign-up!'}
                </button>
              </div>
              {errorMessage && <span className={styles.error}>{errorMessage}</span>}
            </div>
          )}

          <div className={styles.footer}>
            <ButtonUnderline text="Cancel" onClick={closeModal} /> <Button text={currentForm === 'signup' ? 'Sign Up' : 'Login'} type="submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
