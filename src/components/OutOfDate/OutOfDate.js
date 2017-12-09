/* External dependencies */
import React from 'react';

/* Internal dependencies */
import styles from './styles.scss';

const OutOfDate = () => (
  <div className={styles.wrapper}>
    <div className={styles.title}>
      12기 지원이 종료되었습니다.
      지원해 주셔서 감사합니다.
    </div>
    <div className={styles.description}>
      서류 결과는 12/13(수)에 개별 메일로 전송될 예정입니다.
    </div>
  </div>
)

export default OutOfDate;