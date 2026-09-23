import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const onSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="navbar">
      <div className="wrap navinner">
        <Link to="/" className="brand">
          📚 Bookish<span>Verse</span>
        </Link>
        <nav className="navlinks">
          <Link to="/books">Books</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/articles">Articles</Link>
        </nav>
        <form className="searchbox" onSubmit={onSearch}>
          <input placeholder="Search books..." value={q} onChange={(e) => setQ(e.target.value)} />
        </form>
        {admin ? (
          <div className="navright">
            <Link to="/admin/dashboard" className="btn btn-ghost">Dashboard</Link>
            <button className="btn btn-ghost" onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/admin/login" className="btn btn-ghost">Admin</Link>
        )}
      </div>
    </header>
  );
}
