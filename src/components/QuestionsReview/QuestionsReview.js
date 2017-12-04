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
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Session from '../../models/Session';
import Score from '../../models/Score';

class QuestionsReview extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    if (this.props.session.isInterviewer()) {
      const answeredQuestions = this.props.questions.filter(question => question.hasAnswer());
      const scores = answeredQuestions.reduce((prev, question) => ({
        ...prev,
        [question.answer.id]: question.answer.scores.find(score => score.createdUserId === this.props.session.userId, null, new Score()).value || '0',
      }), {});
      this.setState(scores);
    }
  }

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

  renderEvluationForm(question) {
    if (this.props.session.isInterviewer() && question.hasAnswer()) {
      const handleChangeValue = (event) => this.setState({ [question.answer.id]: event.target.value.replace(/\D/g, '') })
      const handleEvluateAnswer = (event) => this.props.onEvaluateAnswer(question.answer.id, this.state[question.answer.id])
      return (
        <div className={styles.evaluate}>
          <Input
            className={styles.input}
            placeholder="숫자만 입력해주세요"
            onChange={handleChangeValue}
            value={this.state[question.answer.id]} />
          <Button className={styles.button} onClick={handleEvluateAnswer}>
            평가하기
          </Button>
        </div>
      )
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
          {this.renderEvluationForm(question)}
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
  session: PropTypes.instanceOf(Session),
  questions: PropTypes.instanceOf(Immutable.List),
  onEvaluateAnswer: PropTypes.func,
}

QuestionsReview.defaultProps = {
  session: new Session(),
  questions: Immutable.List(),
  onEvaluateAnswer: () => {},
}

export default QuestionsReview;