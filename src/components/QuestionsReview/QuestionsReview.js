/* External dependencies */
import React from 'react';
import classNames from 'classnames';
import selectn from 'selectn';

/* Internal dependencies */
import styles from './styles.scss';
import QuestionTypes from '../../constants/QuestionTypes';

class QuestionsReview extends React.Component {

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
          <div className={styles.answer}>
            {
              (() => {
                if (question.type === QuestionTypes.TEXT) {
                  return selectn('answer.text', question);
                } else if (question.type === QuestionTypes.FILE) {
                  const fileName = selectn('answer.file.name', question)
                  if (fileName) {
                    return `${fileName}을(를) 업로드 했습니다.`;
                  }
                  return '업로드 된 파일이 없습니다.';
                }
                return null;
              })()
            }
          </div>
          {
            (() => {
              if (question.type === QuestionTypes.TEXT) {
                return (
                  <div className={styles.footer}>
                    <div className={styles.notice}>
                      {`(${(question.answer.text || '').length} / ${question.limit})`}
                    </div>
                  </div>
                )
                return null;
              }
            })()
          }
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