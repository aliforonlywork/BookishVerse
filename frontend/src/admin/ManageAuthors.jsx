import { useEffect, useState } from 'react';
import api from '../services/api';
import ImageUploader from '../components/ImageUploader.jsx';

export default function ManageAuthors() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const load = () => api.get('/authors').then((r) => setAuthors(r.data));

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await api.post('/authors', { name, image });
    setName('');
    setImage('');
    load();
  };

  const remove = async (id) => {
    setError('');
    try {
      await api.delete(`/authors/${id}`);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <form onSubmit={add} className="add-form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New author name" />
        <ImageUploader value={image} onChange={setImage} label="Author Photo" />
        <button className="btn btn-accent">Add</button>
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <table className="admin-table">
        <tbody>
          {authors.map((a) => (
            <tr key={a._id}>
              <td>{a.image && <img src={a.image} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />}</td>
              <td>{a.name}</td>
              <td><button onClick={() => remove(a._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}