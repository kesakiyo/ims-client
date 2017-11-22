/* Internal dependnecies */
import AT from '../../constants/ActionTypes';
import User from '../../models/User';

const initState = {
  isFetching: false,
  user: new User(),
};

export default (state = initState, action) => {

  switch (action.type) {
    case AT.REQUEST_GET_ME:
      return {
        ...state,
        isFetching: true,
      }

    case AT.REQUEST_SIGN_IN_SUCCESS:
    case AT.REQUEST_GET_ME_SUCCESS:
      return {
        ...state,
        user: new User(action.payload.user),
        isFetching: false,
      }

    case AT.REQUEST_GET_ME_ERROR:
      return {
        ...state,
        isFetching: false,
      }

    case AT.REQUEST_SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: new User(),
      }

    default:
      return state
  }
};