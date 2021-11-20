/** @jsxRuntime classic */
/** @jsx jsx */
import React, {useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from "../MusicPlayer/index";
import axios from 'axios';


import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

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
    height:50px;


}
.profileButton:hover{

    background:#110e24;

}
.nickname {
    margin: auto 5px;
    width: 50%;
}
.avatar{
        margin: auto 0px;

}
`

const TopBar=()=>{
    const { state, dispatch } = useContext(StoreContext);
    const userNickname = state.user.nickname

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout=()=>{
        (async function () {
            await axios({
                method: "POST",
                url: 'https://music-depot.ca/api/userapi/logout',
                headers: { 'authorization': "bearer " + state.user.token },
            }).then(async (res) => {
                await dispatch({ type: 'USER_LOGOUT'})

            })

        })()

    }

    return(
        <div className="TopBar" css={CSS}>
            <div className="searchBar"></div>
            <div className="profileBar">
                <div className="profileButton" onClick={handleClick}>
                    <Avatar className="avatar" alt={userNickname} src="/static/images/avatar/1.jpg" sx={{ width: 35, height: 35 }}/>
                    <span className="nickname"> {userNickname.length > 15 ? (userNickname.slice(0,14)+"...") : (userNickname)}</span>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            

        </div>
    );
}


export default TopBar;