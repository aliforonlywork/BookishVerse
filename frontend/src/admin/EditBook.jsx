import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ImageUploader from '../components/ImageUploader.jsx';

export default function EditBook() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${id}`).then((r) => {
      const book = r.data;
      setForm({
        ...book,
        // author/category arrive as populated objects — convert back to plain
        // IDs so they work in <select> and can be saved without a cast error
        author: book.author?._id || book.author || '',
        category: book.category?._id || book.category || ''
      });
    });
    api.get('/categories').then((r) => setCategories(r.data));
    api.get('/authors').then((r) => setAuthors(r.data));
  }, [id]);

  if (!form) return <p>Loading…</p>;

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/books/${id}`, form);
    navigate('/admin/dashboard');
  };

  return (
    <form className="add-form" onSubmit={submit}>
      <input name="title" value={form.title} onChange={change} required />
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
      <textarea name="description" value={form.description} onChange={change} />
      <textarea name="summary" value={form.summary} onChange={change} />
      <ImageUploader value={form.coverImage} onChange={(url) => setForm({ ...form, coverImage: url })} />
      <label>
        <input type="checkbox" name="featured" checked={!!form.featured} onChange={change} /> Featured
      </label>
      <button className="btn btn-accent">Save Changes</button>
    </form>
  );
}