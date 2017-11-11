/* External dependencies */
import React from 'react';

/* Internal dependencies */
import styles from './styles.scss';

class App extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.children}
      </div>
    )
  }
}

export default App;