import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', category: '', author: '' });
  const load = () => api.get('/articles').then((r) => setArticles(r.data));

  useEffect(() => {
    load();
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const add = async (e) => {
    e.preventDefault();
    await api.post('/articles', form);
    setForm({ title: '', content: '', category: '', author: '' });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/articles/${id}`);
    load();
  };

  return (
    <div>
      <form onSubmit={add} className="add-form">
        <input name="title" placeholder="Title" value={form.title} onChange={change} />
        <input name="category" placeholder="Category" value={form.category} onChange={change} />
        <input name="author" placeholder="Author" value={form.author} onChange={change} />
        <textarea name="content" placeholder="Content" value={form.content} onChange={change} />
        <button className="btn btn-accent">Publish Article</button>
      </form>
      <table className="admin-table">
        <tbody>
          {articles.map((a) => (
            <tr key={a._id}>
              <td>{a.title}</td>
              <td><button onClick={() => remove(a._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
