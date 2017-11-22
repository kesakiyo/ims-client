/* Internal dependnecies */
import AT from '../../constants/ActionTypes';
import Board from '../../models/Board';

const initState = {
  isFetching: false,
  board: new Board(),
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
        board: new Board(action.payload.interview),
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