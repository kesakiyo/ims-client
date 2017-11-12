/* External dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/* Internal dependnecies */
import styles from './styles.scss';

class Button extends React.Component {

  getLoaderStyle(size = this.props.loaderSize) {
    return {
      width: `${size}px`,
      height: `${size}px`,
    }
  }

  render() {
    return (
      <button
        disabled={this.props.disabled || this.props.loading}
        className={classNames(styles.button, this.props.className)}
        type={this.props.type}>
        {this.props.loading ? <div className={styles.spinner} style={this.getLoaderStyle()} /> : null}
        {this.props.children}
      </button>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  loaderSize: PropTypes.number,
}

Button.defaultProps = {
  className: '',
  type: '',
  loading: false,
  loaderSize: 25,
}

export default Button;