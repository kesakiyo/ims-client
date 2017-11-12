/* Internal dependencies */
import { actionCreator } from './utils';
import AT from '../../constants/ActionTypes';

export default {
  getList: actionCreator(AT.REQUEST_GET_QUESTIONS),
}
