/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from '../index'


const CSS=css`    
.plTitle{
    font-size: 30px;
}
`

const Playlist=()=>{
    const {state,dispatch}=useContext(StoreContext);
    return(
        <h1 className="plTitle">{state.currentPlaylist}</h1>
    );
}

export default Playlist;