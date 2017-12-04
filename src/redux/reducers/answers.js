/* External dependencies */
import Immutable from 'immutable';

/* Internal dependnecies */
import AT from '../../constants/ActionTypes';
import Answer from '../../models/Answer';

const initState = {
  isFetching: false,
  answers: Immutable.List(),
};

export default (state = initState, action) => {

  switch (action.type) {
    case AT.REQUEST_GET_QUESTIONS:
    case AT.REQUEST_GET_ANSWERS:
      return {
        ...state,
        isFetching: true,
      }

    case AT.REQUEST_GET_QUESTIONS_SUCCESS:
    case AT.REQUEST_GET_ANSWERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        answers: Immutable.List(action.payload.answers.map(answer => new Answer(answer))),
      }

    case AT.REQUEST_GET_QUESTIONS_ERROR:
    case AT.REQUEST_GET_ANSWERS_ERROR:
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
            return state.answers.set(idx, new Answer(action.payload.answer));
          }
          return state.answers.push(new Answer(action.payload.answer));
        })(),
      }

    default:
      return state
  }
};