/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useState, useEffect, useRef } from "react";
import { useDetectOutsideClick } from '../../../hooks/useDetectOutsideClick'
import { useHistory } from 'react-router-dom';
import Modal from "../Modal";


import { css, jsx } from "@emotion/react";
import { StoreContext } from "../index";
import axios from "axios";
import { FaPlay } from "react-icons/fa"
import { FiMoreHorizontal } from "react-icons/fi"


import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../../../image", false, /\.(png|jpe?g|svg)$/)
);

const CSS = css`
  .icon{
     vertical-align: -5px;
     

  }
  .plHeaders {
    margin: 10px;
    display: flex;
  }
  .Header-content {
    margin-top: 60px;
    margin-left: 10px;
  }
  h1 {
    font-size: 60px;
    padding: 0px;
    margin: 5px;
    font-weight: 500;
  }
  h4 {
    padding: 0px;
    margin-left: 10px;
    margin-bottom: 0px;
    margin-top: 15px;
    text-transform: uppercase;
    font-size: 10px;
  }
  .buttons {
    display: flex;
    margin-left: 5px;
    margin-top: 20px;
    padding-top: 25px;
    padding-bottom: 75px;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    height: 70px;
  }
  .right {
    margin-left: auto;
    margin-right: 0;
    // position: relative;

  }
  .menu {
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 250px;
  right: 70px;
  width: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
}

.menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  border-bottom: 1px solid #dddddd;
}

.menu li a {
  text-decoration: none;
  color: #333333;
  padding: 15px 20px;
  display: block;
  cursor:pointer;
}
.settingBtn{
    background-color: rgba(0, 0, 0, 0);;
    color: white;
    font-weight: bold;
    font-size: 13px;
    border: none;
    cursor: pointer;
    height: 55px;
    width: 55px;
    margin-top: 0px;
    margin-left: 70px;
  }
  .btn {
    background-color: #0f7cf1;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
    border: none;
    cursor: pointer;
    height: 55px;
    width: 55px;
    margin-top: 0px;
    margin-left: 10px;
    border-radius: 50%;
  }
  .D {
    height: 40px;
    width: 40px;
    margin-left: 30px;
    margin-top: 7.5px;
  }
  .album {
    height: 200px;
    margin-top: 20px;
  }
  .scrollList {
    flex: 0 0 100%;
    height: calc(100vh - 125px);
    overflow-y: scroll;
  }
  .scrollList::-webkit-scrollbar {
    width: 15px;
  }
  .scrollList::-webkit-scrollbar-track {
    background: #rgb(255, 255, 255, 0); /* color of the tracking area */
  }

  .scrollList::-webkit-scrollbar-thumb {
    background-color: #282248; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 5px solid #282248; /* creates padding around scroll thumb */
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 5px;
    font-size: initial;
  }

  table tr {
    border-bottom: 1px solid #282828;
  }

  table td {
    padding-left: 10px;
  }
  .number {
    width: 1x;
  }
  thead {
    border-spacing: 10px;
  }
  .play{
    transition: 0.1s ease;
    
  }
  .play:hover{
    height: 60px;
    width: 60px;
  }
  .play:hover ~ .D{
        margin-left: 29px;
  }
  
  .modelbtn {
    background-color: #0f7cf1;
    color: white;
    padding: 12.5px 30px;
    border-radius: 25px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
    border: none;
    cursor: pointer;
  }
  .modalTitle {
    margin: 0;
    margin-bottom: 35px;
  }
  input {
    margin-bottom: 20px;
    height: 35px;
    padding-left: 8px;
    font-size: 16px;
    width: 100%;
    color: black;
  }
  .content-wrap {
    margin: 0 auto;
    max-width: 250px;
    text-align: center;
  }
  
  
  
`;


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Playlist = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const { state, dispatch } = useContext(StoreContext);
  const whereIsPlaylist =
    state.currentPlaylist === "favorite" || state.currentPlaylist === "recently"
      ? "library"
      : "mySongList";
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [modalState, setModelState] = useState(false)
  const handleModal = () => setModelState(!modalState)
  
  const playlistRef = useRef(null);
  const renamePlaylist = (e) => {
    e.preventDefault()
    const list = playlistRef.current.value
    if (state.mySongList.hasOwnProperty(list)) {
      toast.error('This playlist is already existed!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

      });

      setModelState(false)
      return;
    }


    (async function () {
      await axios({
        method: "POST",
        url: 'https://music-depot.ca/api/playlistapi/addplaylist',
        headers: { 'authorization': "bearer " + state.user.token },
        data: {
          playlistName: list,
        }
      }).then(async (res) => {
        await dispatch({ type: 'ADD_PLAYLIST', playlistItem: list })
        toast.success('Created successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,

        });
        setModelState(false)
      })

    })()


  }


  const deleteList = () => {
    (async function () {
      await axios({
        method: "POST",
        url: 'https://music-depot.ca/api/playlistapi/deleteplaylist',
        headers: { 'authorization': "bearer " + state.user.token },
        data: {
          playlistName: state.currentPlaylist,
        }
      }).then(async (res) => {
        setAnchorEl(null);
        dispatch({ type: "SET_PLAYLIST", playlistItem: "home" });
        if (res.data.mySongList !== undefined) {
          console.log("deleted")
          dispatch({ type: "LOAD_MYSONGLIST", mySongList: res.data.mySongList })
        } else {
          dispatch({ type: "LOAD_MYSONGLIST", mySongList: {} })
        }
      })

    })()
    setIsActive(false)
  }




  // const [reademail,setreademail]=useState();
  // const [emailState, setEmail] = useState("99999@gmail.com");

  // useEffect(() => {
  //   axios.get("https://music-depot.ca/api/testemail/read")
  //   .then((response)=>{
  //     setreademail(response['data'][1]['_id'])
  //   })
  // }, []);

  // const updateEmail= (id) => {
  //   axios.put("https://music-depot.ca/api/testemail/update", {
  //     id:id,
  //     newemail: "new@gmail.com",
  //   });
  // }

  // const sendEmail = () => {
  //   axios
  //     .post("https://music-depot.ca/api/testemail/insert", {
  //       email: emailState,
  //     })
  //     .then(console.log("SUCCESS POST"))
  //     .catch((err) => {
  //       console.error(`Unsuceess ${err}`);
  //     });
  // };





  return (
    <div className="pl" css={CSS}>
      <div className="scrollList">
        <div className="plHeaders">
          <img
            src={
              images[state[whereIsPlaylist][state.currentPlaylist]["album"]]
                .default
            }
            className="album"
          />
          <div className="Header-content">
            <h4>{whereIsPlaylist == 'mySongList' ? 'playlist' : 'library'}</h4>
            <h1 className="plTitle">
              {whereIsPlaylist === "library"
                ? Capitalize(state.currentPlaylist)
                : state.currentPlaylist}
            </h1>
          </div>
        </div>
        <div className="buttons">
          <div className="left">
            <button className="btn play"><FaPlay size={25} className="icon" /></button>
          </div>
          {
            state.currentPlaylist != "favorite" && state.currentPlaylist != "recently" ?
              (<div className="right">
                <button className="settingBtn"  
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                onClick={handleClick}
                ><FiMoreHorizontal size={35} /></button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleModal} disableRipple>
                    <EditIcon />
                    Rename
                  </MenuItem>
                  <MenuItem onClick={deleteList} disableRipple>
                    <DeleteIcon />
                    Delete
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleClose} disableRipple>
                    <ArchiveIcon />
                    Archive
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <MoreHorizIcon />
                    More
                  </MenuItem>
                </StyledMenu>
                
                {/* <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                  <ul>
                    <li><a onClick={renameList}>Rename</a></li>
                    <li><a onClick={deleteList}>Delete</a></li>
                    <li><a href="/">Other</a></li>
                  </ul>
                </nav> */}
              </div>)
              : <div />
          }
        </div>
        <table>
          <thead>
            <tr>
              <td className="number">#</td>
              <td>Title</td>
              <td>Artist</td>
              <td>Length</td>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
      <Modal show={modalState} close={handleModal}>
        <form onSubmit={renamePlaylist}>
          <div className="content-wrap">
            <div className="modalTitle">Rename Playlist</div>
            <input
              type="text"
              placeholder="My Playlist"
              required
              ref={playlistRef}
            />
            <br />
            <button type="submit" className="modelbtn">
              Rename
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Playlist;
// kl;