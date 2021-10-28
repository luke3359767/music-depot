/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useReducer,createContext,useEffect} from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import PlayBar from './PlayBar';
import Content from './Content';
import Register from './auth/RegisterPage';
import Login from './auth/LoginPage';
import {css,jsx,Global} from "@emotion/react"
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 


export const StoreContext = createContext()

const CSS=css`
display:flex;
min-height: 100vh;
width: 100%;
position: relative;
color: #fff;
`
const GlobalCSS = css`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  html,
  body,
  .app {
    margin: 0;
    height: 100%;
    width: 100%;
  }
  a {
    text-decoration: none;
  }
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
`
const DEFAULT_PLAYLIST='home';


const initialState = {
  currentPlaylist: DEFAULT_PLAYLIST,
  mainList: {
    home: {},
    browse: {},
    radio: {},
  },

  user: {
    
  },
  library:{
      favorite: {
        album: "favorite.png",
        songs: ["1111"],
      },
      recently: {
        album: "sampleAlbum.jpg",
        songs: ["1111"],
      },
  },
  mySongList: {
    TestList1: {
      album: "sampleAlbum.jpg",
      songs: ["1111"],
    },
    TestList2: {
      album: "sampleAlbum.jpg",
      songs: ["1111"],
    },
  },
};


const reducer= (state,action)=>{
    // {type:'ADD_PLAYLIST',playlistItem:"Rock and Roll"}
    switch(action.type){
        case'ADD_PLAYLIST':
            return {
              ...state,
              mySongList: {
                ...state.mySongList,
                [action.playlistItem]: {
                  album: "sampleAlbum.jpg",
                  songs: [],
                },
              },
            };
        case'SET_PLAYLIST':
            return {...state,currentPlaylist:action.playlistItem};
        
    }
    return state
}

const MusicPlayer=()=>{
    const [state,dispatch] =useReducer(reducer,initialState)

    useEffect(()=>{
        axios.get("https://music-depot.tech/api/")
         .then((res) => {
        console.log("connect to server!")    
        })
         .catch((err) => err);
    },[])

    return(
       <StoreContext.Provider value={{state,dispatch}}>
          <Router>
            <Global styles={GlobalCSS} />
            <Route exact path="/">
              <div className="MusicPlayer"  css={CSS}>
                  <TopBar/>
                  <SideBar/>
                  <Content/>
                  <PlayBar/>
              </div>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
          </Router>
       </StoreContext.Provider>
    );
}

export default MusicPlayer;