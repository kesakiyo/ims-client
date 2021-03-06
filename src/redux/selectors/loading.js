/* External dependencies */
import { createSelector } from 'reselect';

const Board = createSelector(
  state => state.board.isFetching,
  state => state.session.isFetching,
  (...args) => args.reduce((prev, cur) => prev || cur, false)
)

const App = createSelector(
  state => state.user.isFetching,
  (...args) => args.reduce((prev, cur) => prev || cur, false)
)

const Questions = createSelector(
  state => state.questions.isFetching,
  state => state.answers.isFetching,
  (...args) => args.reduce((prev, cur) => prev || cur, false)
)

const Publishing = createSelector(
  state => state.questions.isFetching,
  state => state.answers.isFetching,
  state => state.session.isFetching,
  (...args) => args.reduce((prev, cur) => prev || cur, false)
)

const Statistic = createSelector(
  state => state.sessions.isFetching,
  (...args) => args.reduce((prev, cur) => prev || cur, false)
)

const Evaluation = createSelector(
  state => state.sessions.isFetching,
  (...args) => args.reduce((prev, cur) => prev || cur, false)
)

const EvaluationModal = createSelector(
  state => state.questions.isFetching,
  state => state.answers.isFetching,
  (...args) => args.reduce((prev, cur) => prev || cur, false)
)

const Interviewers = createSelector(
  state => state.sessions.isFetching,
  (...args) => args.reduce((prev, cur) => prev || cur, false)
)

export default {
  App,
  Board,
  Questions,
  Publishing,
  Statistic,
  Evaluation,
  EvaluationModal,
  Interviewers,
}