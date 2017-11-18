/* External dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'core-decorators/lib/autobind';

/* Internal dependnecies */
import styles from './styles.scss';

class Radio extends React.Component {

  @autobind
  handleClick() {
    if (!this.props.disabled) {
      this.props.onClick(this.props.label);
    }
  }

  render() {
    const { onClick, className, buttonClassName, selected, disabled, label, ...props } = this.props;
    return (
      <div
        {...props}
        onClick={this.handleClick}
        className={classNames(styles.wrapper, { [styles.selected]: selected, [styles.disabled]: disabled }, className)}>
        <div className={styles.button} />
        {label}
      </div>
    )
  }
}

Radio.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  selected: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
}

Radio.defaultProps = {
  disabled: false,
  className: '',
  buttonClassName: '',
  selected: false,
  label: '',
  onClick: () => {},
}

export default Radio;