/* External dependencies */
import Immutable from 'immutable';

const BoardRecord = Immutable.Record({
  id: 0,
  title: '',
  description: '',
  startTime: 0,
  endTime: 0,
  createdAt: 0,
  updatedAt: 0,
})

class Board extends BoardRecord {
}

export default Board;