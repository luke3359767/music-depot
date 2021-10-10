/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useState} from 'react';
import {css,jsx} from "@emotion/react"
import logo from '../../image/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
    font-size: 13px;
    padding-left: 20px;
    text-transform:capitalize ;
    margin-bottom:10px;
    cursor:pointer;
    font-weight:500;
     
}
li.Title{
    font-weight:300;
    font-size:10px;
    color:#999; 
    text-transform:uppercase;
    cursor:unset;
}

li.active{
    border-left:2px solid #0f7cf1;
    padding-left:18px;
    background-image: linear-gradient(to left, rgba(15,124,241,0), rgba(15,124,241,0.2))
}

`
const SideBar=({children})=>{
    const [state,setState]=useState({
        currentPlaylist:"",
        mainList:{
            home:null,
            browse:null,
            radio:null,
        },
        library:{
            favorite:null
        },
        playlist:{
            testlist:null,
        }
    })
    const mainLists = Object.keys(state.mainList)
    const librarys = Object.keys(state.library)
    const playlists = Object.keys(state.playlist)

    return(
        <div className="SideBar"  css={CSS}>
            <img src={logo}/>
            
            <ul className="mainList"> 
                {mainLists.map(list => 
                <li 
                keys={list} className={list===state.currentPlaylist?'active':''}
                onClick={()=>{
                    setState({...state,currentPlaylist:list})
                }} 
                >{list}</li>)}

                <i className="fas fa-home"></i>


            </ul>

            <ul className="library">
                <li className="Title">Library</li>
                {librarys.map(list => 
                <li 
                keys={list} className={list===state.currentPlaylist?'active':''}
                onClick={()=>{
                    setState({...state,currentPlaylist:list})
                }} 
                >{list}</li>)}
            </ul>

            <ul className="playlist">
                <li className="Title">playlists</li>
                {playlists.map(list => 
                <li 
                keys={list} className={list===state.currentPlaylist?'active':''}
                onClick={()=>{
                    setState({...state,currentPlaylist:list})
                }} 
                >{list}</li>)}
            </ul>

        </div>
    );
}


export default SideBar;