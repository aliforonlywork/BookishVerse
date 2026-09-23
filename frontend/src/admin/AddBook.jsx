import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AddBook() {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({
    title: '', author: '', category: '', description: '', summary: '', publicationYear: 2026, featured: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories').then((r) => setCategories(r.data));
    api.get('/authors').then((r) => setAuthors(r.data));
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/books', { ...form, keyIdeas: [], lessons: [] });
    navigate('/admin/dashboard');
  };

  return (
    <form className="add-form" onSubmit={submit}>
      <input name="title" placeholder="Title" value={form.title} onChange={change} required />
      <select name="author" value={form.author} onChange={change} required>
        <option value="">Select author</option>
        {authors.map((a) => (
          <option key={a._id} value={a._id}>{a.name}</option>
        ))}
      </select>
      <select name="category" value={form.category} onChange={change} required>
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <input name="publicationYear" type="number" value={form.publicationYear} onChange={change} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={change} />
      <textarea name="summary" placeholder="Summary" value={form.summary} onChange={change} />
      <label>
        <input type="checkbox" name="featured" checked={form.featured} onChange={change} /> Featured
      </label>
      <button className="btn btn-accent">Publish Book</button>
    </form>
  );
}
