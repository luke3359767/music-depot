/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {css,jsx} from "@emotion/react"
import logo from '../../image/logo.png';

const CSS=css`
width: 200px;
min-height: 100vh;
padding-top: 10px;
background: #121233;
`
const SideBar=({children})=>{
    return(
        <div className="SideBar"  css={CSS}>
            <img src={logo} height="50" margin-left="auto" margin-right="auto"/>
            {children}
        </div>
    );
}


export default SideBar;