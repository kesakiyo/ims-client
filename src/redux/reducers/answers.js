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
    case AT.REQUEST_UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        answers: (() => {
          const idx = state.answers.findIndex(answer => answer.id === action.payload.answer.id);
          if (idx !== -1) {
            return state.answers.slice(0, idx).concat(state.answers.slice(idx + 1)).concat([action.payload.answer]);
          }
          return state.answers.concat([action.payload.answer]);
        })(),
      }

    default:
      return state
  }
};