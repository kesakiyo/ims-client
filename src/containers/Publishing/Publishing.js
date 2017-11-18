/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';
import autobind from 'core-decorators/lib/autobind';
import moment from 'moment';

/* Internal dependencies */
import styles from './styles.scss';
import questionActions from '../../redux/actions/question';
import sessionActions from '../../redux/actions/session';
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

  constructor() {
    super();
    this.state = {
      publishing: false,
      showModal: false,
    }
  }

  @autobind
  handleSubmit() {
    this.setState({ publishing: true });
    this.props.dispatch(sessionActions.publish({ id: this.props.session.id }))
      .promise
      .then((action) => {
        this.setState({
          publishing: false,
          showModal: false,
        });
        notification.success('성공적으로 제출했습니다.');
      }, (action) => {
        this.setState({ publishing: false });
        errorParser.showError(selectn('payload.body.error', action));
      })
  }

  isDisabled() {
    const { email, name, mobileNumber } = this.props.session

    return !email || !name || !mobileNumber
  }

  renderPublishigButton() {
    return (
      <div className={styles.publishing}>
        <Button
          onClick={this.handleShowModal}
          disabled={this.isDisabled()}
          className={styles.button}>
          제출하기
        </Button>
      </div>
    )
  }

  @autobind
  handleShowModal() {
    this.setState({
      showModal: true,
    })
  }

  @autobind
  handleHideModal() {
    this.setState({
      showModal: false,
    })
  }

  rendorConfirmModal() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.handleHideModal} >
        <div className={styles.modal}>
          <div className={styles.description}>
            {'제출을 하면 더 이상 수정할 수 없습니다.\n제출하시겠습니까?'}
          </div>
          <div className={styles.divider} />
          <div className={styles.footer}>
            <Button
              onClick={this.handleHideModal}
              buttonType={Button.TYPES.BORDER}
              className={styles.button}>
              취소
            </Button>
            <Button
              loading={this.state.publishing}
              loaderSize={15}
              onClick={this.handleSubmit}
              className={styles.button}>
              제출
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  renderPublished() {
    return (
      <div className={styles.published}>
        <div className={styles.time}>
          {moment(this.props.session.publishedAt).format('YYYY MMMM Do, a h:mm:ss')}
        </div>
        <div className={styles.description}>
          {'위 시간에 제출을 완료했습니다.\n제출한 뒤에는 답변을 수정할 수 없습니다.'}
        </div>
      </div>
    )
  }

  renderPublishing() {
    return (
      <div className={styles.wrapper}>
        <SessionReview session={this.props.session} />
        <div className={styles.divider} />
        <div className={styles.content}>
          <QuestionsReview questions={this.props.questions} />
          {this.renderPublishigButton()}
        </div>
        {this.rendorConfirmModal()}
      </div>
    )
  }

  render() {
    if (this.props.session.published) {
      return this.renderPublished();
    }
    return this.renderPublishing();
  }
}

export default Publishing;