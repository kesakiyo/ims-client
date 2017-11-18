/* Internal dependencies */
import client from './client';

const update = (id, session) => client.put(`/sessions/${id}`, session)

const publish = (id) => client.put(`/sessions/${id}/publishing`)

export default {
  update,
  publish,
}
