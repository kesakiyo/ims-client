/* Internal dependencies */
import client from './client';

const join = (id) => client.put(`/interviews/${id}/join`)

export default {
  join,
}
