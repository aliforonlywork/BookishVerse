import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const load = () => api.get('/categories').then((r) => setCategories(r.data));

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await api.post('/categories', { name });
    setName('');
    load();
  };

  const remove = async (id) => {
    await api.delete(`/categories/${id}`);
    load();
  };

  return (
    <div>
      <form onSubmit={add} className="add-form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" />
        <button className="btn btn-accent">Add</button>
      </form>
      <table className="admin-table">
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td><button onClick={() => remove(c._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
