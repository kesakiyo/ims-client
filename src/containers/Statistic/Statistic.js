/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';
import autobind from 'core-decorators/lib/autobind';
import moment from 'moment';

/* Internal dependencies */
import styles from './styles.scss';
import boardActions from '../../redux/actions/board';
import selectors from '../../redux/selectors';
import withPreloader from '../../decorators/withPreloader';
import Button from '../../elements/Button';
import Modal from '../../elements/Modal';
import SessionReview from '../../components/SessionReview';
import QuestionsReview from '../../components/QuestionsReview';
import notification from '../../services/notification';
import errorParser from '../../utils/errorParser';

const initializer = (prevProps, props, dispatch) => {
  const prevId = selectn('params.id', prevProps);
  const id = selectn('params.id', props);

  if (prevId !== id) {
    dispatch(boardActions.getSessions({ id }));
    return true;
  }

  return false;
}

const mapStateToProps = (state) => ({
  interviewees: selectors.sessions.getInterviewees(state),
})

@withPreloader({
  initializer,
  isLoading: selectors.loading.Statistic,
})
@connect(mapStateToProps)
class Statistic extends React.Component {

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className={styles.card}>
          총 제출 예정
          <div className={styles.number}>
            {`${this.props.interviewees.size}명`}
          </div>
        </div>
        <div className={styles.card}>
          제출 완료
          <div className={styles.number}>
            {`${this.props.interviewees.filter(interviewee => interviewee.published).size}명`}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderHeader()}
      </div>
    )
  }
}

export default Statistic;