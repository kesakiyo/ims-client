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

const getSessionsEpic = action$ => (
  action$.ofType(AT.REQUEST_GET_SESSIONS)
    .switchMap(action =>
      Rx.Observable.fromPromise(boardAPI.getSessions(action.payload.id))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_GET_SESSIONS_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_GET_SESSIONS_ERROR,
          payload,
        }))
    )
);

const inviteEpic = action$ => (
  action$.ofType(AT.REQUEST_INVITE_BOARD)
    .switchMap(action =>
      Rx.Observable.fromPromise(boardAPI.invite(action.payload.id, action.payload.email))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_INVITE_BOARD_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_INVITE_BOARD_ERROR,
          payload,
        }))
    )
);

const getAnswersEpic = action$ => (
  action$.ofType(AT.REQUEST_GET_ANSWERS)
    .switchMap(action =>
      Rx.Observable.fromPromise(boardAPI.getAnswers(action.payload.id, action.payload.userId))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_GET_ANSWERS_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_GET_ANSWERS_ERROR,
          payload,
        }))
    )
);

const getScoresEpic = action$ => (
  action$.ofType(AT.REQUEST_GET_SCORES)
    .switchMap(action =>
      Rx.Observable.fromPromise(boardAPI.getScores(action.payload.id, action.payload.userId))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_GET_SCORES_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_GET_SCORES_ERROR,
          payload,
        }))
    )
);

export default combineEpics(
  joinEpic,
  getSessionsEpic,
  inviteEpic,
  getAnswersEpic,
  getScoresEpic
);