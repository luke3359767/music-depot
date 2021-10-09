/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import {css,jsx} from "@emotion/react"

const CSS=css`    
width: calc(100% -200px);
padding: 20px;
background: #142136;
`

const Content=({children})=>{
    return(
        <div className="Content" css={CSS}>
            {children}
        </div>
    );
}


export default Content;