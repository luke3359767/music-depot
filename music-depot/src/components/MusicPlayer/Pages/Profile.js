/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useState } from 'react';
import { css, jsx } from "@emotion/react"
import { StoreContext } from '../index'
import axios from 'axios';

const CSS = css`    

`

const Profile = () => {
    const { state, dispatch } = useContext(StoreContext);

    return (
        <h1>Profile</h1>

    );
}

export default Profile;