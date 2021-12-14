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

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [expiredDay, setExpiredDay] = useState(1);


    const [loginErr, setloginErr] = useState(false);


    let history = useHistory();

    useEffect(() => {
        (async function () {
            await axios.post("https://music-depot.ca/api/userapi/autologin")
                .then(async (res) => {
                    await dispatch({ type: "USER_LOGIN", user: res.data, isLogin: true })
                    console.log("Auto Login")
                }).catch((err) => history.push("/login"));
        })()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("https://music-depot.ca/api/userapi/login", {
            username: username,
            password: password,
            expiredDay: expiredDay,
        }, { withCredentials: true }).then(async (res) => {
            await dispatch({ type: "USER_LOGIN", user: res.data, isLogin: true })
            console.log(state.user)

        })
            .catch((err) => {
                setloginErr(true);
                console.log(err.response)
            })
    };

  

    return (
        <div>
            {
                    state.user.username==="luke3359767"?(
                    <div className="wole-container">
                        Welcome, developer!
                    </div>
                    ): <Redirect to="/12345"/>
                
            }
        </div>

    )
};

export default Develop;