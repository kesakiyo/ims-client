/* External dependencies */
import Immutable from 'immutable';

/* Internal dependencies */
import notification from '../services/notification';

export const showError = (error = {}) => {
  if (error.field && error.message) {
    notification.error(error.message)
  }
}

export const formError = (errors = []) => {
  return Immutable.fromJS(errors.reduce((prev, error) => ({
    ...prev,
    [error.field]: error.message,
  }), {}))
}