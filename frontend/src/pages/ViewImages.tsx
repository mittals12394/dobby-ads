// src/pages/ViewImages.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewImages: React.FC = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/image/get-user-images', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setImages(response.data.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Your Images</h1>
      <div>
        {images.map((image: any) => (
          <div key={image._id}>
            <img src={`http://localhost:3000/${image.image}`} alt={image.name} />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewImages;
