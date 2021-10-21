/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useState} from 'react'
import { Global, css, jsx } from '@emotion/react'
import { useHistory,Link } from "react-router-dom";
import axios from "axios";

import './registerPage.css'
import logo from "../../image/logo.png"

const Register = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   let history = useHistory();

   const handleSubmit = async (e) => {
     e.preventDefault();
     
    
       const res = await axios.post("http://localhost:5000/userapi/register", {
        registerInfo:{
         username:username,
         email:email,
         password:password,}
       }).then((res) => console.log(res))
         .catch((err) => { if (err.response){
           if(err.response.status==405){
             console.log("Password is too weak, it should contains at least 1 uppercase, 1 lowercase, 1 symbol, and 1 digit")
           } else if (err.response.status == 403){
             Object.keys(err.response.data).map((key) => console.log(err.response.data[key]))
           }
         } console.log(err.response.data)});
      //  history.push("/");

   };
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
                    <i aria-hidden="true" className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="username"
                    name="username"
                    placeholder="Username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Re-type Password"
                    required
                  />
                </div>
                <div className="row clearfix">
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <span>
                        <i aria-hidden="true" className="fa fa-user"></i>
                      </span>
                      <input type="text" name="name" placeholder="First Name" />
                    </div>
                  </div>
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <span>
                        <i aria-hidden="true" className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="input_field radio_option">
                  <input type="radio" name="radiogroup1" id="rd1" />
                  <label for="rd1">Male</label>
                  <input type="radio" name="radiogroup1" id="rd2" />
                  <label for="rd2">Female</label>
                </div>

                <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb1" />
                  <label for="cb1">I agree with terms and conditions</label>
                </div>
                <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb2" />
                  <label for="cb2">I want to receive the newsletter</label>
                </div>
                <input className="button" type="submit" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;