/** @jsxRuntime classic */
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/react";
import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const CSS = css`
  .container {
    font-family: "Quicksand", sans-serif;
  }

  .login,
  .home {
    width: 200px;
    height: 200px;
    padding: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border: 1px solid lightgray;
    border-radius: 10px;
  }

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .formTitle {
    color: teal;
    font-weight: bold;
  }

  input {
    height: 30px;
    border: none;
    border-bottom: 1px solid lightgray;
  }

  input:focus {
    outline: none;
  }

  .submitButton {
    width: 100px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: teal;
    color: white;
    cursor: pointer;
  }

  .home {
    width: 300px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }

  .deleteButton {
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #fff0f1;
    color: #d95087;
    cursor: pointer;
  }

  .deleteButton:hover {
    background-color: #fad4d7;
  }

  .error {
    font-size: 12px;
    color: crimson;
  }

  .success {
    font-size: 12px;
    color: green;
  }
`;

const Login = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const cookies = new Cookies();

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/refresh", {
        token: user.refreshToken,
      });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
        console.log('auto refresh tocken')
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    try {
      await axiosJWT.delete("http://localhost:5000/api/users/" + id, {
        headers: { authorization: "Bearer " + user.accessToken },
      });
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="container" css={CSS}>
      {user ? (
        <div className="home">
          <span>
            Welcome to the <b>{user.isAdmin ? "admin" : "user"}</b> dashboard{" "}
            <b>{user.username}</b>.
          </span>
          <span>Delete Users:</span>
          <button className="deleteButton" onClick={() => handleDelete(1)}>
            Delete John
          </button>
          <button className="deleteButton" onClick={() => handleDelete(2)}>
            Delete Jane
          </button>
          {error && (
            <span className="error">
              You are not allowed to delete this user!
            </span>
          )}
          {success && (
            <span className="success">
              User has been deleted successfully...
            </span>
          )}
        </div>
      ) : (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="formTitle">Lama Login</span>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;

// /** @jsxRuntime classic */
// /** @jsx jsx */
// import React, { useState } from "react";
// import { Global, css, jsx } from "@emotion/react";
// import { useHistory, Link } from "react-router-dom";

// const Login = () => {
//   return (
//     <div className="login" css={CSS}>
//       <form action="null">
//         <div class="container">
//           <h1>Login</h1>
//           <p>Please fill in this form to login an account.</p>
//           <hr />

//           <label for="username">
//             <b>Username or Email</b>
//           </label>
//           <input
//             type="text"
//             placeholder="Enter Username or Email"
//             name="username"
//             id="username"
//             required
//           />

//           <label for="psw">
//             <b>Password</b>
//           </label>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             name="psw"
//             id="psw"
//             required
//           />

//           <hr />

//           <p>
//             By login an account you agree to our{" "}
//             <a href="#">Terms & Privacy</a>.
//           </p>
//           <button type="submit" class="loginbtn">
//             Login
//           </button>
//         </div>

//         <div class="container signin">
//           <p>
//             Do not have an account? <Link to="/register">Sign Up</Link>.
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// CSS = css``;

// export default Login;
