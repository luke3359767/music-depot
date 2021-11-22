/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from '../index'


const CSS=css`    

`

const Home=()=>{
    const {state,dispatch}=useContext(StoreContext);
    return(
        <h1>Home</h1>
    );
}

export default Home;