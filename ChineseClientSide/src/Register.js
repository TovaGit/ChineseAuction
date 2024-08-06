import "./Register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import React, { useState } from "react";

export default function App() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    UserName:"",
    Pwd:"",
    Phone:""
  });
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (values.firstName && values.lastName && values.email&&values.Phone&&values.Pwd&&values.UserName) {
      setValid(true);
    }
    setSubmitted(true);
    if((values.firstName && values.lastName && values.email&&values.Phone&&values.Pwd&&values.UserName)!="")
      {
        try {
          const response = await axios.post("https://localhost:7184/Users", {
            userName: values.UserName,
            pwd: values.Pwd,
            firstName:values.firstName,
            lastName:values.lastName,
            phone:values.Phone,
            email:values.email
          });
    
          if (response.status === 200) {
            setSubmitted(true);
            navigate('/login')
          } else {
            console.error("User not found or invalid credentials.");
            alert(
              "משתמש זה אינו רשום במערכת. אנא בדוק את שם המשתמש והסיסמה שלך ונסה שוב." // Hebrew error message for invalid credentials
            );
          }
        } catch (error) {
          console.error(error);
          alert("התחברות נכשלה. אנא נסה שוב מאוחר יותר."); // Generic error message for other issues
        }
        
      }
    
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
       
        {!valid && (
          <input
            class="form-field"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.firstName && (
          <span id="first-name-error">Please enter a first name</span>
        )}

        {!valid && (
          <input
            class="form-field"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.lastName && (
          <span id="last-name-error">Please enter a last name</span>
        )}

        {!valid && (
          <input
            class="form-field"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email && (
          <span id="email-error">Please enter an email address</span>
        )}



          {!valid && (
          <input
            class="form-field"
            type="text"
            placeholder="Phone"
            name="Phone"
            value={values.Phone}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.Phone && (
          <span id="phone-error">Please enter an PhoneNumber</span>
        )}

          {!valid && (
          <input
            class="form-field"
            type="text"
            placeholder="UserName"
            name="UserName"
            value={values.UserName}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.UserName && (
          <span id="username-error">Please enter an UserName</span>
        )}

        {!valid && (
          <input
            class="form-field"
            type="password"
            placeholder="Pwd"
            name="Pwd"
            value={values.Pwd}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.Pwd && (
          <span id="pwd-error">Please enter an password</span>
        )}
        {!valid && (
          <button class="form-field" type="submit">
            Register
          </button>
        )}
      </form>
    </div>
  );
}
