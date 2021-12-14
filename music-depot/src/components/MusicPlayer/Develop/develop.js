/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from 'react'
import { jsx } from '@emotion/react'
import { useHistory, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useContext,useEffect } from 'react';
import { StoreContext } from '../index'

import logo from "../../../image/logo.png"

const Develop = () => {

    const { state, dispatch } = useContext(StoreContext);

    let history = useHistory();

    useEffect(() => {
        (async function () {
            await axios.post("https://music-depot.ca/api/userapi/autologin")
                .then(async (res) => {
                    await dispatch({ type: "USER_LOGIN", user: res.data, isLogin: true })
                    console.log("Auto Login")
                }).catch((err) => history.push("/login"));
            if (state.username !=="luke3359767"){
                history.push("/")
            }
        })()
    }, [])

  
  

    return (
        <div>
            
                        Welcome, developer!
                        your name is {state.user.username}
                
            
        </div>

    )
};

export default Develop;