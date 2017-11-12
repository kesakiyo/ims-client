/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, formValueSelector } from 'redux-form';
import autobind from 'core-decorators/lib/autobind';
import selectn from 'selectn';
import PropTypes from 'prop-types';

/* Internal dependencies */
import styles from './styles.scss';
import TextArea from '../../elements/TextArea';
import Button from '../../elements/Button';
import Link from '../../elements/Link';
import questionActions from '../../redux/actions/question';
import * as errorParser from '../../utils/errorParser';

@reduxForm()
@connect((state, ownProps) => ({
  formText: formValueSelector(ownProps.form)(state, 'text'),
}))
class QuestionForm extends React.Component {

  componentWillMount() {
    this.props.initialize({
      text: this.props.question.text || '',
    });
  }

  @autobind
  isPossibleSubmit() {
    return this.props.dirty;
  }

  @autobind
  renderTextField(fields) {
    const { input, meta } = fields;
    return (
      <TextArea
        placeholder={`답변을 입력해 주세요. 최대 ${this.props.question.limit}자까지 가능합니다.`}
        maxLength={this.props.question.limit}
        className={styles.answer}
        autoFocus={this.props.autoFocus}
        value={input.value}
        hasError={meta.invalid}
        onChange={input.onChange}>
        {meta.error}
      </TextArea>
    );
  }

  @autobind
  handleSubmit(answer, dispatch) {
    if (this.isPossibleSubmit()) {
      const payload = {
        id: this.props.question.id,
        answer,
      }

      return dispatch(questionActions.upsertAnswer(payload))
        .promise
        .then((action) => {

        })
        .catch((action) => {
          const errors = selectn('payload.body.errors', action);
          throw new SubmissionError(errorParser.formError(errors).toJS());
        });
    }

    return null;
  }

  renderSubmitButton() {
    if (this.isPossibleSubmit()) {
      return (
        <Button className={styles.button} type="submit">
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
        <div className={styles.gutter}>
          {`${this.props.index + 1}.`}
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            {this.props.question.title}
          </div>
          <Field name="text" component={this.renderTextField} />
          <div className={styles.footer}>
            <div className={styles.notice}>
              {`(${(this.props.formText || '').length} / ${this.props.question.limit})`}
            </div>
            <div className={styles.buttonArea}>
              {this.renderSubmitButton()}
            </div>
          </div>
        </div>
      </form>
    )
  }
}

QuestionForm.propTypes = {
  autoFocus: PropTypes.bool,
  index: PropTypes.number,
}

QuestionForm.defaultProps = {
  autoFocus: false,
  index: 0,
}

export default QuestionForm;