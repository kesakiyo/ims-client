/* Internal dependencies */
import { actionCreatorWithPromise } from './utils';
import AT from '../../constants/ActionTypes';

export default {
  evaluate: actionCreatorWithPromise(AT.REQUEST_CREATE_SCORE),
}
