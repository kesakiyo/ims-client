/* External dependencies */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

/* Internal dependencies */
import styles from './styles.scss';
import Board from '../../models/Board';

class BoardHeader extends React.Component {

  constructor() {
    super();
    this.intervalId = null;
    this.state = {
      currentTime: +moment(),
    }
  }

  componentWillMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: +moment(),
      })
    }, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getRemainTime() {
    return moment.duration(this.props.board.endTime - this.state.currentTime).format("d [일] h [시간] m [분]")
  }

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          {this.props.board.title}
        </div>
        <div className={styles.time}>
          {`마감까지 약 ${this.getRemainTime()}`}
        </div>
      </div>
    )
  }
}

BoardHeader.propTypes = {
  borad: PropTypes.instanceOf(Board),
}

BoardHeader.defaultProps = {
  board: new Board(),
}

export default BoardHeader;