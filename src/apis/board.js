/* Internal dependencies */
import client from './client';

const join = (id) => client.put(`/interviews/${id}/join`)

const getSessions = (id) => client.get(`/interviews/${id}/sessions`)

const invite = (id, email) => client.post(`/interviews/${id}/invite`, { email })

export default {
  join,
  getSessions,
  invite,
}
