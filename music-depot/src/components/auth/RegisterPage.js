/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useState} from 'react'
import { Global, css, jsx } from '@emotion/react'
import { useHistory,Link } from "react-router-dom";
import axios from "axios";

import './registerPage.css'
import logo from "../../image/logo.png"
import {BsFillPersonFill} from 'react-icons/bs';
import { IoMdMail} from 'react-icons/io';
import { RiLockPasswordFill} from 'react-icons/ri';

const Register = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [rePassword, setRePassword] = useState("");
   const [email, setEmail] = useState("");

  const [diffPassword, setDiffPassword]= useState(false);
  const [passwordErr, setPasswordErr]= useState(false);
  const [usedErr, setUsedErr]= useState(false);

   let history = useHistory();

   const handleSubmit = async (e) => {
     e.preventDefault();
     if(password!==rePassword || rePassword==""){
       setDiffPassword(true);
       return;
     }
    
       const res = await axios.post("http://localhost:5000/userapi/register", {
        registerInfo:{
         username:username,
         email:email,
         password:password,}
       }).then((res) => console.log(res))
         .catch((err) => { if (err.response){
           if(err.response.status==405){
             console.log("Password is too weak, it should contains at least 1 uppercase, 1 lowercase, 1 symbol, and 1 digit")
             setPasswordErr(true);
           } else if (err.response.status == 403){
             setUsedErr(true);
             Object.keys(err.response.data).map((key) => console.log(err.response.data[key]))
           }
         } console.log(err.response.data)});
      //  history.push("/");
   };

   const diffPassRender=(d)=>{
    return d?(<p>Passwords are not matched.</p>):null
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
                     <BsFillPersonFill className="icon"/>
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
                    <IoMdMail className="icon"/>
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
                    <RiLockPasswordFill className="icon"/>
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
                    <RiLockPasswordFill className="icon"/>
                  </span>
                  <input
                    className={password!==rePassword? "diffPassword":""}
                    type="rePassword"
                    name="rePassword"
                    placeholder="Re-type Password"
                    required
                    onChange={(e) => {
                      setRePassword(e.target.value)
                      if (password !== e.target.value){
                        setDiffPassword(true);
                        console.log(password, e.target.value)
                      }else{
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
                        <BsFillPersonFill className="icon"/>

                      </span>
                      <input type="text" name="name" placeholder="First Name" />
                    </div>
                  </div>
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <span>
                        <BsFillPersonFill className="icon"/>
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