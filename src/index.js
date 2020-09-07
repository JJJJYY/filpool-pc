import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import './styles/index.less';
import './checkpPlatform';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}

serviceWorker.unregister();
