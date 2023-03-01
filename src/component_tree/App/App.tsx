import React from 'react';

import './App.sass';
import {AppHeader} from "./Header/App__header";
import {AppFooter} from "@components/App/Footer/App__footer";
import {Bodygrid} from "@components/App/Bodygrid/Bodygrid";

import {Storage} from "@data/storage";
import {Provider} from "react-redux";

export const App:React.FC<{}> = (props) => (
    <main>
        <Provider store={Storage}>
            <AppHeader/>
            <Bodygrid/>
            <AppFooter/>
        </Provider>
    </main>
);