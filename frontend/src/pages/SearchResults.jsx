import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import BookGrid from '../components/BookGrid.jsx';
import Loading from '../components/Loading.jsx';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [books, setBooks] = useState(null);

  useEffect(() => {
    api.get(`/books?search=${encodeURIComponent(q)}`).then((r) => setBooks(r.data.books)).catch(() => setBooks([]));
  }, [q]);

  return (
    <main className="wrap block">
      <h2>Search results for "{q}"</h2>
      {books ? <BookGrid books={books} /> : <Loading />}
    </main>
  );
}
