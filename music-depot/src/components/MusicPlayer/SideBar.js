/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useState} from 'react';
import {css,jsx} from "@emotion/react"
import logo from '../../image/logo.png';
import { AiOutlineHome,AiOutlineSearch,AiOutlineStar } from 'react-icons/ai';
import {BiTimeFive} from 'react-icons/bi';
import {FiRadio} from 'react-icons/fi';
import {IoAddCircleOutline} from 'react-icons/io5';

import Modal from "./Modal";

const CSS=css`
width: 200px;
min-height: 100vh;
background: #1f1a3a;

img{
    height:50px;
    margin-top:10px;
}
ul{
    margin-top: 20px;
}

li{
    font-size: 15px;
    padding-left: 20px;
    text-transform:capitalize ;
    margin-bottom:10px;
    cursor:pointer;
    font-weight:400;
    transition: border-left .3s ease;
    
     
}
.Title{
    font-weight:300;
    font-size:10px;
    color:#999; 
    text-transform:uppercase;
    cursor:unset;
}

li.active{
    border-left:2px solid #0f7cf1;
    padding-left:18px;
    background: linear-gradient(to left, rgba(15,124,241,0), rgba(15,124,241,0.2))
}

.ll:hover{
    background: linear-gradient(to left, rgba(15,124,241,0), rgba(15,124,241,0.2))
}

.addList{
    font-size: 13px;
    text-transform:uppercase ;
    cursor:pointer;
    font-weight:100;
    position:absolute;
    bottom:100px;
    margin-left: 15px;
    border: 1px solid #0f7cf1;
    color:#0f7cf1;
    padding:10px;
    transition:0.3s ease;
}
.addList:hover{
    color:#fff;
    background-color:#0f7cf1;
}
.icon {
    vertical-align: bottom;
  }

form{
    button{
        background-color:#0f7cf1;
        color:white;
        padding:12.5px 30px;
        border-radius:25px;
        text-transform:uppercase;
        font-weight:bold;
        font-size:13px;
        border:none;
        cursor:pointer;
    }
    .modalTitle{
        margin:0;
        margin-bottom:35px;
    }
    input{
        margin-bottom:20px;
        height:35px;
        padding-left:8px;
        font-size:16px;
        width:100%;
        color:black;

    }
    .content-wrap{
        margin:0 auto;
        max-width:250px;
        text-align:center;
    }
}

`
const SideBar=({children})=>{
    const [state,setState]=useState({
        currentPlaylist:"",
        modal:false,
        mainList:{
            home:null,
            browse:null,
            radio:null,
        },
        library:{
            favorite:null,
            recently:null,
        },
        playlist:{
            testlist:null,
        }
    })

    const iconlist={
        home:<AiOutlineHome/>,
        browse:<AiOutlineSearch/>,
        radio: <FiRadio/>,
        favorite: <AiOutlineStar/>,
        recently:<BiTimeFive />,
        addList: <IoAddCircleOutline size={20} className="icon"/>,


    }

    const mainLists = Object.keys(state.mainList)
    const librarys = Object.keys(state.library)
    const playlists = Object.keys(state.playlist)

    
    return(
        <div className="SideBar"  css={CSS}>
            <img src={logo}/>
            
            <ul className="mainList"> 
                {mainLists.map(list => 
                
                <li 
                keys={list} className={list===state.currentPlaylist?'active ll':'ll'}
                onClick={()=>{
                    setState({...state,currentPlaylist:list})
                }} 
                >{iconlist[list]} {list}</li>)}
                



            </ul>

            <ul className="library">
                <li className="Title">Library</li>
                {librarys.map(list => 
                <li 
                keys={list} className={list===state.currentPlaylist?'active ll':'ll'}
                onClick={()=>{
                    setState({...state,currentPlaylist:list})
                }} 
                >{iconlist[list]} {list}</li>)}
            </ul>

            <ul className="playlist">
                <li className="Title">playlists</li>
                {playlists.map(list => 
                <li 
                keys={list} className={list===state.currentPlaylist?'active ll':'ll'}
                onClick={()=>{
                    setState({...state,currentPlaylist:list})
                }} 
                >{iconlist[list]} {list}</li>)}
            </ul>

            <p className="addList" onClick={()=>{setState({...state,modal:true})}} >{iconlist["addList"]} Add New Playlist</p>
            
            <Modal show={state.modal} close={()=>{setState({...state,modal:false})}}>
                <form>
                    <div className="content-wrap">
                    <div className="modalTitle">New Playlist</div>
                        <input type="text" placeholder="My Playlist" required />
                        <br/>
                        <button type="submit" className="btn">Create</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}


export default SideBar;