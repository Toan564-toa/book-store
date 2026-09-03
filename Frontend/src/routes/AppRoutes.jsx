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
import Checkout from "../pages/Checkout/Checkout";
import OrderDetail from "../pages/Orders/OrderDetail";
import AccountLayout from "../layouts/AccountLayout";
import Profile from "../pages/Profile/Profile";
import AccountOrders from "../pages/Profile/AccountOrders";
import AccountWishlist from "../pages/Profile/AccountWishlist";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import AdminBooks from "../pages/Admin/Books";
import AdminCategories from "../pages/Admin/Categories";
import AdminOrders from "../pages/Admin/Orders";
import AdminUsers from "../pages/Admin/Users";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<ClientLayout />}>
        <Route path="" element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="books/search/:search" element={<Books />} />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route
          path="orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Profile />} />
          <Route path="orders" element={<AccountOrders />} />
          <Route path="wishlist" element={<AccountWishlist />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<Dashboard />} />
        <Route path="books" element={<AdminBooks />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
}
