/* External dependencies */
import Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

/* Internal dependencies */
import AT from '../../constants/ActionTypes';
import answerAPI from '../../apis/answer';

const evaluateEpic = action$ => (
  action$.ofType(AT.REQUEST_CREATE_SCORE)
    .switchMap(action =>
      Rx.Observable.fromPromise(answerAPI.evaluate(action.payload.id, action.payload.value))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_CREATE_SCORE_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_CREATE_SCORE_ERROR,
          payload,
        }))
    )
);

export default combineEpics(
  evaluateEpic
);