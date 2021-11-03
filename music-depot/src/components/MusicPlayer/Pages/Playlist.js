/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useState, useEffect } from "react";
import { css, jsx } from "@emotion/react";
import { StoreContext } from "../index";
import axios from "axios";
import { FaPlay} from "react-icons/fa"
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
  }
  border-spacing: 10px;
`;

const Playlist = () => {
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const { state, dispatch } = useContext(StoreContext);
  const whereIsPlaylist =
    state.currentPlaylist === "favorite" || state.currentPlaylist === "recently"
      ? "library"
      : "mySongList";
      

      

  const [reademail,setreademail]=useState();
  const [emailState, setEmail] = useState("99999@gmail.com");

  useEffect(() => {
    axios.get("https://music-depot.tech/api/testemail/read")
    .then((response)=>{
      setreademail(response['data'][1]['_id'])
    })
  }, []);

  const updateEmail= (id) => {
    axios.put("https://music-depot.tech/api/testemail/update", {
      id:id,
      newemail: "new@gmail.com",
    });
  }

  const sendEmail = () => {
    axios
      .post("https://music-depot.tech/api/testemail/insert", {
        email: emailState,
      })
      .then(console.log("SUCCESS POST"))
      .catch((err) => {
        console.error(`Unsuceess ${err}`);
      });
  };





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
            <button className="btn Play"><FaPlay size={40}/></button>
            <button className="btn D">D</button>
          </div>
          {/* <div className="right">
            <button className="btn Play">P</button>
            <button className="btn D">D</button>
          </div> */}
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