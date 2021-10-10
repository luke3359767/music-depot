/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useState} from 'react';
import {css,jsx} from "@emotion/react"
import logo from '../../image/logo.png';

const CSS=css`
width: 200px;
min-height: 100vh;
background: #121233;

img{
    height:50px;
    margin-top:10px;
}
ul{
    margin-top: 20px;
}

li{
    font-size: 12px;
    padding-left: 20px;
    text-transform:capitalize ;
    margin-bottom:10px;
    cursor:pointer;
    font-weight:bold;
     
}

li.active{
    border-left:2px solid #0f7cf1;
    padding-left:18px;
    background-image: linear-gradient(to left, rgba(15,124,241,0), rgba(15,124,241,0.2))
}

`
const SideBar=({children})=>{
    const [state,setState]=useState({
        currentPlaylist:"home",
        playlist:{
            home:null,
            favorite:null
        }
    })

    const playlists = Object.keys(state.playlist)

    return(
        <div className="SideBar"  css={CSS}>
            <img src={logo}/>
            <ul>
                {playlists.map(list => <li keys={list} className={list===state.currentPlaylist?'active':''} >{list}</li>)}
            </ul>
        </div>
    );
}


export default SideBar;