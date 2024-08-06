import "./login.css";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';
import { Messages } from 'primereact/messages';
import { Password } from 'primereact/password';

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
const { jwtDecode } = require('jwt-decode');



const Login = () => {
  const [visible, setVisible] = useState(false);
  const [visibleRegister, setVisibleRegister] = useState(false);
  const [visibleVerify, setVisibleVerify] = useState(false);
  const [changePwd, SetChangePwd] = useState(false);
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [register, SetRegister] = useState(false);
  const [MessageCode, setMessageCode] = useState(''); 
  const [successfulSend, setSuccessfulSend] = useState(false); 
  const [userId, setUserId] = useState(''); 
  const [verifyCode, setVerifyCode] = useState(false); 
  const [matchcode, setMatchCode] = useState(false); 

  const UpdatePwd=async()=>
    {
      try {
        const response = await axios.put(`https://localhost:7184/Users/Update/${userId}`, {
          userName: userName,
          pwd:pwd,
        });

        if (response.status === 200) {
          alert("updated")
         setVisibleVerify(false)  
         setVisible(true)
        } else {
          alert("invalid credentials.")
        }
      } catch (error) {
        console.error(error);
        alert("Erro connecting try later"); 
      }
    }
  const CheckVerifyingCode=(e)=>
    {
      if(verifyCode===MessageCode){
      setMatchCode(true);
      setVisible(false)}
      else{
        alert("Inncurrect Code Try Again")
      }
    }
  const sendEmail = async (e) => {
    const generateRandomNumericCode=async(length)=> {
      const randomNum = Math.random() * 10 ** length;
      return randomNum.toFixed(0).padStart(length, '0');
    }
     const code =await generateRandomNumericCode(6)
    try {
        const res =await axios.get(`https://localhost:7184/GetUserIdByEmail/${email}`);
        if(res.status===200){
          setUserId(res.data)
         const response =await axios.post("https://localhost:7184/SendEmail", {
        email:email,
        subject:'A-Lot-Of ChineseAuction no replay' , 
        message:`Your verifying code is ${code}`
      });

      if (response.status == 200) {
        setSuccessfulSend(true)
        setMessageCode(code)
     } else {
        console.log("bad")
      }
    } else
    alert("this email is not found please register")

  }
     catch (error) {
      console.error(error);
         console.log(error)
    }
    };
  const handleSubmit = async (e) => {
    if(register&&(userName&&pwd&&firstName&&lastName&&email&&phone))
      {
        try {
          const response = await axios.post("https://localhost:7184/Users", {
            userName: userName,
            pwd:pwd,
            firstName:firstName,
            lastName: lastName,
            email: email,
            phone: phone
          });
  
          if (response.status === 200) {
              setVisibleRegister(false)
              SetRegister(false)
          } else {
            alert("invalid credentials.")
          }
        } catch (error) {
          console.error(error);
          alert("Erro connecting try later"); 
        }
      }
    else if (userName&&pwd&&!register) {
      try {
        const response = await axios.post("https://localhost:7184/api/Login", {
          userName: userName,
          pwd:pwd,
        });

        if (response.status === 200) {
          let token=response.data.token
            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
             const decodedToken = jwtDecode(token);
             const isManager = decodedToken.role === "True";
             setVisible(false)
        } else {
          console.error("User not found or invalid credentials.");
          alert("User not found or invalid credentials.")
        }
      } catch (error) {
        console.error(error);
        alert("Erro connecting try later"); 
      }}
    }
    
 
  return (
 <div className="card flex justify-content-center" >
            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog  className="black-background"visible={visible} style={{ width: '20vw'}} onHide={() => {if (!visible) return; setVisible(false); }}>
            <div style={{color:'#009CD6',fontSize:'30px',display: 'grid', placeItems: 'center' ,fontWeight:"bold"}}>Login</div>

                <p className="m-0">    
                <FloatLabel>
                    <InputText id="username" onChange={(e) => setUserName(e.target.value)} />
                    <label htmlFor="username">Username</label>
                </FloatLabel>
                <br></br>
                <FloatLabel>
                <Password  onChange={(e) => setPwd(e.target.value)} feedback={false} tabIndex={1} />
                    <label htmlFor="Password">Password</label>
                </FloatLabel>
                </p>
                <Button label="Continue" style={{backgroundColor:'#F94561',width:'248px',border:'#F94561'}}onClick={handleSubmit}/>
                      <div style={{color:'#3FBC5F'}}>Not a member yet?</div>
                      <a style={{ textDecoration: 'underline' ,color:'#3FBC5F'}} onClick={()=>{SetRegister(true);setVisibleRegister(true)}}>Creat Your acount here</a>
                      <br></br>
                <a style={{ textDecoration: 'underline' ,color:'#3FBC5F'}} onClick={()=>{SetChangePwd(true);setVisibleVerify(true)}}>Forgot Password?UserName</a>

            </Dialog>
             {/*//////// {register dialog} ////// */}
            {register&&<div>
              <Dialog  visible={visibleRegister} style={{ width: '38vw' ,backgroundColor:'#009CD6'}} onHide={() => {if (!visibleRegister) return; setVisibleRegister(false); }}>
              <div style={{ color: '#009CD6', fontSize: '28px', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
        Register
      </div>
      <br></br>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ marginRight: 10, width: 'calc(50% - 5px)' }}> {/* Left side inputs */}
          <FloatLabel>
            <InputText id="firstName" onChange={(e) => setFirstName(e.target.value)} />
            <label htmlFor="firstName">First Name</label>
          </FloatLabel>
          <br />
          <FloatLabel>
            <InputText id="lastName" onChange={(e) => setLastName(e.target.value)} />
            <label htmlFor="lastName">Last Name</label>
          </FloatLabel>
          <br />
          <FloatLabel>
            <InputText id="email" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email">Email</label>
          </FloatLabel>
        </div>
        <div style={{ width: 'calc(50% - 5px)' }}> {/* Right side inputs */}
          <FloatLabel>
            <InputText id="phone" onChange={(e) => setPhone(e.target.value)} />
            <label htmlFor="phone">Phone</label>
          </FloatLabel>
          <br />
          <FloatLabel>
            <InputText id="username" onChange={(e) => setUserName(e.target.value)} />
            <label htmlFor="username">Username</label>
          </FloatLabel>
          <br />
          <FloatLabel>
            <Password onChange={(e) => setPwd(e.target.value)} feedback={false} tabIndex={1} />
            <label htmlFor="Password">Password</label>
          </FloatLabel>
        </div>
      </div>
      <Button
        label="Sign Up"
        style={{ width: '97%', backgroundColor: '#F94561', color: 'white', border: 'none', marginTop: 10 }}
        onClick={handleSubmit}/>                     
            </Dialog>
            </div>}
            {/*/////////////// {send code}/////////// */}
            {changePwd&& <div>
            <Dialog  visible={visibleVerify} style={{ width: '25vw' ,backgroundColor:'black'}} onHide={() => {if (!visibleVerify) return; setVisibleVerify(false); }}>
            <div style={{color:'#009CD6',fontSize:'30px',display: 'grid', placeItems: 'center' ,fontWeight:"bold"}}>Send Verifying Code...</div>
                <p className="m-0">    
                <FloatLabel>
                    <InputText id="email"  onChange={(e) => setEmail(e.target.value)} style={{  width: '320px' }}/>
                    <label htmlFor="emailAdress">EmailAdress</label>
                </FloatLabel>
                </p>
                <Button label="Send Code" style={{backgroundColor:'#F94561',width:'320px',border:'#F94561'}} onClick={sendEmail}/>
                <br></br>
                {successfulSend&&<><br></br>
                <InputOtp length={6} onBlur={(e)=>{setVerifyCode(e.target.value)}} style={{ display: 'grid', gridAutoFlow: 'column',width:'320px'}}/>
                <br></br>
                <Button label="Verify Code" style={{backgroundColor:'#3FBC5F',width:'320px',border:'#F94561'}} onClick={CheckVerifyingCode}/></>}
                <br></br>
                <br></br>
                {matchcode&&<>
                  <FloatLabel>
                    <InputText id="NewUserName"  onChange={(e) => setUserName(e.target.value)} style={{  width: '320px' }}/>
                    <label htmlFor="NewUserName">NewUserName</label>
                </FloatLabel>
                <br></br>
                <FloatLabel>
                <Password onChange={(e) => setPwd(e.target.value)} feedback={false} tabIndex={1} style={{  width: '320px' }} />
                <label htmlFor="New Password">New Password</label>
                </FloatLabel>
                <br></br>
                <Button label="Update Pwd" style={{backgroundColor:'#E89D3D',width:'320px',border:'#F94561'}} onClick={UpdatePwd}/>
                </>}
            </Dialog>
              </div>}
        </div>)
}
export default Login;
