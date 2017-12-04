/* External dependencies */
import Immutable from 'immutable';

/* Internal dependnecies */
import AT from '../../constants/ActionTypes';
import Score from '../../models/Score';

const initState = {
  isFetching: false,
  scores: Immutable.List(),
};

export default (state = initState, action) => {
  const { scores } = state;

  switch (action.type) {
    case AT.REQUEST_GET_SCORES:
      return {
        ...state,
        isFetching: true,
      }

    case AT.REQUEST_GET_SCORES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        scores: Immutable.List(action.payload.scores.map(score => new Score(score))),
      }

    case AT.REQUEST_CREATE_SCORE_SUCCESS:
    return {
      ...state,
      scores: (() => {
        const idx = scores.findIndex(score => score.id === action.payload.score.id);
        if (idx !== -1) {
          return scores.set(idx, new Score(action.payload.score));
        }
        return scores.push(new Score(action.payload.score));
      })(),
    }

    case AT.REQUEST_GET_SCORES_ERROR:
      return {
        ...state,
        isFetching: false,
      }

    default:
      return state
  }
};