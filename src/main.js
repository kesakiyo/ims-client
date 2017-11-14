/* External dependencies */
import React from 'react';
import moment from 'moment';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

/* Set moment locale */
moment.locale('ko');

/* Internal dependencies */
import routes from './routes';
import redux from './services/redux';

/* init settings */
import 'moment-duration-format';
import 'react-notifications/lib/notifications.css';
import './styles/global.scss';

/* polyfill */
require('es6-promise').polyfill();
require("babel-polyfill");

/* Render */
ReactDom.render(
  <Provider store={redux.getStore()}>
    {routes}
  </Provider>
, window.document.getElementById('main'));