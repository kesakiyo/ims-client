/* External dependencies */
import React from 'react';
import classNames from 'classnames';

/* Internal dependnecies */
import styles from './styles.scss';

class Loader extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.wave}>
          {
            [1, 2, 3, 4, 5].map((num) => (
              <div key={num} className={classNames(styles.rect, styles[`rect${num}`])} />
            ))
          }
        </div>
        <div className={styles.text}>
          Loading...
        </div>
      </div>
    )
  }
}

export default Loader;