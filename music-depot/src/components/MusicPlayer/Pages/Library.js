/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext,useState} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from '../index'
import axios from 'axios';

const CSS=css`    

`

const Library=()=>{
    const {state,dispatch}=useContext(StoreContext);
    
    return(
        <h1>Li {state.currentPlaylist}</h1>

    );
}

export default Library;