/* Internal dependnecies */
import AT from '../../constants/ActionTypes';

const initState = {
  isFetching: false,
  answers: [],
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
        answers: action.payload.answers,
      }

    case AT.REQUEST_GET_QUESTIONS_ERROR:
      return {
        ...state,
        isFetching: false,
      }

    case AT.REQUEST_UPSERT_ANSWER_SUCCESS:
      // todo: 답변이 새롭게 생성됐을 떄 무엇을 해야하는가?
      return {
        ...state,
      }

    default:
      return state
  }
};