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

const upsertAnswerEpic = action$ => (
  action$.ofType(AT.REQUEST_UPSERT_ANSWER)
    .switchMap(action =>
      Rx.Observable.fromPromise(questionAPI.upsertAnswer(action.payload.id, action.payload.answer))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_UPSERT_ANSWER_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_UPSERT_ANSWER_ERROR,
          payload,
        }))
    )
);

const uploadFileEpic = action$ => (
  action$.ofType(AT.REQUEST_UPLOAD_FILE)
    .switchMap(action => {
      const { id, answerId, blob } = action.payload
      return Rx.Observable.fromPromise(questionAPI.uploadFile(id, answerId, blob))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_UPLOAD_FILE_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_UPLOAD_FILE_ERROR,
          payload,
        }))
    })
);

export default combineEpics(
  getListEpic,
  upsertAnswerEpic,
  uploadFileEpic
);