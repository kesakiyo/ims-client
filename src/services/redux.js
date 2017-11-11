/* External dependencies */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

/* Internal dependencies */
import actionLifeCycle from '../redux/middlewares/actionLifeCycle';
import reducers from '../redux/reducers'
import epics from '../redux/epics'

class Redux {
  constructor() {
    this.hashHistory = useRouterHistory(createHashHistory)({ queryKey: false });
    this.store = createStore(
      combineReducers({
        ...reducers,
        routing: routerReducer,
        form: formReducer,
      }),
      applyMiddleware(
        createEpicMiddleware(combineEpics(epics)),
        actionLifeCycle,
        routerMiddleware(this.hashHistory)
      )
    );
    this.history = syncHistoryWithStore(this.hashHistory, this.store);
  }

  getStore() {
    return this.store;
  }

  getHistory() {
    return this.history;
  }
}

export default new Redux();