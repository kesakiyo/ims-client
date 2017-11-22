/* Internal dependencies */
import AT from '../../constants/ActionTypes';

export default store => next => action => {
  switch (action.type) {
    case AT.REQUEST_SIGN_IN_SUCCESS:
    case AT.REQUEST_GET_ME_SUCCESS:
      window.CHPlugin.checkIn({
        id: action.payload.user.id,
        name: action.payload.user.email,
      });
      break;

    case AT.REQUEST_SIGN_OUT_SUCCESS:
      window.CHPlugin.checkOut();
      break;
  }

  return next(action);
}