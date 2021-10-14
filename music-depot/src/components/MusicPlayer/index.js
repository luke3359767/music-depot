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

const initialState=({
    currentPlaylist:DEFAULT_PLAYLIST,
    mainList:{
        home:new Set(),
        browse:new Set(),
        radio:new Set(),
    },
    library:{
        favorite:new Set(),
        recently:new Set(),
    },
    playlist:{
        testlist:new Set(),
    }
});

const reducer= (state,action)=>{
    // {type:'ADD_PLAYLIST',playlistItem:"Rock and Roll"}
    switch(action.type){
        case'ADD_PLAYLIST':
            return {...state,playlist:{...state.playlist,[action.playlistItem]:new Set()}};
        case'SET_PLAYLIST':
            return {...state,currentPlaylist:action.playlistItem};
        
    }
    return state
}

const MusicPlayer=()=>{
    const [state,dispatch] =useReducer(reducer,initialState)

    useEffect(()=>{
        axios.get("http://localhost:5000/testapi")
         .then((res) => {
             console.log(typeof(res));
             this.setState({ apiResponse: res.data });
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