import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ImageList from './ImageList';
import GiftDisplay from './GetAllGifts';
const GetDonorsDetails = (props) => {
  const [allGifts, setAllGifts] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  

  

  return (
    <div >
      {props.donorId&&<GiftDisplay donorId={props.donorId}/>}
    </div>
  );
};

export default GetDonorsDetails;
