/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {css,jsx} from "@emotion/react"

const CSS=css`
width: 200px;
min-height: 100vh;
padding: 20px;
background: #121233;
`
const SideBar=({children})=>{
    return(
        <div className="SideBar"  css={CSS}>
            {children}
        </div>
    );
}


export default SideBar;