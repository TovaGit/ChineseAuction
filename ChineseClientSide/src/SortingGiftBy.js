import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ImageList from './ImageList';
import GiftDisplay from './GetAllGifts';
const SortingGiftBy = () => {
  const [giftName, setGiftsName] = useState(null);
  const [amountOfBuyers, setAmountOfBuyers] = useState(null);
  const [sortFromLow, setSortFromLow] = useState(false);
  const [sortFromHighToLow, setSortFromHighToLow] = useState(false);

  const SetGiftsName=(e)=>
  {
    setGiftsName(e.target.value)
  }
    const SetAmountOfBuyers=(e)=>
  {
      setAmountOfBuyers (parseInt(e.target.value))
  }
  const SortFromLowToHigh=(e)=>
  {
    setSortFromLow(true)
  }
  const SortFromHighToLow=(e)=>
    {
          setSortFromHighToLow(true)
    }

  return (
    <div >
      <input onChange={SetGiftsName}></input>
      <input onChange={SetAmountOfBuyers} placeholder='amount'></input>
      {giftName && <GiftDisplay giftName={giftName} />} 
      {amountOfBuyers&&<GiftDisplay amountOfBuyers={amountOfBuyers} />} 
<button onClick={SortFromLowToHigh}>sortFromLowToHigh</button>
<button onClick={SortFromHighToLow}>sortFromHighToLow</button>
{sortFromLow && <GiftDisplay sortFromLow={sortFromLow} />} 
{sortFromHighToLow&&<GiftDisplay sortFromHighToLow={sortFromHighToLow} />} 
    </div>
  );
};

export default SortingGiftBy;
