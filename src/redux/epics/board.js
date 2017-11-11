/* External dependencies */
import Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

/* Internal dependencies */
import AT from '../../constants/ActionTypes';
import boardAPI from '../../apis/board';

const joinEpic = action$ => (
  action$.ofType(AT.REQUEST_JOIN_BOARD)
    .switchMap(action =>
      Rx.Observable.fromPromise(boardAPI.join(action.payload.id))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_JOIN_BOARD_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_JOIN_BOARD_ERROR,
          payload,
        }))
    )
);

export default combineEpics(
  joinEpic,
);