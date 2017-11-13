/* External dependencies */
import React from 'react';

/* Internal dependencies */
import styles from './styles.scss';

class Publishing extends React.Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <img src={require('../../styles/images/cone.png')} className={styles.image} />
        <div className={styles.title}>
          최종 제출 페이지는 현재 작업중입니다.
        </div>
        <div className={styles.description}>
          최종 제출을 해야 지원이 완료됩니다. <br />
          꼭 최종 제출을 완료해 주시기 바랍니다.
        </div>
      </div>
    )
  }
}

export default Publishing;