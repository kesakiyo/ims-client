/* Internal dependencies */
import client from './client';

const update = (id, session) => client.put(`/sessions/${id}`, session)

export default {
  update,
}
