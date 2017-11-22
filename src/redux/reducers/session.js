/* Internal dependnecies */
import AT from '../../constants/ActionTypes';
import Session from '../../models/Session';

const initState = {
  isFetching: false,
  session: new Session(),
};

export default (state = initState, action) => {

  switch (action.type) {
    case AT.REQUEST_JOIN_BOARD:
      return {
        ...state,
        isFetching: true,
      }

    case AT.REQUEST_JOIN_BOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        session: new Session(action.payload.session),
      }

    case AT.REQUEST_JOIN_BOARD_ERROR:
      return {
        ...state,
        isFetching: false,
      }

    case AT.REQUEST_UPDATE_SESSION_SUCCESS:
    case AT.REQUEST_PUBLISH_SESSION_SUCCESS:
      return {
        ...state,
        session: new Session(action.payload.session),
      }

    default:
      return state
  }
};