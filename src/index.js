import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router} from 'react-router-dom';
injectTapEventPlugin();


ReactDOM.render(
    <MuiThemeProvider>
    <Router>
      <App />
      </Router>
  </MuiThemeProvider>
, document.getElementById('root'))
