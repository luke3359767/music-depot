/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {css,jsx} from "@emotion/react"

const CSS=css`    
top:0;
left:0;
width: calc(100% - 200px);
min-height: 100%;
padding: 20px;
background: #191530;
`

const Content=({children})=>{
    return(
        <div className="Content" css={CSS}>
            {children}
        </div>
    );
}


export default Content;