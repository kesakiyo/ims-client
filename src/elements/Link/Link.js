/* External dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router';

/* Internal dependnecies */
import styles from './styles.scss';

class Link extends React.Component {

  render() {
    return (
      <RouterLink
        {...this.props}
        className={classNames(styles.link, this.props.className)}>
        {this.props.children}
      </RouterLink>
    )
  }
}

Link.propTypes = {
  className: PropTypes.string,
}

Link.defaultProps = {
  className: '',
}

export default Link;