/* External dependencies */
import Immutable from 'immutable';

/* Internal dependnecies */
import AT from '../../constants/ActionTypes';
import Question from '../../models/Question';

const initState = {
  isFetching: false,
  questions: Immutable.List(),
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
        questions: Immutable.List(action.payload.questions.map(question => new Question(question))),
      }

    case AT.REQUEST_GET_QUESTIONS_ERROR:
    case AT.REQUEST_GET_ANSWERS_ERROR:
      return {
        ...state,
        isFetching: false,
      }

    default:
      return state
  }
};