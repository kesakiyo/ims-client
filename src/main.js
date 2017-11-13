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
import './styles/global.scss';

/* Render */
ReactDom.render(
  <Provider store={redux.getStore()}>
    {routes}
  </Provider>
, window.document.getElementById('main'));