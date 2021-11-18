/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx } from '@emotion/react'
import MusicPlayer from './MusicPlayer'
import { BrowserRouter as Router, Switch, Route ,Redirect,useHistory } from "react-router-dom"; 


/**
 * @function App
 */

const App = () => (
      <Router>
            <MusicPlayer />
      </Router>
);


export default App

