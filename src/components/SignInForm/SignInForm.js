/* External dependencies */
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import autobind from 'core-decorators/lib/autobind';

/* Internal dependencies */
import userActions from '../../redux/actions/user';

@reduxForm({
  form: 'signIn',
  initialValues: {
    email: '',
    password: '',
  }
})
class SignInForm extends React.Component {

  @autobind
  renderNameField(fields) {
    const { input, meta } = fields
    return (
      <input onChange={input.onChange} />
    )
  }

  @autobind
  renderPasswordField(fields) {
    const { input, meta } = fields
    return (
      <input onChange={input.onChange} />
    )
  }

  @autobind
  handleSubmit(user, dispatch) {
    dispatch(userActions.signIn(user))
      .promise
      .then((user) => {
        console.log('hello user');
        console.log(user);
      })
      .catch((err) => {
        console.log('hello error');
        console.log(err);
      });
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="email" component={this.renderNameField} />
        <Field name="password" component={this.renderPasswordField} />
        <button type="submit">
          로그인
        </button>
      </form>
    )
  }
}

export default SignInForm;