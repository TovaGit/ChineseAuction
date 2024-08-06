import React, { useState } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom';

const UpdatePwd=()=>
{

      const [submitted, setSubmitted] = useState(false);
      const [valid, setValid] = useState(false);
      const [pwd, setPwd] = useState('');
      const [verifiedPwd, setVerifiedPwd] = useState('');

      const [send, setSended] = useState(false);

      const handlePwdChange = (e) => {
        setPwd(e.target.value);
      };  
      const handleVerifiedPwd = (e) => {
        setVerifiedPwd(e.target.value);
      };  
      const Update = async (e) => {
        e.preventDefault();
    
        if (pwd&&verifiedPwd) {
          setValid(true);
        }
        setSubmitted(true);
        if ((pwd&&verifiedPwd)!="") {
       setSended(true)   
      }
        
      }
      return (
        <div className="form-container">
          <form className="register-form" onSubmit={Update}>
            {!valid && (
              <input
                className="form-field"
                type="text"
                placeholder="New Password"
                name="pwd"
                value={pwd}
                onChange={handlePwdChange}
              />
            )}
            {submitted && !pwd&& (
              <span id="userName-error">Please enter an password </span>
            )} 

            {!valid && (
              <input
                className="form-field"
                type="text"
                placeholder="Verified Password"
                name="verifiedPwd"
                value={verifiedPwd}
                onChange={handleVerifiedPwd}
              />
            )}
            {submitted && !verifiedPwd&& (
              <span id="userName-error">Please verified your password </span>
            )} 
            {!valid &&(
          <button className="form-field" type="submit" >
            Update Password
          </button>
        )}       
          </form>
        </div>
      );
}

export default UpdatePwd;
