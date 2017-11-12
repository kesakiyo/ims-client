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

export default {
  App,
  Board,
  Questions,
}