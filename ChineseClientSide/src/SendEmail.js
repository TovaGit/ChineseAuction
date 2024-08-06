import React, { useState } from "react";
import "./login.css"; // Assuming this file contains CSS styles for the form
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Message } from "primereact/message";

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Use a descriptive state name
  const [MessageCode, setMessageCode] = useState(''); // For error messages
  const [successfulSend, setSuccessfulSend] = useState(false); // Indicate successful sending

  //const navigate = useNavigate();
  const generateRandomNumericCode=async(length)=> {
    const randomNum = Math.random() * 10 ** length;
    return randomNum.toFixed(0).padStart(length, '0');
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
  const code =await generateRandomNumericCode(6)
    try {
      if (!email) {
 
        return;
      }
    
     axios.defaults.headers.common["Authorization"] = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVHJ1ZSIsIklkIjoiMjQiLCJGdWxsTmFtZSI6IjEiLCJuYmYiOjE3MTg0ODI0MTEsImV4cCI6MTcxODQ4NjAxMSwiaWF0IjoxNzE4NDgyNDExLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcxODQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjcxODQifQ.RNFwfyrB5mhAa1KqXX_MvKfOzonQwLTvqWglCgfNFnk'}`;
      const response =await axios.post("https://localhost:7184/SendEmail", {
        email:email,
        subject:'LotOff ChineseAuction no replay' , 
        message:`Your verifying code is ${code}`
      });

      if (response.status == 200) {
        setSuccessfulSend(true)
        setMessageCode(code)

     } else {
        console.log("bad")

      }
    } catch (error) {
      console.error(error);
console.log(error)
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={sendEmail}>
        {!email && ( // Conditionally render the error message
          <span id="userName-error"></span>
        )}
        <input
          className="form-field"
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          className="form-field"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Sending...' : 'Send code'} 
        </button>
        {successfulSend && ( // Conditionally render success message
          <p>Email sent successfully!</p>
        )}
      </form>
    </div>
  );
};

export default SendEmail;
