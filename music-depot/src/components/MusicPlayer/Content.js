/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from './index'
import Browse from './Pages/Browse';
import Home from './Pages/Home';
import Playlist from './Pages/Playlist';
import Radio from './Pages/Radio';

const CSS=css`    
top:0;
left:0;
margin-top:50px;
width: calc(100vw - 200px);
height: calc(100vh - 125px);
padding: 0px;
background: #191530;

`

const Content=()=>{
    const {state,dispatch}=useContext(StoreContext);
    
    const switchPage=()=>{
        switch(state.currentPlaylist){
            case'home':
                return <Home/>
            case'radio':
                return <Radio/>
            case'browse':
                return <Browse/>
            default: return <Playlist/>
            
        }
    }
    return(
        <div className="Content" css={CSS}>
          {(switchPage())}
        </div>
    );
}


export default Content;