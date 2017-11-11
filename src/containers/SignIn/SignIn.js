/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import autobind from 'core-decorators/lib/autobind';

/* Intern dependnecies */
import styles from './styles.scss';
import SignInForm from '../../components/SignInForm';

@connect()
class SignIn extends React.Component {

  @autobind
  handleRedirect(url) {
    this.props.dispatch(push(url));
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <SignInForm onRedirect={this.handleRedirect} />
      </div>
    )
  }
}

export default SignIn;