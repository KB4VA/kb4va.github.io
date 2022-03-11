import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import {Provider} from "mobx-react";
import store from "./store";
import {createTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import R from "./res";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <MuiThemeProvider theme={createTheme(R.theme)}>
              <CssBaseline/>
              <App />
          </MuiThemeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
