/* External dependencies */
import React from 'react';
import autobind from 'core-decorators/lib/autobind';
import selectn from 'selectn';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';

/* Intern dependnecies */
import styles from './styles.scss';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import * as errorParser from '../../utils/errorParser';
import notification from '../../services/notification';

@reduxForm({
  form: 'inviteToBoard',
  initialValues: {
    email: '',
  }
})
class InviteForm extends React.Component {

  @autobind
  handleSubmit(form) {
    return this.props.onInvite(form.email)
      .promise
      .then((action) => {
        notification.success('성공적으로 초대했습니다.');
        this.props.initialize({
          email: '',
        })
      }, (action) => {
        errorParser.showError(selectn('payload.body.error', action));
        const errors = selectn('payload.body.errors', action);
        throw new SubmissionError(errorParser.formError(errors).toJS());
      })
  }

  @autobind
  renderEmailField(fields) {
    const { input, meta } = fields;
    return (
      <div className={styles.row}>
        <Input
          placeholder="이메일"
          autoFocus
          className={styles.input}
          value={input.value}
          hasError={meta.invalid}
          onChange={input.onChange}>
          {meta.error}
        </Input>
      </div>
    );
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>면접관으로 초대하기</div>
        <form className={styles.form} onSubmit={handleSubmit(this.handleSubmit)}>
          <Field name="email" component={this.renderEmailField} />
          <Button
            disabled={pristine}
            loading={this.props.submitting}
            className={styles.button}
            type="submit">
            로그인
          </Button>
      </form>
      </div>
    )
  }
}

InviteForm.propTypes = {
  onInvite: PropTypes.func,
}

InviteForm.defaultProps = {
  onInvite: () => {},
}

export default InviteForm;