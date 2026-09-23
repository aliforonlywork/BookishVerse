import { useEffect, useState } from 'react';
import api from '../services/api';
import CategoryCard from '../components/CategoryCard.jsx';
import Loading from '../components/Loading.jsx';

export default function Categories() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    api.get('/categories').then((r) => setCategories(r.data)).catch(() => setCategories([]));
  }, []);

  return (
    <main className="wrap block">
      <h2>All Categories</h2>
      {categories ? (
        <div className="cat-grid">
          {categories.map((c) => (
            <CategoryCard key={c._id} category={c} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
}
