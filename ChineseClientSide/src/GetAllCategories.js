import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import GiftDisplay from './GetAllGifts';
const GetAllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const authorizationHeader = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVHJ1ZSIsIklkIjoiMjQiLCJGdWxsTmFtZSI6IjEiLCJuYmYiOjE3MTgyODE3OTcsImV4cCI6MTcxODI4NTM5NywiaWF0IjoxNzE4MjgxNzk3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcxODQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjcxODQifQ.GX1EUpHlUJPdFp_zDK4ZuE2iLgTyNYfEn5SNzeqQr34'}`;
      axios.defaults.headers.common['Authorization'] = authorizationHeader;
      const response = await axios.get('https://localhost:7184/Category/GetAllCatigories');
      const categoryNames = response.data.map((category) => category.name);
      setAllCategories(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Unable to fetch categories.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {isLoading && <p>Loading categories...</p>}
      {error && <p className="error">{error}</p>}
      {allCategories.length > 0 && (
        <div>
          <h2>Select Category:</h2>
          {allCategories.map((category) => (
            <button key={category} value={category} onClick={() => handleCategoryChange(category)}>
              {category}
            </button>
          ))}
          {selectedCategory && <GiftDisplay category={selectedCategory} />} {/* Render GiftDisplay conditionally */}
        </div>
      )}
      {allCategories.length === 0 && !isLoading && <p>No categories found.</p>}
    </div>
  );
};

export default GetAllCategories;
