/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from '../index'


const CSS=css`    

`

const Browse=()=>{
    const {state,dispatch}=useContext(StoreContext);
    return(
        <h1>Browser</h1>
    );
}

export default Browse;