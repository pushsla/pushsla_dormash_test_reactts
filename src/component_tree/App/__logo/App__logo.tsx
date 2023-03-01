import React from "react";

export interface IPropertiesApp__logo{
    logo: string,
    alt: string
}

export const AppLogo = (props: IPropertiesApp__logo) => (
    <img src={props.logo} className="App-logo" alt={props.alt} />
);