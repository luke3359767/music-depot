/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {css,jsx} from "@emotion/react"

const CSS=css`    
position:absolute;
bottom:0;
left:0;
width: 100%;
height:75px;
x-index:99;
padding:20px;
background:#18183d;
`

const PlayBar=({children})=>{
    return(
        <div className="PlayBar" css={CSS}>
            {children}
        </div>
    );
}


export default PlayBar;