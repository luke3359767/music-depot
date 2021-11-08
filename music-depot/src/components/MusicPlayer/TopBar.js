/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {css,jsx} from "@emotion/react"

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';


const CSS=css`
position:absolute;
width: calc(100% - 200px);
height:50px;
left:200px;
  
background:#191530;
border:1px solid #fff;
.profileBar {

    display: block;
    float:left;
}

`

const TopBar=()=>{
    return(
        <div className="TopBar" css={CSS}>
            <div className="searchBar"></div>
            <div className="profileBar">
                <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Stack>
            </div>
            

        </div>
    );
}


export default TopBar;