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
import Session from './containers/Session';

export default (
  <Router history={redux.getHistory()}>
    <Route path="/" component={App}>
      <IndexRedirect to="boards" />
      <Route path="signin" component={SignIn} />
      <Route path="signup" component={SignUp} />
      <Route component={withAuth.Authenticated}>
        <Route path="boards" component={Boards} />
        <Route path="boards/:id" component={Board}>
          <IndexRedirect to="session" />
          <Route path="session" component={Session} />
          <Route path="questions" component={SignIn} />
        </Route>
      </Route>
    </Route>
  </Router>
);