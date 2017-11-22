/* External dependencies */
import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import selectn from 'selectn';
import autobind from 'core-decorators/lib/autobind';

/* Internal dependencies */
import styles from './styles.scss';
import QuestionTypes from '../../constants/QuestionTypes';
import Radio from '../../elements/Radio';

class QuestionsReview extends React.Component {

  renderTextAnswer(question) {
    const answer = (
      <div key="text" className={styles.answer}>
        {question.answer.text}
      </div>
    );
    const footer = (
      <div key="length" className={styles.footer}>
        <div className={styles.notice}>
          {`(${(question.answer.text || '').length} / ${question.limit})`}
        </div>
      </div>
    );
    return [answer, footer];
  }

  renderFileAnswer(question) {
    return (
      <div className={styles.answer}>
      {
        (() => {
          const fileName = question.answer.getFileName();
          if (fileName) {
            return `${fileName}을(를) 업로드 했습니다.`;
          }
          return '업로드 된 파일이 없습니다.';
        })()
      }
      </div>
    )
  }

  renderRadioAnswer(question) {
    return (
      <div className={styles.radioForm}>
        {
          question.values.map((value, index) => (
            <Radio
              key={index}
              label={value}
              className={styles.radio}
              selected={question.answer.hasValue(value)}
              disabled />
          ))
        }
      </div>
    )
  }

  renderAnswer(question) {
    if (question.isText()) {
      return this.renderTextAnswer(question);
    } else if (question.isFile()) {
      return this.renderFileAnswer(question);
    } else if (question.isRadio()) {
      return this.renderRadioAnswer(question);
    }
    return null;
  }

  @autobind
  renderQuestion(question, idx) {
    return (
      <div key={idx} className={styles.question}>
        <div className={styles.gutter}>
          {`${idx + 1}.`}
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            {question.title}
          </div>
          {this.renderAnswer(question)}
        </div>
      </div>
    )
  }

  renderQuestions(questions = this.props.questions) {
    return (
      <div className={styles.form}>
        <div className={styles.title}>
          질문 목록
        </div>
        <div>
          {questions.map(this.renderQuestion)}
        </div>
      </div>
    )
  }

  render() {
    return this.renderQuestions();
  }
}

QuestionsReview.propTypes = {
  questions: PropTypes.instanceOf(Immutable.List),
}

QuestionsReview.defaultProps = {
  questions: Immutable.List(),
}

export default QuestionsReview;