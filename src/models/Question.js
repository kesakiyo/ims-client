/* External dependencies */
import Immutable from 'immutable';
import selectn from 'selectn';

/* Internal dependencies */
import QuestionTypes from '../constants/QuestionTypes';
import Answer from './Answer';

const QuestionRecord = Immutable.Record({
  id: 0,
  title: '',
  description: '',
  type: '',
  values: Immutable.List(),
  limit: 0,
  interviewId: 0,
  createdAt: 0,
  updatedAt: 0,

  answer: new Answer(),
})

class Question extends QuestionRecord {
  constructor(args = {}) {
    super({
      ...args,
      values: Immutable.List(selectn('values', args)),
    })
  }

  isText() {
    return this.type === QuestionTypes.TEXT;
  }

  isFile() {
    return this.type === QuestionTypes.FILE;
  }

  isRadio() {
    return this.type === QuestionTypes.RADIO;
  }

  isCheckBox() {
    return this.type === QuestionTypes.CHECK_BOX;
  }

  hasAnswer() {
    return this.answer.id;
  }
}

export default Question;