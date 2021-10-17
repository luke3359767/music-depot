/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useState} from 'react'
import { Global, css, jsx } from '@emotion/react'
import { useHistory,Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register" css={CSS}>
        <form action="null">
            <div class="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>

                <label for="username"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" id="username" required/>

                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required/>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required/>

                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required/>
                <hr/>

                <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                <button type="submit" class="registerbtn">Register</button>
            </div>

            <div class="container signin">
                <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
            </div>
        </form>
    </div>
  );
};

CSS=css`

`

export default Register;