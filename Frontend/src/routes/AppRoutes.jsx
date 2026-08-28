import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Books from "../pages/Books/Books";
import BookDetail from "../pages/Books/BookDetail";
import About from "../pages/About/About";
import NotFound from "../pages/NotFound";
import ClientLayout from "../layouts/ClientLayout";
import Auth from "../pages/Auth/Auth";
import Blog from "../pages/Blog/Blog";
import Cart from "../pages/Cart/Cart";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<ClientLayout />}>
        <Route path="" element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="cart" element={<Cart />} />
        <Route path="books/search/:search" element={<Books />} />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
