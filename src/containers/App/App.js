/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';

/* Internal dependencies */
import styles from './styles.scss';
import userActions from '../../redux/actions/user';

@connect()
class App extends React.Component {

  componentWillMount() {
    this.props.dispatch(userActions.getMe())
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.children}
      </div>
    )
  }
}

export default App;