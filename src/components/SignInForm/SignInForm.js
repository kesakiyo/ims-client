/* External dependencies */
import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import autobind from 'core-decorators/lib/autobind';
import selectn from 'selectn';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

/* Internal dependencies */
import styles from './styles.scss';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import Link from '../../elements/Link';
import userActions from '../../redux/actions/user';
import * as errorParser from '../../utils/errorParser';

@reduxForm({
  form: 'signIn',
  initialValues: {
    email: '',
    password: '',
  }
})
class SignInForm extends React.Component {

  @autobind
  renderEmailField(fields) {
    const { input, meta } = fields;
    return (
      <Input
        placeholder="이메일"
        autoFocus
        hasError={meta.invalid}
        onChange={input.onChange}>
        {meta.error}
      </Input>
    );
  }

  @autobind
  renderPasswordField(fields) {
    const { input, meta } = fields;
    return (
      <Input
        type="password"
        placeholder="패스워드"
        hasError={meta.invalid}
        onChange={input.onChange}>
        {meta.error}
      </Input>
    );
  }

  @autobind
  handleSubmit(user, dispatch) {
    return dispatch(userActions.signIn(user))
      .promise
      .then((action) => {
        this.props.onRedirect('/boards');
      })
      .catch((action) => {
        const errors = selectn('payload.body.errors', action);
        throw new SubmissionError(errorParser.formError(errors).toJS());
      });
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit(this.handleSubmit)}>
        <div className={styles.header}>
          로그인
        </div>
        <Field name="email" component={this.renderEmailField} />
        <Field name="password" component={this.renderPasswordField} />
        <Button className={styles.button} type="submit">
          로그인
        </Button>
        <div className={styles.footer}>
          <div className={styles.signin}>
            아직 회원이 아닌가요?
            <Link to="/signup" className={styles.link}>
              회원가입
            </Link>
          </div>
          <Link to="/">
            메인으로
          </Link>
        </div>
      </form>
    )
  }
}

SignInForm.propTypes = {
  onRedirect: PropTypes.func,
}

SignInForm.defaultProps = {
  onRedirect: () => {},
}

export default SignInForm;