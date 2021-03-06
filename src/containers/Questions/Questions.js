/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';
import moment from 'moment';
import autobind from 'core-decorators/lib/autobind';

/* Internal dependencies */
import styles from './styles.scss';
import questionActions from '../../redux/actions/question';
import selectors from '../../redux/selectors';
import withPreloader from '../../decorators/withPreloader';
import QuestionForm from '../../components/QuestionForm';
import RadioForm from '../../components/RadioForm';
import FileUploadForm from '../../components/FileUploadForm';
import QuestionTypes from '../../constants/QuestionTypes';

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
  board: selectors.board.getBoard(state),
  session: selectors.session.getSession(state),
  questions: selectors.questions.getFetchedQuestions(state),
})

@withPreloader({
  initializer,
  isLoading: selectors.loading.Questions,
})
@connect(mapStateToProps)
class Questions extends React.Component {

  @autobind
  renderQuestion(question, index) {
    if (question.isFile()) {
      return (
        <FileUploadForm
          disabled={this.props.session.published}
          index={index}
          key={question.id}
          question={question} />
      )
    } else if (question.isText()) {
      return (
        <QuestionForm
          disabled={this.props.session.published}
          autoFocus={index === 0}
          index={index}
          key={question.id}
          form={`question-${question.id}`}
          question={question} />
      )
    } else if (question.isRadio()) {
      return (
        <RadioForm
          disabled={this.props.session.published}
          index={index}
          key={question.id}
          question={question} />
      )
    }
    return null;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.questions.map(this.renderQuestion)}
      </div>
    )
  }
}

export default Questions;