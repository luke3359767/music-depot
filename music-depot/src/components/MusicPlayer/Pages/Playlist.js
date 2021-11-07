/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useState, useEffect, useRef} from "react";
import { useDetectOutsideClick } from '../../../hooks/useDetectOutsideClick'
import { useHistory } from 'react-router-dom';

import { css, jsx } from "@emotion/react";
import { StoreContext } from "../index";
import axios from "axios";
import { FaPlay} from "react-icons/fa"
import { FiMoreHorizontal} from "react-icons/fi"
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
  
`;

const Playlist = () => {
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
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef,false);

  const renameList=()=>{
    console.log("renameList")
    setIsActive(false)
  }

  const deleteList = () => {
      (async function () {
        await axios({
          method: "POST",
          url: 'https://music-depot.tech/api/playlistapi/deleteplaylist',
          headers: { 'authorization': "bearer " + state.user.token },
          data: {
            playlistName: state.currentPlaylist,
          }
        }).then(async (res) => {
          
          dispatch({ type: "SET_PLAYLIST", playlistItem: "home" });
          if (res.data.mySongList !== undefined){
            console.log("deleted")
            dispatch({ type: "LOAD_MYSONGLIST", mySongList: res.data.mySongList })
          }else{
            dispatch({ type: "LOAD_MYSONGLIST", mySongList: {} })
          }
        })

      })()
    setIsActive(false)
  }

  
      

  // const [reademail,setreademail]=useState();
  // const [emailState, setEmail] = useState("99999@gmail.com");

  // useEffect(() => {
  //   axios.get("https://music-depot.tech/api/testemail/read")
  //   .then((response)=>{
  //     setreademail(response['data'][1]['_id'])
  //   })
  // }, []);

  // const updateEmail= (id) => {
  //   axios.put("https://music-depot.tech/api/testemail/update", {
  //     id:id,
  //     newemail: "new@gmail.com",
  //   });
  // }

  // const sendEmail = () => {
  //   axios
  //     .post("https://music-depot.tech/api/testemail/insert", {
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
            <h4>{whereIsPlaylist=='mySongList'?'playlist':'library'}</h4>
            <h1 className="plTitle">
              {whereIsPlaylist === "library"
                ? Capitalize(state.currentPlaylist)
                : state.currentPlaylist}
            </h1>
          </div>
        </div>
        <div className="buttons">
          <div className="left">
            <button className="btn play"><FaPlay size={25} className="icon"/></button>
          </div>
          {
            state.currentPlaylist != "favorite" && state.currentPlaylist != "recently"?
             ( <div className="right">
                <button className="settingBtn" onClick={() => setIsActive(!isActive)}><FiMoreHorizontal size={35}/></button>
                <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                  <ul>
                    <li><a onClick={renameList}>Rename</a></li>
                    <li><a onClick={deleteList}>Delete</a></li>
                    <li><a href="/">Other</a></li>
                  </ul>
                </nav>
              </div>)
            :<div/>
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
    </div>
  );
};

export default Playlist;
// kl;