/**
 * Application header
 */

//*module
import React, {useState} from "react";
import {AppBar, Stack, Typography} from "@mui/material";
//*local
import logo from "@blob/logo.svg";
//*styles
import "./App__header.sass"
import {AppLogo} from "@components/App/Logo/App__logo";

export const AppHeader:React.FC<{}> = (props) => {

    return (
        <AppBar component='header'>
            <Stack direction='row' alignContent='center' alignItems='center'>
                <AppLogo logo={logo} alt='logo here'/>
                <Typography variant='h6' component='div'>React+Redux+Devexpress+MUI</Typography>
            </Stack>
        </AppBar>
    );
};