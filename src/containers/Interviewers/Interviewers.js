/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';
import autobind from 'core-decorators/lib/autobind';

/* Internal dependencies */
import styles from './styles.scss';
import boardActions from '../../redux/actions/board';
import selectors from '../../redux/selectors';
import withPreloader from '../../decorators/withPreloader';
import InviteForm from '../../components/InviteForm';

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
  interviewers: selectors.sessions.getInterviewers(state),
  session: selectors.session.getSession(state),
})

@withPreloader({
  initializer,
  isLoading: selectors.loading.Interviewers,
})
@connect(mapStateToProps)
class Interviewers extends React.Component {

  @autobind
  handleInvite(email) {
    const payload = {
      id: this.props.params.id,
      email,
    }
    return this.props.dispatch(boardActions.invite(payload));
  }

  renderInviteForm() {
    if (this.props.session.isMaster()) {
      return <InviteForm onInvite={this.handleInvite} />
    }
    return null;
  }

  renderRow(interviewer) {
    return (
      <tr key={interviewer.id}>
        <td>{interviewer.email}</td>
        <td>{interviewer.name || '-'}</td>
        <td>{interviewer.mobileNumber || '-'}</td>
        <td>{interviewer.role}</td>
      </tr>
    )
  }

  renderInterviewers() {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>이메일</th>
            <th>이름</th>
            <th>핸드폰번호</th>
            <th>역할</th>
          </tr>
        </thead>
        <tbody>
          {this.props.interviewers.map(this.renderRow)}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderInviteForm()}
        <div className={styles.body}>
          <div className={styles.title}>
            면접관 정보
          </div>
          {this.renderInterviewers()}
        </div>
      </div>
    )
  }
}

export default Interviewers;