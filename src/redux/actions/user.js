/* Internal dependencies */
import { actionCreatorWithPromise } from './utils';
import AT from '../../constants/ActionTypes';

export default {
  signIn: actionCreatorWithPromise(AT.REQUEST_SIGN_IN),
  signUp: actionCreatorWithPromise(AT.REQUEST_SIGN_UP),
}