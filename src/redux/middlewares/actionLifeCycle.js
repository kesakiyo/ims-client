/* External dependencies */
import Immutable from 'immutable';

export default store => next => {
  let pendding = Immutable.Map();

  return action => {
    const ret = (() => {
      if (action.uuid && action.meta && action.meta.lifecycle) {
        return next({
          ...action,
          promise: new Promise((resolve, reject) => {
            const { lifecycle } = action.meta;
            pendding = pendding.setIn([action.uuid, lifecycle.resolve], resolve);
            pendding = pendding.setIn([action.uuid, lifecycle.reject], reject);
          }),
        });
      }
      return next(action);
    })();

    if (action.uuid && pendding.hasIn([action.uuid, action.type])) {
      const resolveOrReject = pendding.getIn([action.uuid, action.type]);
      pendding = pendding.delete(action.uuid);
      resolveOrReject(action);
    }

    return ret;
  };
};