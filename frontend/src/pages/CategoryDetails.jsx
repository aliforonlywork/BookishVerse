import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import BookGrid from '../components/BookGrid.jsx';
import Loading from '../components/Loading.jsx';

export default function CategoryDetails() {
  const { id } = useParams();
  const [books, setBooks] = useState(null);

  useEffect(() => {
    api.get(`/books?category=${id}`).then((r) => setBooks(r.data.books)).catch(() => setBooks([]));
  }, [id]);

  return (
    <main className="wrap block">
      <h2>Category</h2>
      {books ? <BookGrid books={books} /> : <Loading />}
    </main>
  );
}
