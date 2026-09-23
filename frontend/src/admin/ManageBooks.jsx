import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ManageBooks() {
  const [books, setBooks] = useState(null);
  const load = () => api.get('/books?limit=100').then((r) => setBooks(r.data.books));

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (confirm('Delete this book?')) {
      await api.delete(`/books/${id}`);
      load();
    }
  };

  if (!books) return <p>Loading…</p>;

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Views</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.map((b) => (
          <tr key={b._id}>
            <td>{b.title}</td>
            <td>{b.author?.name}</td>
            <td>{b.views}</td>
            <td>
              <Link to={`/admin/dashboard/edit-book/${b._id}`}>Edit</Link> · <button onClick={() => remove(b._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
