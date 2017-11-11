/* Internal dependnecies */
import AT from '../../constants/ActionTypes';

const initState = {
  isFetching: false,
  session: null,
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
        session: action.payload.session,
      }

    case AT.REQUEST_JOIN_BOARD_ERROR:
      return {
        ...state,
        isFetching: false,
      }

    default:
      return state
  }
};