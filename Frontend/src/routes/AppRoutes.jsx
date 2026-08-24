import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/Books";
import BookDetail from "../pages/BookDetail";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import ClientLayout from "../layouts/ClientLayout";
import Auth from "../pages/Auth";
import Blog from "../pages/Blog";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<ClientLayout />}>
        <Route path="" element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
