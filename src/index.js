import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import configureStore from './configureStore';


// import 'sanitize.css/sanitize.css';

//import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';
// import 'globalStyles.scss';
import './scss/style.scss';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  MOUNT_NODE
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
