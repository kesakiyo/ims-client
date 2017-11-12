/* External dependencies */
import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import autobind from 'core-decorators/lib/autobind';
import selectn from 'selectn';
import PropTypes from 'prop-types';

/* Internal dependencies */
import styles from './styles.scss';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import Link from '../../elements/Link';
import sessionActions from '../../redux/actions/session';
import * as errorParser from '../../utils/errorParser';

@reduxForm({
  form: 'sessionUpdate',
  initialValues: {
    email: '',
    mobileNumber: '',
  }
})
class SignInForm extends React.Component {

  componentWillMount() {
    this.props.initialize({
      email: this.props.session.email || '',
      mobileNumber: this.props.session.mobileNumber || '',
    })
  }

  @autobind
  renderEmailField(fields) {
    const { input, meta } = fields;
    return (
      <div className={styles.row}>
        <div className={styles.label}>
          이메일
        </div>
        <Input
          placeholder="이메일"
          autoFocus
          value={input.value}
          hasError={meta.invalid}
          onChange={input.onChange}>
          {meta.error}
        </Input>
      </div>
    );
  }

  @autobind
  renderMobileNumberField(fields) {
    const { input, meta } = fields;
    return (
      <div className={styles.row}>
        <div className={styles.label}>
          연락처
        </div>
        <Input
          placeholder="핸드폰 번호"
          value={input.value}
          hasError={meta.invalid}
          onChange={input.onChange}>
          {meta.error}
        </Input>
      </div>
    );
  }

  @autobind
  handleSubmit(session, dispatch) {
    const payload = {
      id: this.props.session.id,
      session,
    }
    return dispatch(sessionActions.update(payload))
      .promise
      .then((action) => {
        console.log('success');
      })
      .catch((action) => {
        const errors = selectn('payload.body.errors', action);
        console.log(errorParser.formError(errors).toJS());
        throw new SubmissionError(errorParser.formError(errors).toJS());
      });
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="email" component={this.renderEmailField} />
        <Field name="mobileNumber" component={this.renderMobileNumberField} />
        <Button className={styles.button} type="submit">
          저장
        </Button>
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