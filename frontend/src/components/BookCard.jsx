import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  const authorName = book.author?.name || 'Unknown Author';
  const catName = book.category?.name || '';
  return (
    <Link to={`/books/${book._id}`} className="card">
      <div className="cover">
        {book.featured && <span className="badge">FEATURED</span>}
        {book.title}
      </div>
      <div className="meta">
        <div className="cat">{catName}</div>
        <div className="auth">{authorName}</div>
      </div>
    </Link>
  );
}
