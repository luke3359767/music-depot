/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from '../index'
import axios from 'axios';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../../image', false, /\.(png|jpe?g|svg)$/));

console.log(images)

const CSS = css`
  .plHeaders {
    margin: 10px;
    display: flex;
  }
  h1 {
    font-size: 60px;
    padding: 0px;
    margin: 5px;
    font-weight: 300;
  }
  .buttons {
    display: flex;
    margin-left: 5px;
  }
  .btn {
    background-color: #0f7cf1;
    color: white;
    padding: 7.5px 20px;
    border-radius: 25px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
    border: none;
    cursor: pointer;
    margin-left: 10px;
  }
  .album {
    height: 150px;
    margin-top: 20px;
  }
  .scrollList {
    flex:0 0 100%;
    height: calc(100vh - 125px);
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

const Playlist=()=>{
    const Capitalize=(str)=>{return str.charAt(0).toUpperCase() + str.slice(1);}
    const {state,dispatch}=useContext(StoreContext);
    const whereIsPlaylist=(state.currentPlaylist==='favorite')||(state.currentPlaylist==='recently')?'library':'playlist';
    console.log(images[state[whereIsPlaylist][state.currentPlaylist]["album"]].default);
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
                <h1 className="plTitle">
                {whereIsPlaylist === "library"
                    ? Capitalize(state.currentPlaylist)
                    : state.currentPlaylist}
                </h1>
                <div className="buttons">
                <button className="btn">PLAY</button>
                <button className="btn">Delete</button>
                </div>
            </div>
            </div>
          <h1>1</h1>
          <h1>2</h1>
          <h1>3</h1>
          <h1>4</h1>
          <h1>5</h1>
          <h1>6</h1>
          <h1>7</h1>
          <h1>8</h1>
          <h1>9</h1>
          <h1>10</h1>
        </div>
      </div>
    );
}

export default Playlist;