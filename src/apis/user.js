/* Internal dependencies */
import client from './client';

const signIn = (email, password) => (
  client.post('/users/signin', { email, password })
)

export default {
  signIn,
}