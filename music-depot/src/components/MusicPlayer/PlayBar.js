import React from 'react';
import "./MusicPlayer.css";


const PlayBar=({children})=>{
    return(
        <div className="PlayBar">
            {children}
        </div>
    );
}

export default PlayBar;