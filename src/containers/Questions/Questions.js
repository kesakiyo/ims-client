/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';

/* Internal dependencies */
import styles from './styles.scss';
import questionActions from '../../redux/actions/question';
import selectors from '../../redux/selectors';
import withPreloader from '../../decorators/withPreloader';
import QuestionForm from '../../components/QuestionForm';

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
  questions: selectors.questions.getFetchedQuestions(state),
})

@withPreloader({
  initializer,
  isLoading: selectors.loading.Questions,
})
@connect(mapStateToProps)
class Questions extends React.Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {this.props.board.title}
        </div>
        <div className={styles.body}>
          {
            this.props.questions.map((question, index) => (
              <QuestionForm
                autoFocus={index === 0}
                index={index}
                key={question.id}
                form={`question-${question.id}`}
                question={question} />
            ))
          }
        </div>
      </div>
    )
  }
}

export default Questions;