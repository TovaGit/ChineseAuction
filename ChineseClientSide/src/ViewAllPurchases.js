import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetDonorsDetails from './GetDonorsDetails';
function ViewPuchases() {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [giftName, setgiftName] = useState(null);
  const [allPuchasesForCurrentGift, setAllPuchasesForCurrentGift] = useState([]);


  const SetgiftName=(e)=>
    {
        setgiftName(e.target.value)
    }
  const fetchPurchases = async () => {
    setIsLoading(true);
    setError(null);

    let url;
    if(giftName)
        url=`https://localhost:7184/Purchases/PurchasesByGift${giftName}`
    else if(user)
        url='https://localhost:7184/Purchases/DetailsOfBuyers'
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVHJ1ZSIsIklkIjoiMjQiLCJGdWxsTmFtZSI6IjEiLCJuYmYiOjE3MTg0ODg1ODIsImV4cCI6MTcxODQ5MjE4MiwiaWF0IjoxNzE4NDg4NTgyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcxODQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjcxODQifQ.0hhDZO3xCcqBPZg-B1vhrZjixpYtpI1Jo6js8I33kpY'}`;
      const response = await axios.get(url); 
      giftName?setAllPuchasesForCurrentGift(response.data):setUser(response.data)
      console.log("jf")
    } catch (error) {
      console.error('Error fetching details:', error);
      setError('An error occurred while fetching DetailsOfBuyers.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <button onClick={fetchPurchases}>Get Details Of Buyers</button>
      {isLoading && <p>Loading Purchases...</p>}
      {error && <p className="error">{error}</p>}
      {user.length > 0 && (
       <table>
       <thead>
         <tr>
           <th>Id</th>
           <th>Full Name</th>
           <th>Phone Number </th>
           <th>Email Address</th>
         </tr>
       </thead>
       <tbody>
         {user.map((user) => (
           <tr key={user.id}>
             <td>{user.id}</td>
             <td>{user.fullName}</td>
             <td><a></a>{user.phone}</td>
             <td>{user.email}</td>
           </tr>
         ))}
       </tbody>
     </table>
      )}
      {allPuchasesForCurrentGift.length > 0 && (
    <table>
    <thead>
      <tr>
        <th>Purchase Number</th>
        <th>UserId</th>
        <th>GiftId </th>
        <th>Date Of Purchase</th>
        <th>AmountOfTikets</th>

      </tr>
    </thead>
    <tbody>
      {allPuchasesForCurrentGift.map((a) => (
        <tr key={a.purchaseNumber}>
          <td>{a.purchaseNumber}</td>
          <td>{a.userId}</td>
          <td><a></a>{a.giftId}</td>
          <td>{a.date}</td>
          <td>{a.amountOfTickets}</td>
        </tr>
      ))}
    </tbody>
  </table>

   )}

     <input onBlur={SetgiftName} placeholder='enter Gift to see all his purchases'></input>

 
    </div>
  );
}

export default ViewPuchases;
