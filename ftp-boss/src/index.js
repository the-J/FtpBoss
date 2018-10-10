import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import * as serviceWorker from './serviceWorker';

import store, { history } from './store/store';

import FtpBoss from './components/FtpBoss';
import FtpForm from './components/FtpForm';

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/ftp" component={FtpForm} />
                <Route path="/" component={FtpBoss} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    target);

serviceWorker.unregister();
