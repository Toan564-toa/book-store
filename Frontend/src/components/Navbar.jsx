import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { faGauge } from "@fortawesome/free-solid-svg-icons/faGauge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Menu, message } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { logout } from "../services/authService";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const nav = [
    { link: "/", page: "Trang chủ" },
    { link: "/books", page: "Sách mới" },
    { link: "/about", page: "Về chúng tôi" },
    { link: "/blog", page: "Blog" },
  ];

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { quantityBook } = useCart();
  const { isAdmin, user, logout: authLogout } = useAuth();

  const items = [
    {
      key: "menu",
      icon: <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: 20 }} />,
      popupClassName: "user-menu-popup",
      children: [
        { key: "1", label: "Thông tin tài khoản" },
        { key: "2", label: "Đơn hàng của tôi" },
        { key: "3", label: "Danh sách yêu thích" },
        { key: "4", label: "Đăng xuất" },
      ],
    },
  ];

  const logoutMutaion = useMutation({
    mutationKey: "logout",
    mutationFn: () => logout(),
    onSuccess: () => {
      authLogout();
      messageApi.open({
        type: "success",
        content: "Đăng xuất thành công!",
      });
      navigate(`/login`);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Đăng xuất thất bại, vui lòng thử lại sau!",
      });
    },
  });

  const onClick = (e) => {
    if (e.key === "1") {
      navigate("/profile");
    } else if (e.key === "2") {
      navigate("/profile/orders");
    } else if (e.key === "3") {
      navigate("/profile/wishlist");
    } else if (e.key === "4") {
      logoutMutaion.mutate();
    }
  };

  const onSearch = (value) => {
    const search = value.search?.trim();
    if (search) {
      navigate(`/books/search/${search}`);
    } else {
      navigate(`/books`);
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 px-5 shadow-sm">
      {contextHolder}
      <div className="flex items-center gap-6">
        <img src={logo} className="h-12 w-12 object-cover" alt="logo" />
        <nav className="flex items-center gap-1">
          {nav.map(({ link, page }) => (
            <NavLink
              key={link}
              to={link}
              end={link === "/"}
              className={({ isActive }) =>
                `border-b-2 px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "border-black font-medium text-black"
                    : "border-transparent text-gray-600 hover:border-gray-400 hover:text-black"
                }`
              }
            >
              {page}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Form
          onFinish={onSearch}
          className="flex items-center justify-center"
          autoComplete="off"
        >
          <Form.Item name="search" className="!mb-0">
            <Input placeholder="Tìm kiếm ..." />
          </Form.Item>
        </Form>
        <div className="flex items-center gap-3 border-l py-1 pl-4">
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#31563d] text-white"
                    : "bg-[#e5eee4] text-[#31563d] hover:bg-[#cfd9c8]"
                }`
              }
              aria-label="Trang quản trị"
            >
              <FontAwesomeIcon icon={faGauge} />
              <span>Quản trị</span>
            </NavLink>
          )}
          <Link to="/cart" className="relative" aria-label="Giỏ hàng">
            <FontAwesomeIcon className="text-xl" icon={faCartShopping} />
            {quantityBook > 0 && (
              <span className="absolute -right-3 -top-3 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
                {quantityBook}
              </span>
            )}
          </Link>
          {user ? (
            <Menu
              className="user-menu"
              onClick={onClick}
              selectable={false}
              mode="vertical"
              expandIcon={null}
              items={items}
            />
          ) : (
            <div className="flex gap-1">
              <Link
                to={`/register`}
                className="px-2 py-1 bg-black text-white rounded-sm hover:bg-gray-500 transition"
              >
                Đăng ký
              </Link>
              <Link
                to={`/login`}
                className="px-2 py-1 bg-black text-white rounded-sm hover:bg-gray-500 transition"
              >
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
