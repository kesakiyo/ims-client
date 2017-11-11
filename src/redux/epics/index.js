/* Exteranl dependencies */
import { combineEpics } from 'redux-observable';

/* Internal dependencies */
import user from './user';
import board from './board';

export default combineEpics(
  user,
  board
);