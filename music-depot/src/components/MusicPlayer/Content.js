/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from './index'
import { createMemoryHistory } from 'history';
import {Switch,Router,Route} from 'react-router-dom';
import Browse from './Pages/Browse';
import Home from './Pages/Home';
import Library from './Pages/Library';
import Playlist from './Pages/Playlist';
import Radio from './Pages/Radio';

const CSS=css`    
top:0;
left:0;
width: calc(100% - 200px);
min-height: 100%;
padding: 20px;
background: #191530;

`

const Content=()=>{
    const {state,dispatch}=useContext(StoreContext);
    const memoryHistory = createMemoryHistory();
    
    const switchPage=()=>{
        switch(state.currentPlaylist){
            case'home':
                return <Home/>
            case'favorite':
                return <Library/>
            case'recently':
                return <Library/>
            case'radio':
                return <Radio/>
            case'browse':
                return <Browse/>
            default: return <Playlist/>
            
        }
    }
    return(
        <div className="Content" css={CSS}>
          {switchPage()}
        </div>
    );
}


export default Content;