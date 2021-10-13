/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from '../index'


const CSS=css`    

`

const Playlist=()=>{
    const {state,dispatch}=useContext(StoreContext);
    return(
        <h1>{state.currentPlaylist}</h1>

    );
}

export default Playlist;