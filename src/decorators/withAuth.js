/* External dependencies */
import React from 'react';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history3/redirect';
import { routerActions } from 'react-router-redux';

/* Internal dependencies */
import selectors from '../redux/selectors';

const userIsAuthenticated = connectedReduxRedirect({
 redirectPath: '/signin',
 allowRedirectBack: false,
 authenticatedSelector: state => selectors.user.getUser(state).isAuthenticated(),
 authenticatingSelector: state => selectors.loading.App(state),
 wrapperDisplayName: 'UserIsAuthenticated',
 redirectAction: routerActions.replace,
});

const userIsInterviewer = connectedReduxRedirect({
  redirectPath: '/signin',
  allowRedirectBack: false,
  authenticatedSelector: state => selectors.session.getSession(state).isInterviewer(),
  authenticatingSelector: state => selectors.loading.Board(state),
  wrapperDisplayName: 'UserIsInterviewer',
  redirectAction: routerActions.replace,
});

const userIsInterviewee = connectedReduxRedirect({
  redirectPath: '/signin',
  allowRedirectBack: false,
  authenticatedSelector: state => selectors.session.getSession(state).isInterviewee(),
  authenticatingSelector: state => selectors.loading.Board(state),
  wrapperDisplayName: 'UserIsInterviewee',
  redirectAction: routerActions.replace,
});

const Authenticated = userIsAuthenticated(({ children, ...props }) => React.cloneElement(children, props));

const isInterviewee = userIsInterviewee(({ children, ...props }) => React.cloneElement(children, props));

const isInterviewer = userIsInterviewer(({ children, ...props }) => React.cloneElement(children, props));

export default {
  userIsAuthenticated,
  Authenticated,
  userIsInterviewer,
  userIsInterviewee,
  isInterviewee,
  isInterviewer,
}
