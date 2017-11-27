/* Internal dependencies */
import client from './client';

const join = (id) => client.put(`/interviews/${id}/join`)

const getSessions = (id) => client.get(`/interviews/${id}/sessions`)

export default {
  join,
  getSessions,
}
