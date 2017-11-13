/* Internal dependnecies */
import AT from '../../constants/ActionTypes';

const initState = {
  isFetching: false,
  user: null,
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
      window.CHPlugin.checkIn({
        id: action.payload.user.id,
        name: action.payload.user.email,
      });
      return {
        ...state,
        user: action.payload.user,
        isFetching: false,
      }

    case AT.REQUEST_GET_ME_ERROR:
      return {
        ...state,
        isFetching: false,
      }

    case AT.REQUEST_SIGN_OUT_SUCCESS:
    window.CHPlugin.checkOut();
    return {
      ...state,
      user: null,
    }

    default:
      return state
  }
};