/** @jsxRuntime classic */
/** @jsx jsx */
import React, {useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from "../MusicPlayer/index";


import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';


const CSS=css`
position:absolute;
width: calc(100% - 200px);
height:50px;
left:200px;
padding-top:5px;
background:#191530;
border:1px solid #fff;
.profileBar {
    width:200px;
    display:flex;
    float:right;
    max-width:200px;
    border:1px solid #fff;

}
.nickname {
    margin: auto 5px;
    width: 50%;
}

`

const TopBar=()=>{
    const { state, dispatch } = useContext(StoreContext);
    const userNickname = state.user.nickname

    return(
        <div className="TopBar" css={CSS}>
            <div className="searchBar"></div>
            <div className="profileBar">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 35, height: 35 }}/>
                <span className="nickname">{userNickname.length > 15 ? (userNickname.slice(0,14)+"...") : (userNickname)}</span>
            </div>
            

        </div>
    );
}


export default TopBar;