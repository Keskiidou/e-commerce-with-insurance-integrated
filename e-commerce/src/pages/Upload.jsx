// Upload.jsx

import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [id, setId] = useState('');
  const [type, setType] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageFile', image);
    const queryParams = `?id=${id}&type=${type}`;
    try {
      await axios.post(`http://localhost:7000/product/upload${queryParams}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <input type="text" placeholder="ID" value={id} onChange={handleIdChange} required />
        <input type="text" placeholder="Type" value={type} onChange={handleTypeChange} required />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default Upload;
