/* External dependencies */
import React from 'react';

/* Intern dependnecies */
import styles from './styles.scss';
import SignUpForm from '../../components/SignUpForm';

class SignUp extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <SignUpForm />
      </div>
    )
  }
}

export default SignUp;