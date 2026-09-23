import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading.jsx';

export default function Articles() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    api.get('/articles').then((r) => setArticles(r.data)).catch(() => setArticles([]));
  }, []);

  return (
    <main className="wrap block">
      <h2>From the Blog</h2>
      {!articles ? (
        <Loading />
      ) : (
        <div className="art-grid">
          {articles.map((a) => (
            <Link to={`/articles/${a._id}`} className="art-card" key={a._id}>
              <div className="tag">{a.category}</div>
              <h3>{a.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
