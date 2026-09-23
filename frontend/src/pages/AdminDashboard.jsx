import { Routes, Route, Link } from 'react-router-dom';
import ManageBooks from '../admin/ManageBooks.jsx';
import AddBook from '../admin/AddBook.jsx';
import EditBook from '../admin/EditBook.jsx';
import ManageCategories from '../admin/ManageCategories.jsx';
import ManageAuthors from '../admin/ManageAuthors.jsx';
import ManageArticles from '../admin/ManageArticles.jsx';
import Analytics from '../admin/Analytics.jsx';

export default function AdminDashboard() {
  return (
    <main className="wrap block">
      <h2>Admin Dashboard</h2>
      <nav className="tabs">
        <Link to="">Books</Link>
        <Link to="add-book">Add Book</Link>
        <Link to="categories">Categories</Link>
        <Link to="authors">Authors</Link>
        <Link to="articles">Articles</Link>
        <Link to="analytics">Analytics</Link>
      </nav>
      <Routes>
        <Route index element={<ManageBooks />} />
        <Route path="add-book" element={<AddBook />} />
        <Route path="edit-book/:id" element={<EditBook />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="authors" element={<ManageAuthors />} />
        <Route path="articles" element={<ManageArticles />} />
        <Route path="analytics" element={<Analytics />} />
      </Routes>
    </main>
  );
}
