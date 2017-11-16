/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';
import autobind from 'core-decorators/lib/autobind';

/* Internal dependencies */
import styles from './styles.scss';
import questionActions from '../../redux/actions/question';
import selectors from '../../redux/selectors';
import withPreloader from '../../decorators/withPreloader';
import Button from '../../elements/Button';
import Modal from '../../elements/Modal';
import SessionReview from '../../components/SessionReview';
import QuestionsReview from '../../components/QuestionsReview';

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
      showModal: false,
    }
  }

  @autobind
  handleSubmit() {
    // todo: 구현해야 할 부분
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
              onClick={this.handleSubmit}
              className={styles.button}>
              제출
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  render() {
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
}

export default Publishing;