/* External dependencies */
import { NotificationManager } from 'react-notifications';

class Notification {

  success(message) {
    NotificationManager.success(message, null, 3000);
  }

  error(message) {
    NotificationManager.error(message, null, 3000);
  }
}

export default new Notification();