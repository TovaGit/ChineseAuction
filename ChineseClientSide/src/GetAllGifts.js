import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import ImageList from './ImageList';
import HomePage from './HomePage';
const GiftDisplay = (props) => {
  const [allGifts, setAllGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
console.log(props.amountOfBuyers);
    try {
      const authorizationHeader = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVHJ1ZSIsIklkIjoiMjQiLCJGdWxsTmFtZSI6IjEiLCJuYmYiOjE3MTg1MzQyOTcsImV4cCI6MTcxODUzNzg5NywiaWF0IjoxNzE4NTM0Mjk3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcxODQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjcxODQifQ._g44ALVVLhq_l3i7RFUl7NLr4XEP5wepm5DLjNfRupg'}`;
      axios.defaults.headers.common['Authorization'] = authorizationHeader;

        let url;
        if(props.category)
             url = `https://localhost:7184/GetGiftsByCategory/${props.category}`;
        else if(props.giftName!=null)
             url = `https://localhost:7184/GetGiftsByName/${props.giftName}`;
        else if(props.amountOfBuyers!=null)
             url = `https://localhost:7184/GetGiftsByAmountOfBuyers/${props.amountOfBuyers}`;
        else if(props.donorId)
             url = `https://localhost:7184/Donor/GetGiftsById/${props.donorId}`;
        else if(props.sortFromLow)
            url='https://localhost:7184/SortByPriceLowToHigh';
        else if(props.sortFromHighToLow)
            url='https://localhost:7184/SortByPriceHighToLow';
        else 
            url = `https://localhost:7184/Gift`;

      if (url) { 
        const response = await axios.get(url);
        const giftNames = await response.data.map((gift) => gift.name);
        // setAllGifts(new Set(giftNames));
        setAllGifts(response.data)
      }
    } catch (error) {
      console.error('Error fetching gifts:', error);
      setError('An error occurred while fetching gifts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  });

 

  return (
    <div>

      {isLoading && <p>Loading gifts...</p>}
      {error && <p className="error">{error}</p>}
      {allGifts.size > 0 && (
        // <ImageList filterName={Array.from(allGifts)}/>
        <HomePage filterName={allGifts}></HomePage>
      )}
      {allGifts.size === 0 && !isLoading && <p>No gifts found.</p>}
    </div>
  );
};

export default GiftDisplay;
