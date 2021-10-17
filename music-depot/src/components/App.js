/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { Global, css, jsx } from '@emotion/react'
import MusicPlayer from './MusicPlayer'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import Register from './RegisterPage';
import Login from './LoginPage';

/**
 * @function App
 */
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
const App = () => (
  <Router>
    <Global styles={GlobalCSS} />
    <Route exact path="/">
      <MusicPlayer />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/login">
      <Login/>
    </Route>
  </Router>
);


export default App

