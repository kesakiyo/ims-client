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
import Questions from './containers/Questions';
import Publishing from './containers/Publishing';
import Statistic from './containers/Statistic';
import Interviewers from './containers/Interviewers';

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
          <Route component={withAuth.isInterviewee}>
            <Route path="questions" component={Questions} />
            <Route path="publishing" component={Publishing} />
          </Route>
          <Route component={withAuth.isInterviewer}>
            <Route path="statistic" component={Statistic} />
            <Route path="interviewers" component={Interviewers} />
          </Route>
        </Route>
      </Route>
    </Route>
  </Router>
);