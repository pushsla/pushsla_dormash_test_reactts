import React from "react";

import logo from "@blob/logo.svg";

import {AppLogo} from "../__logo/App__logo";

export const AppHeader = () => (
    <header className="App__header">
        <AppLogo logo={logo} alt="Project logo"/>
        <p>Application header</p>
    </header>
);