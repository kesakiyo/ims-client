/* External dependencies */
import React from 'react';
import selectn from 'selectn';
import { connect } from 'react-redux';
import autobind from 'core-decorators/lib/autobind';

/* Internal dependencies */
import styles from './styles.scss';
import boardActions from '../../redux/actions/board';
import questionActions from '../../redux/actions/question';
import selectors from '../../redux/selectors';
import withPreloader from '../../decorators/withPreloader';
import Modal from '../../elements/Modal';
import EvaluationModal from '../../components/EvaluationModal';
import Session from '../../models/Session';

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
  isLoading: selectors.loading.Evaluation,
})
@connect(mapStateToProps)
class Evaluation extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      interviewee: new Session(),
    }
  }

  @autobind
  handleRowClick(interviewee) {
    return () => {
      this.setState({
        showModal: true,
        interviewee,
      })
    }
  }

  @autobind
  handleHide() {
    this.setState({
      showModal: false,
    })
  }

  @autobind
  renderTableRow(interviewee) {
    return (
      <tr key={interviewee.id} onClick={this.handleRowClick(interviewee)}>
        <td>{interviewee.email || '-'}</td>
        <td>{interviewee.name || '-'}</td>
        <td>{interviewee.mobileNumber || '-'}</td>
        <td>{interviewee.published ? 'V' : '-'}</td>
        <td>평가하기</td>
      </tr>
    )
  }

  renderTable() {
    return (
      <table>
        <thead>
          <tr>
            <th>이메일</th>
            <th>이름</th>
            <th>연락처</th>
            <th>최종 제출</th>
            <th>평가하기</th>
          </tr>
        </thead>
        <tbody>
          {this.props.interviewees.map(this.renderTableRow)}
        </tbody>
      </table>
    )
  }

  renderEvaluationModal() {
    return (
      <Modal
        className={styles.modal}
        show={this.state.showModal}
        onHide={this.handleHide}>
        <div className={styles.modalBody}>
          <EvaluationModal
            interviewId={this.state.interviewee.interviewId}
            userId={this.state.interviewee.userId}
            interviewee={this.state.interviewee}/>
        </div>
      </Modal>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderTable()}
        {this.renderEvaluationModal()}
      </div>
    )
  }
}

export default Evaluation;