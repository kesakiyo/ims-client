/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';

/* Internal dependencies */
import styles from './styles.scss';
import questionActions from '../../redux/actions/question';
import selectors from '../../redux/selectors';
import withPreloader from '../../decorators/withPreloader';

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
  questions: selectors.questions.getQuestions(state),
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
          질문 목록이 들어가야 할 곳.
        </div>
      </div>
    )
  }
}

export default Questions;