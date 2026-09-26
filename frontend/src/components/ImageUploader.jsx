import { useState } from 'react';
import api from '../services/api';

export default function ImageUploader({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onChange(data.url);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      <label>{label}</label>
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} disabled={uploading} />
      {uploading && <p>Uploading…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {value && <img src={value} alt="Preview" style={{ maxWidth: 200, marginTop: 8 }} />}
    </div>
  );
}