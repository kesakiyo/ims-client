/* Internal dependencies */
import { actionCreator, actionCreatorWithPromise } from './utils';
import AT from '../../constants/ActionTypes';

export default {
  getList: actionCreator(AT.REQUEST_GET_QUESTIONS),
  upsertAnswer: actionCreatorWithPromise(AT.REQUEST_UPSERT_ANSWER),
}
