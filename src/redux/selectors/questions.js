/* External dependencies */
import { createSelector } from 'reselect';

const getFetchedQuestions = createSelector(
  state => state.questions.questions,
  state => state.answers.answers,
  (questions, answers) => (
    questions.map(question => {
      const answer = answers.find(answer => answer.questionId === question.id) || {};
      return {
        ...question,
        answer,
      }
    })
  )
)

export default {
  getFetchedQuestions,
}