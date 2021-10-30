/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useReducer,createContext,useEffect,useRef} from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import PlayBar from './PlayBar';
import Content from './Content';
import Register from './auth/RegisterPage';
import Login from './auth/LoginPage';
import {css,jsx,Global} from "@emotion/react"
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route ,Redirect } from "react-router-dom"; 
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';


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
  isLogin:false,
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
        
        case'USER_LOGIN':
            return {...state,user:action.user,isLogin:action.isLogin};
        
        case'REFRESH_TOKEN':
            return{...state,user:{...state.user,token:action.token}}
    }
    return state
}

const MusicPlayer=()=>{
    const [state,dispatch] =useReducer(reducer,initialState)
    const isLogin=useRef(false)



  // const axiosJWT = axios.create();

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let currentDate = new Date();
  //     const decodedToken = jwt_decode(state.user.token);
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       const data = await refreshToken();
  //       config.headers["authorization"] = "Bearer " + data;
  //       dispatch({ type: "REFRESH_TOKEN",token: data })
  //       console.log('auto refresh token')
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  
  
  useEffect(async ()=>{
    await axios.post("https://music-depot.tech/api/userapi/autologin")
    .then((res) => {
      dispatch({ type: "USER_LOGIN", user: res.data ,isLogin:true})
      isLogin.current=true
      console.log("Auto Login")    
    }).catch((err) => err);
    // axios
  },[])
  
  useEffect(()=>{
    if(isLogin){
      const interval=setInterval(()=>{
        axios.post("https://music-depot.tech/api/userapi/refresh").then((res) => {
          dispatch({ type: "REFRESH_TOKEN", token: res.data.newAccessToken})
          console.log('auto refresh token')
          console.log(state.user)
        });

      },1*60*1000)
    }
  },[isLogin])
  
    return(
       <StoreContext.Provider value={{state,dispatch}}>
          <Router>
            <Global styles={GlobalCSS} />
            <Route exact path="/">
              {
                (isLogin.current)||(state.isLogin)?(
                  <div className="MusicPlayer"  css={CSS}>
                      <TopBar/>
                      <SideBar/>
                      <Content/>
                      <PlayBar/>
                  </div>

                ):<Redirect to="/login" />
              }
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