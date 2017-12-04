/* Internal dependencies */
import client from './client';

const evaluate = (id, value) => client.post(`/answers/${id}/scores`, { value })

export default {
  evaluate,
}
