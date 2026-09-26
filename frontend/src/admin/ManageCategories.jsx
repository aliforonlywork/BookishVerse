import { useEffect, useState } from 'react';
import api from '../services/api';
import ImageUploader from '../components/ImageUploader.jsx';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const load = () => api.get('/categories').then((r) => setCategories(r.data));

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await api.post('/categories', { name, image });
    setName('');
    setImage('');
    load();
  };

  const remove = async (id) => {
    setError('');
    try {
      await api.delete(`/categories/${id}`);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <form onSubmit={add} className="add-form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" />
        <ImageUploader value={image} onChange={setImage} label="Category Image" />
        <button className="btn btn-accent">Add</button>
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <table className="admin-table">
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td>{c.image && <img src={c.image} alt="" style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'cover' }} />}</td>
              <td>{c.name}</td>
              <td><button onClick={() => remove(c._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}