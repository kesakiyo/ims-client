/* External dependencies */
import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';

/* Internal dependencies */
import redux from './services/redux';
import App from './containers/App';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

export default (
  <Router history={redux.getHistory()}>
    <Route path="/" component={App}>
      <Route path="signin" component={SignIn} />
      <Route path="signup" component={SignUp} />
    </Route>
  </Router>
);