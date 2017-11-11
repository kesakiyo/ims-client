/* External dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/* Internal dependnecies */
import styles from './styles.scss';

class Input extends React.Component {
  constructor() {
    super();
    this._refs = {};
  }

  componentDidMount() {
    if (this.props.autoFocus && this._refs.input) {
      this._refs.input.focus();
    }
  }

  render() {
    return (
      <div className={classNames(styles.wrapper, { [styles.error]: this.props.hasError })}>
        <input
          ref={(e) => this._refs.input = e}
          className={classNames(styles.input, { [styles.error]: this.props.hasError })}
          placeholder={this.props.placeholder}
          type={this.props.type}
          onChange={this.props.onChange} />
        {this.props.children}
      </div>
    )
  }
}

Input.propTypes = {
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

Input.defaultProps = {
  onChange: () => {},
  hasError: false,
  autoFocus: false,
  placeholder: '',
  type: '',
}

export default Input;