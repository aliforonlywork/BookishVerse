import { useEffect, useState } from 'react';
import api from '../services/api';
import BookGrid from '../components/BookGrid.jsx';
import Loading from '../components/Loading.jsx';

export default function Books() {
  const [books, setBooks] = useState(null);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    api.get(`/books?sort=${sort}&limit=40`).then((r) => setBooks(r.data.books)).catch(() => setBooks([]));
  }, [sort]);

  return (
    <main className="wrap block">
      <div className="toolbar">
        <h2>All Books</h2>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="popular">Most Viewed</option>
          <option value="az">A–Z</option>
        </select>
      </div>
      {books ? <BookGrid books={books} /> : <Loading />}
    </main>
  );
}
