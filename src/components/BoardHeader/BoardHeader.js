/* External dependencies */
import React from 'react';
import moment from 'moment';

/* Internal dependencies */
import styles from './styles.scss';

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

}

BoardHeader.defaultProps = {

}

export default BoardHeader;