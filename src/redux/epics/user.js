/* External dependencies */
import Rx from 'rxjs';
import { combineEpics } from 'redux-observable';

/* Internal dependencies */
import AT from '../../constants/ActionTypes';
import userAPI from '../../apis/user';

const signInEpic = action$ => (
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

const signUpEpic = action$ => (
  action$.ofType(AT.REQUEST_SIGN_UP)
    .switchMap(action =>
      Rx.Observable.fromPromise(userAPI.signUp(action.payload.email, action.payload.password, action.payload.passwordConfirm))
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_SIGN_UP_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_SIGN_UP_ERROR,
          payload,
        }))
    )
);

const signOutEpic = action$ => (
  action$.ofType(AT.REQUEST_SIGN_OUT)
    .switchMap(action =>
      Rx.Observable.fromPromise(userAPI.signOut())
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_SIGN_OUT_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_SIGN_OUT_ERROR,
          payload,
        }))
    )
);

const getMeEpic = action$ => (
  action$.ofType(AT.REQUEST_GET_ME)
    .switchMap(action =>
      Rx.Observable.fromPromise(userAPI.getMe())
        .map(payload => ({
          uuid: action.uuid,
          type: AT.REQUEST_GET_ME_SUCCESS,
          payload,
        }))
        .catch(payload => Rx.Observable.of({
          uuid: action.uuid,
          type: AT.REQUEST_GET_ME_ERROR,
          payload,
        }))
    )
);

export default combineEpics(
  signInEpic,
  signUpEpic,
  signOutEpic,
  getMeEpic
);