/* External dependencies */
import Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

/* Internal dependencies */
import AT from '../../constants/ActionTypes';
import sessionAPI from '../../apis/session';

const updateEpic = action$ => (
  action$.ofType(AT.REQUEST_UPDATE_SESSION)
    .switchMap(action =>
      Rx.Observable.fromPromise(sessionAPI.update(action.payload.id, action.payload.session))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_UPDATE_SESSION_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_UPDATE_SESSION_ERROR,
          payload,
        }))
    )
);

export default combineEpics(
  updateEpic,
);