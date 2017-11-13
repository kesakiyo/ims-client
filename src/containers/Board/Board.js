/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';

/* Internal dependencies */
import styles from './styles.scss';
import boardActions from '../../redux/actions/board';
import withPreloader from '../../decorators/withPreloader';
import selectors from '../../redux/selectors';
import Link from '../../elements/Link';

const initializer = (prevProps, props, dispatch) => {
  const prevId = selectn('params.id', prevProps)
  const id = selectn('params.id', props)

  if (prevId !== id) {
    dispatch(boardActions.join({ id }));
    return true;
  }

  return false;
}

@withPreloader({
  initializer,
  isLoading: selectors.loading.Board,
})
class Board extends React.Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Link
            to={`/boards/${this.props.params.id}/session`}
            className={styles.item}
            activeClassName={styles.active}>
            지원자 정보
          </Link>
          <Link
            to={`/boards/${this.props.params.id}/questions`}
            className={styles.item}
            activeClassName={styles.active}>
            질문 목록
          </Link>
          <Link
            to={`/boards/${this.props.params.id}/publishing`}
            className={styles.item}
            activeClassName={styles.active}>
            최종 제출
          </Link>
        </div>
        <div className={styles.body}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Board;