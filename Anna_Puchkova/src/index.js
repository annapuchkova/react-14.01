import React from "react";
import ReactDom from "react-dom";
import MessageField from './components/MessageField';
import Router from './components/Router';
import Layout from './components/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';

    ReactDom.render(
        <BrowserRouter>
            <MuiThemeProvider>
               <Router />
            </MuiThemeProvider>
        </BrowserRouter>,      
    document.getElementById("root")
    );

    