/**
 * Application root
 */

//*module
import React from 'react';
import {Provider} from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//*local
import {AppHeader} from "@components/App/Header/App__header";
import {AppFooter} from "@components/App/Footer/App__footer";
import {Bodygrid} from "@components/App/Bodygrid/Bodygrid";
import {Storage} from "@data/storage";
//*styles
import './App.sass';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App:React.FC<{}> = (props) => (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <main className='App'>
            <Provider store={Storage}>
                <AppHeader/>
                <Bodygrid/>
                <AppFooter/>
            </Provider>
        </main>
    </ThemeProvider>
);