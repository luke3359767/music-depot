/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useRef, useContext, useEffect} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from './index'
import logo from '../../image/logo.png';
import { AiOutlineHome,AiOutlineSearch,AiOutlineStar } from 'react-icons/ai';
import {BiTimeFive} from 'react-icons/bi';
import {FiRadio} from 'react-icons/fi';
import {IoAddCircleOutline} from 'react-icons/io5';
import {MdOutlineMusicNote} from 'react-icons/md';
import {useHistory} from 'react-router-dom';
import axios from 'axios';



import Modal from "./Modal";
import Toast from "./Toast";

const SideBar=({children})=>{
    const history = useHistory();
    
    const [sidebarState,setState]=useState({
        modal:false,
        toast:'',
    })

    
    const iconlist={
        home:<AiOutlineHome className="icon"/>,
        browse:<AiOutlineSearch className="icon"/>,
        radio: <FiRadio className="icon"/>,
        favorite: <AiOutlineStar className="icon"/>,
        recently:<BiTimeFive  className="icon"/>,
        addList: <IoAddCircleOutline size={20} className="Big-icon"/>,
        
        
    }
    const { state, dispatch } = useContext(StoreContext)    
    const mainLists = Object.keys(state.mainList)
    const librarys = Object.keys(state.library);
    const playlists = useRef(Object.keys(state.mySongList) || []);
    useEffect(() => {
      if ((state.mySongList == null || state.mySongList == undefined) && (playlists.current!==[])){
        playlists.current = []
      }
    }, [state.mySongList])
    
    const playlistRef=useRef(null);
   

    const addPlaylist = (e)=>{
        e.preventDefault()
        const list=playlistRef.current.value
      if (state.mySongList.hasOwnProperty(list)) {
          setState({
            ...sidebarState,
            modal: false,
            toast: "Your playlist is ALREADY existed",
          });
          return;
        }


        (async function(){
          await axios({ 
            method:"POST",
            url: 'https://music-depot.tech/api/playlistapi/addplaylist',
            headers: { 'authorization': "bearer " + state.user.token },
            data:{
              playlistName:list,
            }
          }).then(async (res) => {
            await dispatch({ type: 'ADD_PLAYLIST', playlistItem: list })
            // await dispatch({ type: "LOAD_PLAYLIST", library: res.data.library, mySongList: res.data.mySongList })
            setState({
              ...sidebarState,
              modal: false,
              toast: "Your playlist was created successfully"
            })
          })
    
        })()
        
       
    }
    const handleModal=()=>setState({...sidebarState,modal:!sidebarState.modal})
    
    return (
      <div className="SideBar" css={CSS}>
        <img src={logo} />

        <ul className="mainList">
          {mainLists.map((list) => (
            <li
              key={list}
              className={list === state.currentPlaylist ? "active ll" : "ll"}
              onClick={() => {
                dispatch({ type: "SET_PLAYLIST", playlistItem: list });
              }}
            >
              {iconlist[list]} {list}
            </li>
          ))}
        </ul>

        <ul className="library">
          <li className="Title">Library</li>
          {librarys.map((list) => (
            <li
              key={list}
              className={list === state.currentPlaylist ? "active ll" : "ll"}
              onClick={() => {
                dispatch({ type: "SET_PLAYLIST", playlistItem: list });
              }}
            >
              {iconlist[list]} {list}
            </li>
          ))}
        </ul>

        <ul className="playlist">
          <li className="Title">playlists</li>
          <div className="scrollList">
            {playlists.current.map((list) => (
              <li
                key={list}
                className={
                  list === state.currentPlaylist ? "active ll pl" : "ll pl"
                }
                onClick={() => {
                  dispatch({ type: "SET_PLAYLIST", playlistItem: list });
                }}
              >
                <MdOutlineMusicNote className="icon" /> {list}
              </li>
            ))}
          </div>
        </ul>

        <p
          className="addList"
          onClick={() => {
            setState({ ...sidebarState, modal: true });
          }}
        >
          {iconlist["addList"]} Add New Playlist
        </p>

        <Modal show={sidebarState.modal} close={handleModal}>
          <form onSubmit={addPlaylist}>
            <div className="content-wrap">
              <div className="modalTitle">New Playlist</div>
              <input
                type="text"
                placeholder="My Playlist"
                required
                ref={playlistRef}
              />
              <br />
              <button type="submit" className="btn">
                Create
              </button>
            </div>
          </form>
        </Modal>

        <Toast
          toast={sidebarState.toast}
          close={() => setState({ ...sidebarState, toast: "" })}
        />
      </div>
    );
}


export default SideBar;
const CSS = css`
  width: 200px;
  min-height: 100vh;
  background: #1f1a3a;

  img {
    height: 50px;
    margin-top: 10px;
  }
  ul {
    margin-top: 20px;
  }

  li {
    font-size: 13px;
    padding-left: 20px;
    margin-bottom: 10px;
    text-transform: capitalize;
    cursor: pointer;
    font-weight: 400;
    transition: all 0.3s ease;
  }
  .pl {
    text-transform: none;
  }
  .Title {
    font-weight: 300;
    font-size: 10px;
    color: #999;
    text-transform: uppercase;
    cursor: unset;
  }

  li.active {
    border-left: 2px solid #0f7cf1;
    background: linear-gradient(
      to left,
      rgba(15, 124, 241, 0),
      rgba(15, 124, 241, 0.2)
    );
    box-shadow: 0 0 10px #0f7cf1;
  }

  .ll:hover {
    border-left: 2px solid #0f7cf1;
  }

  .addList {
    font-size: 13px;
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 100;
    position: absolute;
    bottom: 90px;
    margin-left: 15px;
    border: 1px solid #0f7cf1;
    color: #0f7cf1;
    padding: 10px;
    transition: 0.3s ease;
  }
  .addList:hover {
    color: #fff;
    background-color: #0f7cf1;
    box-shadow: 0 0 10px #0f7cf1;
  }
  .icon {
    vertical-align: -2px;
  }
  .Big-icon {
    vertical-align: bottom;
  }

  form {
    button {
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
  }
  .scrollList {
    padding-top: 5px;
    height: 130px;
    overflow-y: scroll;
  }
  .scrollList::-webkit-scrollbar {
    width: 5px;
  }
  .scrollList::-webkit-scrollbar-track {
    background: #rgb(255, 255, 255, 0); /* color of the tracking area */
  }

  .scrollList::-webkit-scrollbar-thumb {
    background-color: blue; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid #282248; /* creates padding around scroll thumb */
  }
`;