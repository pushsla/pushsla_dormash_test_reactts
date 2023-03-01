import React from "react";

import "./App__logo.sass"

export interface IPropertiesApp__logo{
    logo: string,
    alt: string
}

export const AppLogo = (props: IPropertiesApp__logo) => (
    <img src={props.logo} className="App__logo" alt={props.alt} />
);