/* External dependencies */
import Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

/* Internal dependencies */
import AT from '../../constants/ActionTypes';
import questionAPI from '../../apis/question';

const getListEpic = action$ => (
  action$.ofType(AT.REQUEST_GET_QUESTIONS)
    .switchMap(action =>
      Rx.Observable.fromPromise(questionAPI.getList(action.payload.interviewId))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_GET_QUESTIONS_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_GET_QUESTIONS_ERROR,
          payload,
        }))
    )
);

export default combineEpics(
  getListEpic,
);