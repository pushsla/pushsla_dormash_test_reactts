import React from "react";

import logo from "@blob/logo.svg";

import {App__logo} from "../__logo/App__logo";

export const App__header = () => (
    <header className="App__header">
        <App__logo logo={logo} alt="Project logo"/>
        <p>Application header</p>
    </header>
);