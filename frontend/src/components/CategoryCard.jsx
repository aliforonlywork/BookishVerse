import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/categories/${category._id}`} className="cat-card">
      <b>{category.name}</b>
      {category.description && <span>{category.description}</span>}
    </Link>
  );
}
