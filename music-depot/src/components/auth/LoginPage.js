/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from 'react'
import { jsx } from '@emotion/react'
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useCookies} from "react-cookie";


import './LoginPage.css'
import logo from "../../image/logo.png"
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [expiredDay, setExpiredDay]= useState(1);


  const [loginErr, setloginErr] = useState(false);


  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/userapi/login", {
      username: username,
      password: password,
      expiredDay:expiredDay,
    }, {withCredentials:true}).then((res) => {
      console.log(res)

      
    })
      .catch((err) => {
        setloginErr(true);
        console.log(err.response)
      })
  };

  const loginErrRender = (d) => {
    return d ? (<p className="warning">Username or Password incorrect</p>) : null
  }

  return (
    <div className="wole-container">
      <img src={logo} alt="no" />
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Login</h2>
          </div>
          <div className="row clearfix">
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="input_field">
                  {" "}
                  <span>
                    <BsFillPersonFill className="icon" />
                  </span>
                  <input
                    type="username"
                    name="username"
                    placeholder="Username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {loginErrRender(loginErr)}
                <div className="input_field">
                  {" "}
                  <span>
                    <RiLockPasswordFill className="icon" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {loginErrRender(loginErr)}

                <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb1" onChange={(e)=>{
                    e.target.checked === true ? setExpiredDay(30) : setExpiredDay(1)
                  }}/>
                  <label for="cb1">Remember me</label>
                </div>
                <input className="button" type="submit" value="Register" />
              </form>
              <p>Forget password?  <Link to="/reset">Reset</Link></p>
              <p>Do not have an account?  <Link to="/register">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;