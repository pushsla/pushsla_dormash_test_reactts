import React from "react";

import "./App__logo.sass"

export interface PropertiesOfApp__logo{
    logo: string,
    alt: string
}

export const AppLogo:React.FC<PropertiesOfApp__logo> = (props) => (
    <div></div>
);