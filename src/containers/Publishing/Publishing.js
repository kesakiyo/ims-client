/* External dependencies */
import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import selectn from 'selectn';
import autobind from 'core-decorators/lib/autobind';

/* Internal dependencies */
import styles from './styles.scss';
import questionActions from '../../redux/actions/question';
import selectors from '../../redux/selectors';
import withPreloader from '../../decorators/withPreloader';
import QuestionTypes from '../../constants/QuestionTypes';
import Button from '../../elements/Button';

const initializer = (prevProps, props, dispatch) => {
  const prevId = selectn('params.id', prevProps);
  const id = selectn('params.id', props);

  if (prevId !== id) {
    dispatch(questionActions.getList({ interviewId: id }));
    return true;
  }

  return false;
}

const mapStateToProps = (state) => ({
  session: selectors.session.getSession(state),
  board: selectors.board.getBoard(state),
  questions: selectors.questions.getFetchedQuestions(state),
})

@withPreloader({
  initializer,
  isLoading: selectors.loading.Questions,
})
@connect(mapStateToProps)
class Publishing extends React.Component {

  isDisabled() {
    const { email, name, mobileNumber } = this.props.session

    return !email || !name || !mobileNumber
  }

  renderSessionRow(label, value) {
    return (
      <div className={styles.row}>
        <div className={styles.label}>
          {label}
        </div>
        <div className={styles.content}>
          <div className={classNames(styles.value, { [styles.error]: !value })}>
            {value}
          </div>
          <div className={styles.meta}>
            {!value ? `${label}을(를) 빈 채로 제출할 수 없습니다.` : null}
          </div>
        </div>
    </div>
    )
  }

  renderSession(session = this.props.session) {
    const { email, name, mobileNumber } = session
    return (
      <div className={styles.form}>
        <div className={styles.title}>
          지원자 정보
        </div>
        <div className={styles.session}>
          {this.renderSessionRow('이메일', email)}
          {this.renderSessionRow('이름', name)}
          {this.renderSessionRow('연락처', mobileNumber)}
        </div>
      </div>
    )
  }

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
        {this.renderPublishigButton()}
      </div>
    )
  }

  renderPublishigButton() {
    return (
      <div className={styles.publishing}>
        <Button
          disabled={this.isDisabled()}
          className={styles.button}>
          제출하기
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderSession()}
        <div className={styles.divider} />
        {this.renderQuestions()}
      </div>
    )
  }
}

export default Publishing;