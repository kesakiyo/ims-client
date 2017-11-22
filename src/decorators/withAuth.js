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

const Authenticated = userIsAuthenticated(({ children, ...props }) => React.cloneElement(children, props));

export default {
  userIsAuthenticated,
  Authenticated,
}
