/* External dependencies */
import Immutable from 'immutable';

const UserRecord = Immutable.Record({
  id: 0,
  email: '',
  createdAt: 0,
  updatedAt: 0,
})

class User extends UserRecord {
  isAuthenticated() {
    return +this.id !== 0;
  }
}

export default User;