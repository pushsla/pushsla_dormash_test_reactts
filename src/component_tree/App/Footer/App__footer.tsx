/**
 * Application footer
 */

//*module
import React from "react";
import {Box, Typography} from "@mui/material";
//*local
//*styles
import "./App__footer.sass"

export const AppFooter:React.FC<{}> = (props) => (
    <Box className="App__footer" component='footer' textAlign='center'>
        <Typography variant='h6'>fine footer comes here</Typography>
    </Box>
);