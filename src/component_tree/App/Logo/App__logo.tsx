/**
 * Application logo
 */

//*module
import React from "react";
//*local
//*styles
import "./App__logo.sass"

// An interface any props passed to AppLogo must implement
export interface IAppLgoProps{
    logo: string,
    alt: string
}

export const AppLogo:React.FC<IAppLgoProps> = (props) => {

    return (
        <img className="App__logo" src={props.logo} alt={props.alt}/>
    );
}