/* External dependencies */
import Immutable from 'immutable';

const ScoreRecord = Immutable.Record({
  id: 0,
  value: 0,
  interviewId: 0,
  questionId: 0,
  answerId: 0,
  userId: 0,
  createdUserId: 0,
  createdAt: 0,
  updatedAt: 0,
})

class Score extends ScoreRecord {
}

export default Score;
