/* Internal dependencies */
import { actionCreator, actionCreatorWithPromise } from './utils';
import AT from '../../constants/ActionTypes';

export default {
  join: actionCreatorWithPromise(AT.REQUEST_JOIN_BOARD),
}
