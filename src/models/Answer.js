/* External dependencies */
import Immutable from 'immutable';
import selectn from 'selectn';

/* Internal dependencies */
import File from './File';

const AnswerRecord = Immutable.Record({
  id: 0,
  text: '',
  values: Immutable.List(),
  file: Immutable.Map(),
  userId: 0,
  questionId: 0,
  interviewId: 0,
  createdAt: 0,
  updatedAt: 0,

  file: new File(),
  scores: Immutable.List(),
})

class Answer extends AnswerRecord {
  constructor(args = {}) {
    super({
      ...args,
      values: Immutable.List(selectn('values', args) || []),
      file: new File(selectn('file', args)),
    })
  }

  hasFile() {
    return this.file.name;
  }

  hasValue(value) {
    return this.values.findIndex(v => v === value) !== -1;
  }

  getFirstValue() {
    return this.values.first();
  }

  getFileName() {
    return this.file.name;
  }
}

export default Answer;
