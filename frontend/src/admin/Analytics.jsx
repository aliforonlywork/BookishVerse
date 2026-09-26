import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get('/analytics').then((r) => setStats(r.data)).catch(() => setError(true));
  }, []);

  if (error) return <p>Couldn't load analytics.</p>;
  if (!stats) return <p>Loading…</p>;

  return (
    <div className="analytics">
      <div className="dash-stats">
        <div>
          <b>{stats.books.total}</b>
          <span>Books ({stats.books.published} published, {stats.books.draft} draft)</span>
        </div>
        <div>
          <b>{stats.articles.total}</b>
          <span>Articles ({stats.articles.published} published, {stats.articles.draft} draft)</span>
        </div>
        <div>
          <b>{stats.totalViews.toLocaleString()}</b>
          <span>Total Views</span>
        </div>
      </div>

      <div className="top-lists">
        <div>
          <h3>Top Books</h3>
          <ol>
            {stats.topBooks.map((b) => (
              <li key={b._id}>
                <Link to={`/books/${b._id}`}>{b.title}</Link> — {b.views.toLocaleString()} views
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3>Top Articles</h3>
          <ol>
            {stats.topArticles.map((a) => (
              <li key={a._id}>
                <Link to={`/articles/${a._id}`}>{a.title}</Link> — {a.views.toLocaleString()} views
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}