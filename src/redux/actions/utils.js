/* External dependencies */
import uuidv4 from 'uuid/v4'

export const actionCreator = (type) => {
  return (payload, meta = {}) => ({
    uuid: uuidv4(),
    type,
    payload,
    meta,
  })
}

export const actionCreatorWithPromise = (type) => {
  return (payload, meta = {}) => ({
    uuid: uuidv4(),
    type,
    payload,
    meta: {
      ...meta,
      lifecycle: {
        resolve: `${type}_SUCCESS`,
        reject: `${type}_ERROR`,
      },
    },
  })
}
