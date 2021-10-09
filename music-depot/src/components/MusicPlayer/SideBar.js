/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {css,jsx} from "@emotion/react"

const CSS=css`
width: 200px;
height: 100%;
padding: 20px;
background: #062557;
`
const SideBar=({children})=>{
    return(
        <div className="SideBar"  css={CSS}>
            {children}
        </div>
    );
}


export default SideBar;