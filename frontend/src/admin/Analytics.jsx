import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([api.get('/books?limit=200'), api.get('/articles')]).then(([b, a]) => {
      const totalViews = b.data.books.reduce((s, x) => s + x.views, 0) + a.data.reduce((s, x) => s + x.views, 0);
      setStats({ books: b.data.total, articles: a.data.length, totalViews });
    });
  }, []);

  if (!stats) return <p>Loading…</p>;

  return (
    <div className="dash-stats">
      <div><b>{stats.books}</b><span>Books</span></div>
      <div><b>{stats.articles}</b><span>Articles</span></div>
      <div><b>{stats.totalViews.toLocaleString()}</b><span>Total Views</span></div>
    </div>
  );
}
