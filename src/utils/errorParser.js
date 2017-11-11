/* External dependencies */
import Immutable from 'immutable';

export const formError = (errors = []) => {
  return Immutable.fromJS(errors.reduce((prev, error) => ({
    ...prev,
    [error.field]: error.message,
  }), {}))
}