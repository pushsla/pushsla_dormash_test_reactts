/**
 * Application root
 */

//*module
import React from 'react';
import {Provider} from "react-redux";
//*local
import {AppHeader} from "@components/App/Header/App__header";
import {AppFooter} from "@components/App/Footer/App__footer";
import {Bodygrid} from "@components/App/Bodygrid/Bodygrid";
import {Storage} from "@data/storage";
//*styles
import './App.sass';

export const App:React.FC<{}> = (props) => (
    <main>
        <Provider store={Storage}>
            <AppHeader/>
            <Bodygrid/>
            <AppFooter/>
        </Provider>
    </main>
);