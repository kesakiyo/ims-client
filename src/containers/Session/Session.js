/* External dependencies */
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

/* Internal dependencies */
import styles from './styles.scss';
import userActions from '../../redux/actions/user';
import selectors from '../../redux/selectors';
import SessionForm from '../../components/SessionForm';

const mapStateToProps = (state) => ({
  board: selectors.board.getBoard(state),
  session: selectors.session.getSession(state),
})

@connect(mapStateToProps)
class Session extends React.Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.title}>{this.props.board.title}</div>
          <div className={styles.time}>마감 까지 약 {moment(this.props.board.endTime).toNow()}</div>
        </div>
        <div className={styles.body}>
          <SessionForm session={this.props.session} />
        </div>
      </div>
    )
  }
}

export default Session;