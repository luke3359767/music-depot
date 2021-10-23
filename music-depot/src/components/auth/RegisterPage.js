/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react'
import { Global, css, jsx } from '@emotion/react'
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import './registerPage.css'
import logo from "../../image/logo.png"
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");

  const [diffPassword, setDiffPassword] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrList, setPasswordErrList] = useState([]);
  const [usedUserErr, setUsedUserErr] = useState(false);
  const [usedEmailErr, setUsedEmailErr] = useState(false);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword || rePassword == "") {
      setDiffPassword(true);
      return;
    }

    const res = await axios.post("http://localhost:5000/userapi/register", {
      registerInfo: {
        username: username,
        email: email,
        password: password,
        nickname: nickname,
        gender:gender,

      }
    }).then((res) => console.log(res))
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 405) {
            console.log("Password is too weak, it should contains at least 1 uppercase, 1 lowercase, 1 symbol, and 1 digit")
            console.log(err.response.data)
            setPasswordErr(true);
            setPasswordErrList(err.response.data.passwordValidateErr);

          } else if (err.response.status == 403) {
            console.log(err.response.data)
            setPasswordErr(false);
            if (err.response.data.emailErr!==null) { setUsedEmailErr(true) } else { setUsedEmailErr(false)}
            if (err.response.data.userErr !== null) { setUsedUserErr(true) } else { setUsedUserErr(false)}
            // Object.keys(err.response.data).map((key) => key == "emailErr" ?: setUsedUserErr(true))
          }
        }
      });
    //  history.push("/");
  };

  const diffPassRender = (d) => {
    return d ? (<p className="warning">Passwords are not matched.</p>) : null
  }
  const passwordErrRender = (d) => {
    return d ? (passwordErrList.map((key) => {
      if (key == 'min') return (<p className="warning">The password should have at least 8 letters</p>)
      if (key == 'max') return (<p className="warning">The password should less than 20 letters</p>)
      if (key == 'uppercase') return (<p className="warning">The password should have at least 1 uppercase</p>)
      if (key == 'symbols') return (<p className="warning">The password should have at least 1 symbol</p>)
      if (key == 'digits') return (<p className="warning">The password should have at least 1 digit</p>)
    })) : null
  }
  const usedUserErrRender=(d)=>{
    return d ? (<p className="warning">The username is invalid</p>) : null
  }
  const usedEmailErrRender=(d)=>{
    return d ? (<p className="warning">The email has been used. Alrealy register? <Link to="/login">Log In</Link></p>) : null
  }

  return (
    <div className="wole-container">
      <img src={logo} alt="no" />

      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Sign Up</h2>
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
                {usedUserErrRender(usedUserErr)}
                <div className="input_field">
                  {" "}
                  <span>
                    <IoMdMail className="icon" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                  {usedEmailErrRender(usedEmailErr)}
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
                {passwordErrRender(passwordErr)}
                <div className="input_field">
                  {" "}
                  <span>
                    <RiLockPasswordFill className="icon" />
                  </span>
                  <input
                    className={password !== rePassword ? "diffPassword" : ""}
                    type="Password"
                    name="rePassword"
                    placeholder="Re-type Password"
                    required
                    onChange={(e) => {
                      setRePassword(e.target.value)
                      if (password !== e.target.value) {
                        setDiffPassword(true);
                      } else {
                        setDiffPassword(false);
                      }
                    }}
                  />
                </div>
                {diffPassRender(diffPassword)}
                <div className="row clearfix">
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <span>
                        <BsFillPersonFill className="icon" />
                      </span>
                      <input type="text" name="name" placeholder="What do you want to be called?" required onChange={(e) => { setNickname(e.target.value)}} />
                    </div>
                  </div>
                </div>
                <div className="input_field radio_option">
                  <input type="radio" name="radiogroup1" id="rd1" required onChange={(e) => { setGender(e.target.value) }} />
                  <label for="rd1">Male</label>
                  <input type="radio" name="radiogroup1" id="rd2" onChange={(e) => { setGender(e.target.value) }} />
                  <label for="rd2">Female</label>
                  <input type="radio" name="radiogroup1" id="rd3" onChange={(e) => { setGender(e.target.value) }} />
                  <label for="rd3">Other</label>
                </div>

                <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb1" required/>
                  <label for="cb1">I agree with <Link to="/terms">terms and conditions</Link></label>
                </div>
                <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb2" />
                  <label for="cb2">I want to receive the newsletter</label>
                </div>
                <input className="button" type="submit" value="Register" />
              </form>
              <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;