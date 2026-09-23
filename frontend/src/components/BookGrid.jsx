import BookCard from './BookCard.jsx';

export default function BookGrid({ books }) {
  if (!books?.length) return <p className="muted">No books found.</p>;
  return (
    <div className="grid-books">
      {books.map((b) => (
        <BookCard key={b._id} book={b} />
      ))}
    </div>
  );
}
