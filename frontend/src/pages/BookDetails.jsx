import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading.jsx';
import AdSlot from '../components/AdSlot.jsx';
import SEO from '../components/SEO.jsx';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/books/${id}`).then((r) => setBook(r.data)).catch(() => setError(true));
  }, [id]);

  if (error) return <main className="wrap block"><p>Book not found.</p></main>;
  if (!book) return <main className="wrap block"><Loading /></main>;

  const pageUrl = `${import.meta.env.VITE_SITE_URL || window.location.origin}/books/${book._id}`;

  return (
    <main className="wrap block book-details">
       <SEO
    title={book.title}
    description={(book.description || book.summary || '').slice(0, 155)}
    image={book.coverImage}
    url={pageUrl}
  />
      <h1>{book.title}</h1>
      <p className="muted">by {book.author?.name} · {book.publicationYear}</p>
      <p>{book.description}</p>

      <AdSlot size="banner" />

      <h3>Summary</h3>
      <p>{book.summary}</p>
      {book.keyIdeas?.length > 0 && (
        <>
          <h3>Key Ideas</h3>
          <ul>{book.keyIdeas.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
        </>
      )}
      {book.lessons?.length > 0 && (
        <>
          <h3>Lessons</h3>
          <ul>{book.lessons.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
        </>
      )}
      {book.whoShouldRead && (
        <>
          <h3>Who Should Read This</h3>
          <p>{book.whoShouldRead}</p>
        </>
      )}

      {book.affiliateLink && (
        <div className="affiliate-box">
          <a className="cta" href={book.affiliateLink} target="_blank" rel="noopener noreferrer">
            Get the Book →
          </a>
          <p className="affiliate-disclosure">
            As an Amazon Associate, we may earn a commission from qualifying purchases made through this link, at no extra cost to you.
          </p>
        </div>
      )}

      <AdSlot size="rectangle" />
    </main>
  );
}