import SearchBar from './SearchBar.jsx';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="wrap">
        <h1>
          Explore Books.
          <br />
          <em>Discover Ideas.</em>
        </h1>
        <p>Clear, honest summaries and key ideas from the world's most useful books.</p>
        <SearchBar />
      </div>
    </section>
  );
}
