/* External dependencies */
import { createSelector } from 'reselect';

/* Internal dependencies */
import Answer from '../../models/Answer';

const getFetchedQuestions = createSelector(
  state => state.questions.questions,
  state => state.answers.answers,
  (questions, answers) => (
    questions.map(question => {
      const answer = answers.find(answer => answer.questionId === question.id, null, new Answer());
      return question.set('answer', answer);
    })
  )
)

export default {
  getFetchedQuestions,
}