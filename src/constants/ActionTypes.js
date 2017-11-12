/* External dependencies */
import keyMirror from 'keymirror';

const makeProps = (type) => {
  return keyMirror({
    [type]: null,
    [`${type}_SUCCESS`]: null,
    [`${type}_ERROR`]: null,
  })
};

export default {
  ...makeProps('REQUEST_SIGN_IN'),
  ...makeProps('REQUEST_SIGN_UP'),
  ...makeProps('REQUEST_SIGN_OUT'),
  ...makeProps('REQUEST_GET_ME'),
  ...makeProps('REQUEST_JOIN_BOARD'),
  ...makeProps('REQUEST_UPDATE_SESSION'),
  ...makeProps('REQUEST_GET_QUESTIONS'),
  ...makeProps('REQUEST_GET_ANSWERS'),
  ...makeProps('REQUEST_UPSERT_ANSWER'),
  ...makeProps('REQUEST_UPLOAD_FILE'),
};
