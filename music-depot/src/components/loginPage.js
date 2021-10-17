/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { Global, css, jsx } from "@emotion/react";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login" css={CSS}>
      <form action="null">
        <div class="container">
          <h1>Login</h1>
          <p>Please fill in this form to login an account.</p>
          <hr />

          <label for="username">
            <b>Username or Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username or Email"
            name="username"
            id="username"
            required
          />


          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            required
          />

          <hr />

          <p>
            By login an account you agree to our{" "}
            <a href="#">Terms & Privacy</a>.
          </p>
          <button type="submit" class="loginbtn">
            Login
          </button>
        </div>

        <div class="container signin">
          <p>
            Do not have an account? <Link to="/register">Sign Up</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};

CSS = css``;

export default Login;
