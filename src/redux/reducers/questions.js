/* Internal dependnecies */
import AT from '../../constants/ActionTypes';

const initState = {
  isFetching: false,
  questions: null,
};

export default (state = initState, action) => {

  switch (action.type) {
    case AT.REQUEST_GET_QUESTIONS:
      return {
        ...state,
        isFetching: true,
      }

    case AT.REQUEST_GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        questions: action.payload.questions,
      }

    case AT.REQUEST_GET_QUESTIONS_ERROR:
      return {
        ...state,
        isFetching: false,
      }

    default:
      return state
  }
};