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
import notification from '../../services/notification';

@reduxForm({
  form: 'sessionUpdate',
})
class SignInForm extends React.Component {

  componentWillMount() {
    this.props.initialize({
      email: this.props.session.email || '',
      name: this.props.session.name || '',
      mobileNumber: this.props.session.mobileNumber || '',
    })
  }

  @autobind
  renderEmailField(fields) {
    const { input, meta } = fields;
    return (
      <div className={styles.row}>
        <Input
          disabled={this.props.session.published}
          placeholder="이메일"
          autoFocus
          className={styles.input}
          value={input.value}
          hasError={meta.invalid}
          onChange={input.onChange}>
          {meta.error}
        </Input>
        <div className={styles.description}>
          지원 결과 및 공지사항을 받을 이메일 주소입니다.
        </div>
      </div>
    );
  }

  @autobind
  renderNameField(fields) {
    const { input, meta } = fields;
    return (
      <div className={styles.row}>
        <Input
          disabled={this.props.session.published}
          placeholder="이름 (에: 홍길동)"
          autoFocus
          className={styles.input}
          value={input.value}
          hasError={meta.invalid}
          onChange={input.onChange}>
          {meta.error}
        </Input>
        <div className={styles.description}>
          지원자의 이름입니다.
        </div>
      </div>
    );
  }

  @autobind
  renderMobileNumberField(fields) {
    const { input, meta } = fields;
    return (
      <div className={styles.row}>
        <Input
          disabled={this.props.session.published}
          placeholder="핸드폰 번호"
          className={styles.input}
          value={input.value}
          hasError={meta.invalid}
          onChange={input.onChange}>
          {meta.error}
        </Input>
        <div className={styles.description}>
          연락 가능한 핸드폰 번호 입니다.
        </div>
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
        notification.success('성공적으로 정보를 저장했습니다.');
        this.props.initialize({
          email: action.payload.session.email,
          name: action.payload.session.name,
          mobileNumber: action.payload.session.mobileNumber,
        })
      })
      .catch((action) => {
        notification.error('정보저장에 실패했습니다.');
        const errors = selectn('payload.body.errors', action);
        throw new SubmissionError(errorParser.formError(errors).toJS());
      });
  }

  renderSubmitButton() {
    if (this.props.dirty) {
      return (
        <Button
          loading={this.props.submitting}
          className={styles.button}
          type="submit">
          저장
        </Button>
      )
    }
    return null;
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="email" component={this.renderEmailField} />
        <Field name="name" component={this.renderNameField} />
        <Field name="mobileNumber" component={this.renderMobileNumberField} />
        {this.renderSubmitButton()}
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