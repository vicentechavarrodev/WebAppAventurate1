import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './custom.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import AppRoutes from './components/routes/index';
import { Router } from "react-router";
import { history } from './components/helpers/history';
import store from './store';
import "leaflet/dist/leaflet.css";


const Root = (
    <Provider store={store}>
        <Router history={history}>
            <AppRoutes />
        </Router>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));


registerServiceWorker();



