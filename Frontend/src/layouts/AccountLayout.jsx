import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AccountLayout = () => {
  const { user } = useAuth();

  const menuItems = [
    { to: "/profile", label: "Thông tin tài khoản" },
    { to: "/profile/orders", label: "Đơn hàng của tôi" },
    { to: "/profile/wishlist", label: "Danh sách yêu thích" },
  ];

  return (
    <main className="px-5 py-8 text-[#334b3b] sm:px-8 lg:px-12">
      <h1 className="mb-6 text-2xl font-semibold">Tài khoản của tôi</h1>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-4 border-b border-gray-100 pb-4">
            <p className="text-sm font-medium text-[#334b3b]">{user?.name}</p>
            <p className="mt-1 text-xs text-gray-500">{user?.email}</p>
          </div>
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/profile"}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-[#f1f0e8] font-medium text-[#31563d]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#31563d]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default AccountLayout;
