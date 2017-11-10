/* External dependencies */
import keyMirror from 'keymirror';

const makeProps = (type) => {
  return keyMirror({
    [type]: null,
    [`${type}_SUCCESS`]: null,
    [`${type}_ERROR`]: null,
  })
};

export default keyMirror({
  ...makeProps('REQUEST_SIGN_IN'),
  ...makeProps('REQUEST_GET_ME'),
});