import React, { useState } from "react";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import './MainPage.css';
import { Card } from 'primereact/card';


const MainPage = () => {
  return (
    <>
    <div className="main-page-container">
        <Image
          src="images/logo.png"
          alt="Image"
          height="60"
          className="logo"
        />
        {/* <DataView value={products} listTemplate={listTemplate} /> */}

        {/* Rest of your page content */}
      </div>
    
    </>
  );
};

export default MainPage;