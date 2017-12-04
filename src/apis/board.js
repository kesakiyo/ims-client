/* Internal dependencies */
import client from './client';

const join = (id) => client.put(`/interviews/${id}/join`)

const getSessions = (id) => client.get(`/interviews/${id}/sessions`)

const invite = (id, email) => client.post(`/interviews/${id}/invite`, { email })

const getAnswers = (id, userId) => client.get(`/interviews/${id}/users/${userId}/answers`)

const getScores = (id, userId) => client.get(`/interviews/${id}/users/${userId}/scores`)

export default {
  join,
  getSessions,
  invite,
  getAnswers,
  getScores,
}
