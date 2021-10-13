/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {css,jsx} from "@emotion/react"

const CSS=css`
position:absolute;
width: calc(100% - 200px);
height:50px;
left:200px;
padding:20px;  
background:#191530;
border:1px solid #fff;

`

const TopBar=({children})=>{
    return(
        <div className="TopBar" css={CSS}>
            {children}
        </div>
    );
}


export default TopBar;