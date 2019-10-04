import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css'
import './_style/styles.scss'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router} from 'react-router-dom';

const store = createStore(reducers,applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
      <Router>
      <App />
      </Router>
    </Provider> , document.querySelector('#root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
