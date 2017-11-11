/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';

/* Internal dependencies */
import styles from './styles.scss';
import userActions from '../../redux/actions/user';
import selectors from '../../redux/selectors';
import Loader from '../../elements/Loader';

const mapStateToProps = (state) => ({
  isLoading: selectors.loading.App(state),
})

@connect(mapStateToProps)
class App extends React.Component {

  componentWillMount() {
    this.props.dispatch(userActions.getMe());
  }

  renderBody() {
    if (this.props.isLoading) {
      return <Loader />
    }
    return this.props.children;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderBody()}
      </div>
    )
  }
}

export default App;