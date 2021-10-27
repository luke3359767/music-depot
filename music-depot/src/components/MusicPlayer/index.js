/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useReducer,createContext,useEffect} from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import PlayBar from './PlayBar';
import Content from './Content';
import {css,jsx} from "@emotion/react"
import axios from 'axios';

export const StoreContext = createContext()

const CSS=css`
display:flex;
min-height: 100vh;
width: 100%;
position: relative;
color: #fff;
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

// const initialState=({
//     currentPlaylist:DEFAULT_PLAYLIST,
//     mainList:{
//         home:{

//         },
//         browse:{

//         },
//         radio:{

//         },
//     },
//     library:{
//         favorite:{
//             album:"favorite.png"
//         },
//         recently:{
//             album:"sampleAlbum.jpg"
//         },
//     },
//     playlist:{
//         testlist:{
//             album:"sampleAlbum.jpg"
//         },
//     }
// });

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
            <div className="MusicPlayer"  css={CSS}>
                <TopBar/>
                <SideBar/>
                <Content/>
                <PlayBar/>
            </div>
       </StoreContext.Provider>
    );
}

export default MusicPlayer;