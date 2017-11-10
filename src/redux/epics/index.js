/* Exteranl dependencies */
import { combineEpics } from 'redux-observable';

/* Internal dependencies */
import user from './user';

export default combineEpics(
  user
);