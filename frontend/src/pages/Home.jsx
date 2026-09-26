import { useEffect, useState } from 'react';
import api from '../services/api';
import HeroSection from '../components/HeroSection.jsx';
import BookGrid from '../components/BookGrid.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import Loading from '../components/Loading.jsx';
import AdSlot from '../components/AdSlot.jsx';
import SEO from '../components/SEO.jsx';

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [latest, setLatest] = useState(null);
  const [popular, setPopular] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    api.get('/books?featured=true&limit=6').then((r) => setFeatured(r.data.books)).catch(() => setFeatured([]));
    api.get('/books?sort=newest&limit=6').then((r) => setLatest(r.data.books)).catch(() => setLatest([]));
    api.get('/books?sort=popular&limit=6').then((r) => setPopular(r.data.books)).catch(() => setPopular([]));
    api.get('/categories').then((r) => setCategories(r.data)).catch(() => setCategories([]));
  }, []);

  return (
    <main>
      <SEO />
      <HeroSection />
      <section className="block wrap">
        <h2>Featured Books</h2>
        {featured ? <BookGrid books={featured} /> : <Loading />}
      </section>

      <AdSlot size="leaderboard" />

      <section className="block wrap">
        <h2>Browse Categories</h2>
        {categories ? (
          <div className="cat-grid">
            {categories.map((c) => (
              <CategoryCard key={c._id} category={c} />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </section>
      <section className="block wrap">
        <h2>Latest Summaries</h2>
        {latest ? <BookGrid books={latest} /> : <Loading />}
      </section>

      <AdSlot size="leaderboard" />

      <section className="block wrap">
        <h2>Popular Books</h2>
        {popular ? <BookGrid books={popular} /> : <Loading />}
      </section>
    </main>
  );
}