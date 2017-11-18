/* External dependencies */
import React from 'react';
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
        {selectn('answer.text', question)}
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
          const fileName = selectn('answer.file.name', question)
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
    const selectedValues = selectn('answer.values', question) || []
    return (
      <div className={styles.radioForm}>
        {
          question.values.map((value, index) => (
            <Radio
              key={index}
              label={value}
              className={styles.radio}
              selected={selectedValues.includes(value)}
              disabled />
          ))
        }
      </div>
    )
  }

  renderAnswer(question) {
    switch (question.type) {
      case QuestionTypes.TEXT:
        return this.renderTextAnswer(question);

      case QuestionTypes.FILE:
        return this.renderFileAnswer(question);

      case QuestionTypes.RADIO:
        return this.renderRadioAnswer(question);

      default:
        return null;
    }
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

}

QuestionsReview.defaultProps = {

}

export default QuestionsReview;