/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import PlayBar from './PlayBar';
import Content from './Content';
import {css,jsx} from "@emotion/react"

const CSS=css`
display:flex;
min-height: 100vh;
width: 100%;
position: relative;
color: #fff;
`

const MusicPlayer=()=>{
    return(
        <div className="MusicPlayer"  css={CSS}>
            <TopBar/>
            <SideBar></SideBar>
            <Content></Content>
            <PlayBar/>
        </div>
    );
}

export default MusicPlayer;