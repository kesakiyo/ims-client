/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';
import autobind from 'core-decorators/lib/autobind';
import PropTypes from 'prop-types';

/* Internal dependencies */
import styles from './styles.scss';
import selectors from '../../redux/selectors';
import boardActions from '../../redux/actions/board';
import withPreloader from '../../decorators/withPreloader';
import SessionReview from '../../components/SessionReview';
import QuestionsReview from '../../components/QuestionsReview';
import notification from '../../services/notification';
import errorParser from '../../utils/errorParser';
import Session from '../../models/Session';

const initializer = (prevProps, props, dispatch) => {
  const prevUserId = selectn('userId', prevProps);
  const userId = selectn('userId', props);

  const prevInterviewId = selectn('interviewId', prevProps);
  const interviewId = selectn('interviewId', props);

  const needToUpdate = ((prevUserId !== userId) && userId) || ((prevInterviewId !== interviewId) && interviewId);

  if (needToUpdate) {
    const payload = {
      id: interviewId,
      userId,
    }
    dispatch(boardActions.getAnswers(payload));
    return true;
  }

  return false;
}

const mapStateToProps = (state) => ({
  questions: selectors.questions.getFetchedQuestions(state),
})

@withPreloader({
  initializer,
  isLoading: selectors.loading.EvaluationModal,
})
@connect(mapStateToProps)
class EvaluationModal extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className={styles.body}>
        <SessionReview session={this.props.interviewee} />
        <div className={styles.divider} />
        <div className={styles.content}>
          <QuestionsReview questions={this.props.questions} />
        </div>
      </div>
    )
  }
}

EvaluationModal.propsTypes = {
  userId: PropTypes.number,
  interviewId: PropTypes.number,
  interviewee: PropTypes.instanceOf(Session),
}

EvaluationModal.defalutProps = {
  userId: 0,
  interviewId: 0,
  interviewee: PropTypes.instanceOf(Session),
}

export default EvaluationModal;