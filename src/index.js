import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './screens/App/App';
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import store from './store.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
