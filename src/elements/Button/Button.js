/* External dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/* Internal dependnecies */
import styles from './styles.scss';

class Button extends React.Component {

  render() {
    return (
      <button
        className={classNames(styles.button, this.props.className)}
        type={this.props.type}>
        {this.props.children}
      </button>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
}

Button.defaultProps = {
  className: '',
  type: '',
}

export default Button;