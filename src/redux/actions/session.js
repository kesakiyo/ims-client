/* Internal dependencies */
import { actionCreator, actionCreatorWithPromise } from './utils';
import AT from '../../constants/ActionTypes';

export default {
  update: actionCreatorWithPromise(AT.REQUEST_UPDATE_SESSION),
  publish: actionCreatorWithPromise(AT.REQUEST_PUBLISH_SESSION),
}
