/* External dependencies */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

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