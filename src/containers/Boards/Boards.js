/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import autobind from 'core-decorators/lib/autobind';

/* Internal dependencies */
import styles from './styles.scss';
import userActions from '../../redux/actions/user';
import userSelector from '../../redux/selectors/user';
import Link from '../../elements/Link';

const mapStateToProps = (state) => ({
  user: userSelector.getUser(state),
})

@connect(mapStateToProps)
class Boards extends React.Component {

  @autobind
  handleSignOut() {
    this.props.dispatch(userActions.signOut());
  }

  renderHeader() {
    return (
      <div className={styles.greeting}>
        <div className={styles.text}>
          {`안녕하세요. ${this.props.user.email}님`}
        </div>
        <div onClick={this.handleSignOut} className={styles.signout}>
          로그아웃
        </div>
      </div>
    )
  }

  renderBody() {
    return (
      <div className={styles.body}>
        <Link to="/boards/5" className={styles.item}>
          <img
            src={require('../../styles/images/developer.png')}
            className={styles.image} />
          <div className={styles.title}>
            개발자 지원하기
          </div>
        </Link>
        <Link to="/boards/6" className={styles.item}>
          <img
            src={require('../../styles/images/designer.png')}
            className={styles.image} />
          <div className={styles.title}>
            디자이너 지원하기
          </div>
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </div>
    )
  }
}

export default Boards;