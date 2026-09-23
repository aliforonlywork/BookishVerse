import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ManageAuthors() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const load = () => api.get('/authors').then((r) => setAuthors(r.data));

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await api.post('/authors', { name });
    setName('');
    load();
  };

  const remove = async (id) => {
    await api.delete(`/authors/${id}`);
    load();
  };

  return (
    <div>
      <form onSubmit={add} className="add-form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New author name" />
        <button className="btn btn-accent">Add</button>
      </form>
      <table className="admin-table">
        <tbody>
          {authors.map((a) => (
            <tr key={a._id}>
              <td>{a.name}</td>
              <td><button onClick={() => remove(a._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
