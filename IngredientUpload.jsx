
import React, { useState } from 'react';
import axios from 'axios';

export default function IngredientUpload({ onDetect }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('file', image);
    setLoading(true);
    try {
      const res = await axios.post('https://your-backend-url.onrender.com/detect-ingredients', formData);
      onDetect(res.data.ingredients);
    } catch (error) {
      console.error('Detection failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl">
      <h2 className="text-xl font-semibold mb-2">Upload Food Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
      {preview && <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded mb-2" />}
      <button onClick={handleUpload} className="bg-green-600 text-white px-4 py-2 rounded">
        {loading ? 'Detecting...' : 'Detect Ingredients'}
      </button>
    </div>
  );
}
