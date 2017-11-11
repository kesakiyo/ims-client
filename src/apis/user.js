/* Internal dependencies */
import client from './client';

const signIn = (email, password) => (
  client.post('/users/signin', { email, password })
)

const signUp = (email, password, passwordConfirm) => (
  client.post('/users/signup', { email, password, passwordConfirm })
)

export default {
  signIn,
  signUp,
}