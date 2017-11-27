/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import selectn from 'selectn';
import { replace } from 'react-router-redux';

/* Internal dependencies */
import styles from './styles.scss';
import boardActions from '../../redux/actions/board';
import withPreloader from '../../decorators/withPreloader';
import selectors from '../../redux/selectors';
import Link from '../../elements/Link';
import BoardHeader from '../../components/BoardHeader';

const initializer = (prevProps, props, dispatch) => {
  const prevId = selectn('params.id', prevProps)
  const id = selectn('params.id', props)

  if (prevId !== id) {
    dispatch(boardActions.join({ id }));
    return true;
  }

  return false;
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

  componentWillMount() {
    if (!this.props.children) {
      this.props.dispatch(replace(this.getRedicrectUrl()));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.children) {
      this.props.dispatch(replace(this.getRedicrectUrl(nextProps)));
    }
  }

  getRedicrectUrl(props = this.props) {
    const { board, session } = props;
    if (session.isInterviewee()) {
      return `/boards/${board.id}/session`
    }
    return `/boards/${board.id}/statistic`
  }

  renderInterviewerMenu() {
    return (
      <div className={styles.sidebar}>
        <Link
          to={`/boards/${this.props.params.id}/statistic`}
          className={styles.item}
          activeClassName={styles.active}>
          보드 통계
        </Link>
      </div>
    )
  }

  renderIntervieweeMenu() {
    return (
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
    )
  }

  renderMenu(session = this.props.session) {
    if (session.isInterviewee()) {
      return this.renderIntervieweeMenu();
    } else if (session.isInterviewer()) {
      return this.renderInterviewerMenu();
    }
    return null;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderMenu()}
        <div className={styles.body}>
          <BoardHeader board={this.props.board} />
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Board;