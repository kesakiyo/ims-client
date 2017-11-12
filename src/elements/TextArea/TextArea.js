/* External dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/* Internal dependnecies */
import styles from './styles.scss';

class TextArea extends React.Component {
  constructor() {
    super();
    this._refs = {};
  }

  componentDidMount() {
    if (this.props.autoFocus && this._refs.input) {
      this._refs.input.focus();
      const length = (this._refs.input.value || '').length
      this._refs.input.setSelectionRange(length, length);
    }
  }

  render() {
    const { children, className, autoFocus, hasError, ...props } = this.props
    return (
      <div className={classNames(styles.wrapper, { [styles.error]: this.props.hasError }, className)}>
        <textarea
          ref={(e) => this._refs.input = e}
          className={classNames(styles.input, { [styles.error]: this.props.hasError })}
          {...props} />
        {children}
      </div>
    )
  }
}

TextArea.propTypes = {
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}

TextArea.defaultProps = {
  onChange: () => {},
  hasError: false,
  autoFocus: false,
}

export default TextArea;