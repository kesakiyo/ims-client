/* External dependencies */
import React from 'react';
import { reduxForm } from 'redux-form';

/* Intern dependnecies */
import styles from './styles.scss';
import SignInForm from '../../components/SignInForm';

class SignIn extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <SignInForm />
      </div>
    )
  }
}

export default SignIn;