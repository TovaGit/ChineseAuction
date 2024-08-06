import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

const ImageList= (props) =>{ // Pass filterName as a prop
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const context = require.context('../public/images', false, /\.(png|jpe?g|svg|gif)$/);
        const imagePaths = context.keys().map(context); 
          const filteredImages = props.filterName.reduce((acc, name) => {
            const matchingImages = imagePaths.filter((imagePath) => imagePath.includes(name));
            return acc.concat(matchingImages);
          }, []);
          setImages(filteredImages);
  
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('An error occurred while fetching images.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [props.filterName]);

  return (
    <div>
      {isLoading && <p>Loading images...</p>}
      {error && <p className="error">{error}</p>}
      {images.length > 0 && (
        <ul>
          {images.map((imagePath, index) => (
            <li key={index}>

              {/* <img src={imagePath} alt={`Image ${index + 1}`} /> */}
            </li>
          ))}
        </ul>
         // <DataView value={images}  listTemplate={listTemplate}/>
// <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />

      )}
      {images.length === 0 && !isLoading && <p>No images found.</p>}
    </div>
  );
}

export default ImageList;
