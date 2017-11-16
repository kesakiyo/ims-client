/* External dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keyMirror from 'keymirror';

/* Internal dependnecies */
import styles from './styles.scss';

const TYPES = keyMirror({
  DEFAULT: null,
  BORDER: null,
})

class Button extends React.Component {

  getButtonClassName(buttonType = this.props.buttonType) {
    return classNames(
      styles.button,
      {
        [styles.default]: buttonType === TYPES.DEFAULT,
        [styles.border]: buttonType === TYPES.BORDER,
      }
    )
  }

  getLoaderStyle(size = this.props.loaderSize) {
    return {
      width: `${size}px`,
      height: `${size}px`,
    }
  }

  render() {
    const { buttonType, loaderSize, disabled, loading, className, children, type, ...props } = this.props;
    return (
      <button
        {...props}
        disabled={disabled || loading}
        className={classNames(this.getButtonClassName(buttonType), className)}
        type={type}>
        {loading ? <div className={styles.spinner} style={this.getLoaderStyle(loaderSize)} /> : null}
        {children}
      </button>
    )
  }
}

Button.TYPES = TYPES;

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  loaderSize: PropTypes.number,
  buttonType: PropTypes.string,
}

Button.defaultProps = {
  className: '',
  type: '',
  loading: false,
  loaderSize: 25,
  buttonType: TYPES.DEFAULT,
}

export default Button;