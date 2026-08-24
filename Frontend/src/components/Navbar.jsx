import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { Form, Menu, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export default function Navbar() {
  const nav = [
    { link: "/", page: "Trang chủ" },
    { link: "/books", page: "Sách mới" },
    { link: "/about", page: "Về chúng tôi" },
    { link: "/blog", page: "Blog" },
  ];

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const items = [
    {
      key: "menu",
      icon: <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: 20 }} />,
      popupClassName: "user-menu-popup",
      children: [
        { key: "1", label: "Thông tin tài khoản" },
        { key: "2", label: "Đăng xuất" },
      ],
    },
  ];

  const logoutMutaion = useMutation({
    mutationKey: "logout",
    mutationFn: () => logout(),
    onSuccess: () => {
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
    console.log("click", e);
    if (e.key === "2") {
      // debugger;
      logoutMutaion.mutate();
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 px-5 shadow-sm">
      {contextHolder}
      <div className="flex items-center gap-6">
        <img src="logo.png" className="h-12 w-12 object-cover" alt="logo" />
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
        <div className="rounded-lg border px-3 py-1.5">
          <input
            type="text"
            className="w-36 border-0 text-sm outline-none focus:outline-none focus:ring-0"
            name="search"
            id=""
            placeholder="Tìm kiếm..."
          />
          <FontAwesomeIcon
            className="text-gray-500 cursor-pointer"
            icon={faMagnifyingGlass}
          />
        </div>
        <div className="flex items-center gap-3 border-l py-1 pl-4">
          <FontAwesomeIcon className="text-xl" icon={faCartShopping} />
          {/* <FontAwesomeIcon className='text-xl' icon={faCircleUser} /> */}
          <Menu
            className="user-menu"
            onClick={onClick}
            selectable={false}
            mode="vertical"
            expandIcon={null}
            items={items}
          />
        </div>
      </div>
    </header>
  );
}
