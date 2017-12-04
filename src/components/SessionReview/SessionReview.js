/* External dependencies */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/* Internal dependencies */
import styles from './styles.scss';
import Session from '../../models/Session';

class SessionReview extends React.Component {

  renderSessionRow(label, value) {
    const notSetValue = !this.props.readOnly && !value;
    return (
      <div className={styles.row}>
        <div className={styles.label}>
          {label}
        </div>
        <div className={styles.content}>
          <div className={classNames(styles.value, { [styles.error]: notSetValue })}>
            {value}
          </div>
          <div className={styles.meta}>
            {notSetValue ? `${label}을(를) 빈 채로 제출할 수 없습니다.` : null}
          </div>
        </div>
    </div>
    )
  }

  renderSession(session = this.props.session) {
    const { email, name, mobileNumber } = session
    return (
      <div className={styles.form}>
        <div className={styles.title}>
          지원자 정보
        </div>
        <div className={styles.session}>
          {this.renderSessionRow('이메일', email)}
          {this.renderSessionRow('이름', name)}
          {this.renderSessionRow('연락처', mobileNumber)}
        </div>
      </div>
    )
  }

  render() {
    return this.renderSession();
  }
}

SessionReview.propTypes = {
  readOnly: PropTypes.bool,
  session: PropTypes.instanceOf(Session),
}

SessionReview.defaultProps = {
  readOnly: false,
  session: new Session(),
}

export default SessionReview;