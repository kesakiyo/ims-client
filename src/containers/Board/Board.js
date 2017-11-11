/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';

/* Internal dependencies */
import styles from './styles.scss';
import boardActions from '../../redux/actions/board';
import withPreloader from '../../decorators/withPreloader';
import selectors from '../../redux/selectors';

const initializer = (prevProps, props, dispatch) => {
  const prevId = selectn('params.id', prevProps)
  const id = selectn('params.id', props)

  if (prevId !== id) {
    dispatch(boardActions.join({ id }));
  }
}

const mapStateToProps = (state) => ({
  board: selectors.board.getBoard(state),
  session: selectors.session.getSession(state),
})

@withPreloader({
  initializer,
  isLoading: selectors.loading.Board,
})
@connect(mapStateToProps)
class Board extends React.Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {this.props.board && this.props.board.title}
        </div>
      </div>
    )
  }
}

export default Board;