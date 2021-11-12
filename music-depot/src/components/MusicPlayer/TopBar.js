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
margin-top5px;
background:#191530;
.profileBar {
    width:190px;
    float:right;
    margin-top:5px;

}
.profileButton{
    display:flex;
    width:auto;
    cursor: pointer;


}
.profileButton:hover{

    background:#110e24;

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
                <div className="profileButton">
                    <Avatar alt={userNickname} src="/static/images/avatar/1.jpg" sx={{ width: 35, height: 35 }}/>
                    <span className="nickname"> {userNickname.length > 15 ? (userNickname.slice(0,14)+"...") : (userNickname)}</span>
                </div>
            </div>
            

        </div>
    );
}


export default TopBar;