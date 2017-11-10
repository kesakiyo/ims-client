/* External dependencies */
import React from 'react';
import { reduxForm } from 'redux-form';

/* Intern dependnecies */
import SignInForm from '../../components/SignInForm';

class SignIn extends React.Component {
  render() {
    return (
      <div>
        <SignInForm />
      </div>
    )
  }
}

export default SignIn;