/* External dependencies */
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'
import { routerActions } from 'react-router-redux'

/* Internal dependencies */
import selectors from '../redux/selectors';

const userIsAuthenticated = connectedRouterRedirect({
 redirectPath: '/signin',
 allowRedirectBack: false,
 authenticatedSelector: state => selectors.user.getUser(state) !== null,
 wrapperDisplayName: 'UserIsAuthenticated',
 redirectAction: routerActions.replace,
});

export default {
  userIsAuthenticated,
}
