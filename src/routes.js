/* External dependencies */
import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';

/* Internal dependencies */
import redux from './services/redux';
import withAuth from './decorators/withAuth';
import App from './containers/App';
import Boards from './containers/Boards';
import Board from './containers/Board';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

export default (
  <Router history={redux.getHistory()}>
    <Route path="/" component={App}>
      <IndexRedirect to="boards" />
      <Route path="signin" component={SignIn} />
      <Route path="signup" component={SignUp} />
      <Route component={withAuth.Authenticated}>
        <Route path="boards" component={Boards} />
        <Route path="boards/:id" component={Board}>
          <Route path="session" component={SignIn} />
          <Route path="questions" component={SignIn} />
        </Route>
      </Route>
    </Route>
  </Router>
);