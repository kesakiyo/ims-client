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
    passwordConfirm: '',
  }
})
class SignUpForm extends React.Component {

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
  renderPasswordConfirmField(fields) {
    const { input, meta } = fields;
    return (
      <Input
        type="password"
        placeholder="패스워드 확인"
        hasError={meta.invalid}
        onChange={input.onChange}>
        {meta.error}
      </Input>
    );
  }

  @autobind
  handleSubmit(user, dispatch) {
    return dispatch(userActions.signUp(user))
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
          회원가입
        </div>
        <Field name="email" component={this.renderEmailField} />
        <Field name="password" component={this.renderPasswordField} />
        <Field name="passwordConfirm" component={this.renderPasswordConfirmField} />
        <Button className={styles.button} type="submit">
          회원가입
        </Button>
        <div className={styles.signup}>
          이미 아이디가 있나요?
          <Link to="/signin" className={styles.link}>
            로그인
          </Link>
        </div>
      </form>
    )
  }
}

SignUpForm.propTypes = {
  onRedirect: PropTypes.func,
}

SignUpForm.defaultProps = {
  onRedirect: () => {},
}

export default SignUpForm;