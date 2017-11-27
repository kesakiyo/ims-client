/* External dependencies */
import { createSelector } from 'reselect';

const getSessions = state => state.sessions.sessions

const getInterviewees = createSelector(
  state => state.sessions.sessions,
  sessions => sessions.filter(session => session.isInterviewee())
)

const getInterviewers = createSelector(
  state => state.sessions.sessions,
  sessions => sessions.filter(session => session.isInterviewer())
)

export default {
  getSessions,
  getInterviewees,
  getInterviewers,
}