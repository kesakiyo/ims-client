/* External dependencies */
import Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

/* Internal dependencies */
import AT from '../../constants/ActionTypes';
import userAPI from '../../apis/user';

const getUserEpic = action$ => (
  action$.ofType(AT.REQUEST_SIGN_IN)
    .switchMap(action =>
      Rx.Observable.fromPromise(userAPI.signIn(action.payload.email, action.payload.password))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_SIGN_IN_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_SIGN_IN_ERROR,
          payload,
        }))
    )
);

export default combineEpics(
  getUserEpic
);