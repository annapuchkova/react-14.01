import React from "react";
import ReactDom from "react-dom";
import MessageField from './components/MessageField';
import Router from './components/Router';
import Layout from './components/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import initStore from './utils/store';

    ReactDom.render(
        <Provider store={ initStore() }>
            <BrowserRouter>
                <MuiThemeProvider>
                <Router />
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>,      
    document.getElementById("root")
    );

    