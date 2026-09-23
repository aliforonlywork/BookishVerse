import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function EditBook() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${id}`).then((r) => setForm(r.data));
  }, [id]);

  if (!form) return <p>Loading…</p>;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/books/${id}`, form);
    navigate('/admin/dashboard');
  };

  return (
    <form className="add-form" onSubmit={submit}>
      <input name="title" value={form.title} onChange={change} />
      <input name="publicationYear" type="number" value={form.publicationYear} onChange={change} />
      <textarea name="description" value={form.description} onChange={change} />
      <textarea name="summary" value={form.summary} onChange={change} />
      <button className="btn btn-accent">Save Changes</button>
    </form>
  );
}
