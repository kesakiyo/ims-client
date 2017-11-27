/* External dependencies */
import Immutable from 'immutable';

/* Internal dependencies */
import SessionTypes from '../constants/SessionTypes'

const SessionRecord = Immutable.Record({
  id: 0,
  role: '',
  email: '',
  name: '',
  mobileNumber: '',
  published: false,
  userId: 0,
  interviewId: 0,
  publishedAt: 0,
  createdAt: 0,
  updatedAt: 0,
})

class Session extends SessionRecord {
  isMaster() {
    return this.id && this.role === SessionTypes.MASTER;
  }

  isInterviewer() {
    return this.id && (this.role === SessionTypes.INTERVIEWER || this.role === SessionTypes.MASTER);
  }

  isInterviewee() {
    return this.id && this.role === SessionTypes.INTERVIEWEE;
  }
}

export default Session;