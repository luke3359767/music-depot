/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from '../index'
import sampleAlbum from '../../../image/sampleAlbum.jpg';

const CSS=css`
.plHeaders{
    margin:10px;
    display:flex;
}    
h1{
    font-size: 60px;
    padding:0px;
    margin:5px;
    font-weight:300;
}
.buttons{
    display:flex;
    margin-left:5px
}
.btn{
    background-color:#0f7cf1;
    color:white;
    padding:7.5px 20px;
    border-radius:25px;
    text-transform:uppercase;
    font-weight:bold;
    font-size:13px;
    border:none;
    cursor:pointer;
    margin-left:10px;
}
.album{
    height:150px;
    margin-top:20px;
}
`

const Playlist=()=>{
    const {state,dispatch}=useContext(StoreContext);
    return(
        <div className="pl" css={CSS}>
            <div className="plHeaders">
                <img src={sampleAlbum} className="album"/>
                <div className="Header-content">
                    <h1 className="plTitle">{state.currentPlaylist}</h1>
                    <div className="buttons">
                        <button className="btn">PLAY</button>
                        <button className="btn">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playlist;