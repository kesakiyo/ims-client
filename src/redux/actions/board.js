/* Internal dependencies */
import { actionCreator, actionCreatorWithPromise } from './utils';
import AT from '../../constants/ActionTypes';

export default {
  join: actionCreator(AT.REQUEST_JOIN_BOARD),
  getSessions: actionCreator(AT.REQUEST_GET_SESSIONS),
  invite: actionCreatorWithPromise(AT.REQUEST_INVITE_BOARD),
  getAnswers: actionCreator(AT.REQUEST_GET_ANSWERS),
}
