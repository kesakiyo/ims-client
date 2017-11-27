/* External dependencies */
import { createSelector } from 'reselect';

const getSessions = state => state.sessions.sessions

const getInterviewees = createSelector(
  state => state.sessions.sessions,
  sessions => sessions.filter(session => session.isInterviewee())
)

export default {
  getSessions,
  getInterviewees,
}