/* External dependencies */
import Immutable from 'immutable';

/* Internal dependnecies */
import AT from '../../constants/ActionTypes';
import Session from '../../models/Session';

const initState = {
  isFetching: false,
  sessions: Immutable.List(),
};

export default (state = initState, action) => {
  const { sessions } = state

  switch (action.type) {
    case AT.REQUEST_GET_SESSIONS:
      return {
        ...state,
        isFetching: true,
      }

    case AT.REQUEST_GET_SESSIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        sessions: Immutable.List(action.payload.sessions.map(session => new Session(session))),
      }

    case AT.REQUEST_GET_SESSIONS_ERROR:
      return {
        ...state,
        isFetching: false,
      }

    case AT.REQUEST_INVITE_BOARD_SUCCESS:
      return {
        ...state,
        sessions: (() => {
          const newSession = new Session(action.payload.session);
          const idx = sessions.findIndex(session => session.id === newSession.id);
          if (idx === -1) {
            return sessions.push(newSession);
          }
          return sessions.set(idx, newSession);
        })(),
      }

    default:
      return state
  }
};