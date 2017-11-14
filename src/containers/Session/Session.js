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
  session: selectors.session.getSession(state),
})

@connect(mapStateToProps)
class Session extends React.Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <SessionForm session={this.props.session} />
        </div>
      </div>
    )
  }
}

export default Session;