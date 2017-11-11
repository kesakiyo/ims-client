/* External dependencies */
import { createSelector } from 'reselect';

const Board = createSelector(
  state => state.board.isFetching,
  state => state.session.isFetching,
  (...args) => args.reduce((prev, cur) => prev || cur, false)
)

export default {
  Board,
}