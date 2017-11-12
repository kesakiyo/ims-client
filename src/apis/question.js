/* Internal dependencies */
import client from './client';

const getList = (interviewId) => client.get(`/interviews/${interviewId}/questions`)

const upsertAnswer = (id, answer) => (
  client.post(`/questions/${id}/answers`, answer)
)

export default {
  getList,
  upsertAnswer,
}
