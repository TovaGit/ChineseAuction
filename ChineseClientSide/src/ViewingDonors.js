import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetDonorsDetails from './GetDonorsDetails';
function DonorList() {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donorId, setDonorId] = useState(null);

  const SetDonorId=(id)=>
    {
      setDonorId(id)
    }
  const fetchDonors = async () => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVHJ1ZSIsIklkIjoiMjQiLCJGdWxsTmFtZSI6IjEiLCJuYmYiOjE3MTg1MzQyOTcsImV4cCI6MTcxODUzNzg5NywiaWF0IjoxNzE4NTM0Mjk3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcxODQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjcxODQifQ._g44ALVVLhq_l3i7RFUl7NLr4XEP5wepm5DLjNfRupg'}`;
      const response = await axios.get('https://localhost:7184/Donor'); 
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
      setError('An error occurred while fetching donors.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <button onClick={fetchDonors}>bb</button>
      {isLoading && <p>Loading donors...</p>}
      {error && <p className="error">{error}</p>}
      {donors.length > 0 && (
       <table>
       <thead>
         <tr>
           <th>Donor ID</th>
           <th>Full Name</th>
           <th>Phone Number </th>
           <th>Email Address</th>
         </tr>
       </thead>
       <tbody>
         {donors.map((donor) => (
           <tr key={donor.donorId}>
             <td>{donor.donorId}</td>
             <td><button onClick={()=>SetDonorId(donor.donorId)} >{donor.fullName}</button></td>
             <td><a></a>{donor.phone}</td>
             <td>{donor.email}</td>
           </tr>
         ))}
       </tbody>
     </table>

      )}
     {donorId && <GetDonorsDetails donorId={donorId}/>} {/* Render GiftDisplay conditionally */}

    </div>
  );
}

export default DonorList;
