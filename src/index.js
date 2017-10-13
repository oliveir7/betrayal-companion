import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTabEventPlugin from 'react-tap-event-plugin';

injectTabEventPlugin();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
