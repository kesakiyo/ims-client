/* External dependencies */
import { createSelector } from 'reselect';

/* Internal dependencies */
import Answer from '../../models/Answer';

const getFetchedQuestions = createSelector(
  state => state.questions.questions,
  state => state.answers.answers,
  state => state.scores.scores,
  (questions, answers, scores) => (
    questions.map(question => {
      const answer = answers.find(answer => answer.questionId === question.id, null, new Answer());
      return question.set('answer', answer.set('scores', scores.filter(score => score.answerId === answer.id)));
    })
  )
)

export default {
  getFetchedQuestions,
}