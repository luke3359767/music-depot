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
    width:150px;
    display:flex;
    float:right;
}
.nickname {
    margin: auto 5px;
    width: 50%;
}

`

const TopBar=()=>{
    const { state, dispatch } = useContext(StoreContext);

    return(
        <div className="TopBar" css={CSS}>
            <div className="searchBar"></div>
            <div className="profileBar">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 40, height: 40 }}/>
                <span className="nickname">{state.user.nickname}</span>
            </div>
            

        </div>
    );
}


export default TopBar;