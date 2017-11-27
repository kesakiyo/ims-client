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

    default:
      return state
  }
};