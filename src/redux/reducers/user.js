/* Internal dependnecies */
import AT from '../../constants/ActionTypes';

const initState = {
  user: null,
};

export default (state = initState, action) => {
  const { todoList } = state

  switch (action.type) {
    case AT.REQUEST_SIGN_IN_SUCCESS:
    case AT.REQUEST_GET_ME_SUCCESS:
      console.log(action);
      return {

      }

    default:
      return state
  }
};