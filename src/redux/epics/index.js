/* Exteranl dependencies */
import { combineEpics } from 'redux-observable';

/* Internal dependencies */
import user from './user';
import board from './board';
import session from './session';
import question from './question';
import answer from './answer';

export default combineEpics(
  user,
  board,
  session,
  question,
  answer
);