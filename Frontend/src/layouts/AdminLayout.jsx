import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { key: "/admin", icon: <DashboardOutlined />, label: <Link to="/admin">Dashboard</Link> },
    { key: "/admin/books", icon: <BookOutlined />, label: <Link to="/admin/books">Sách</Link> },
    { key: "/admin/categories", icon: <AppstoreOutlined />, label: <Link to="/admin/categories">Thể loại</Link> },
    { key: "/admin/orders", icon: <ShoppingCartOutlined />, label: <Link to="/admin/orders">Đơn hàng</Link> },
    { key: "/admin/users", icon: <UserOutlined />, label: <Link to="/admin/users">Người dùng</Link> },
  ];

  const selectedKey = menuItems.find((item) =>
    location.pathname.startsWith(item.key),
  )?.key || "/admin";

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <span className="text-lg font-bold text-[#31563d]">
            {collapsed ? "QL" : "Quản trị"}
          </span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          theme="light"
        />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between bg-white px-5 shadow-sm">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Link to="/" className="text-sm text-[#31563d] hover:underline">
            Về trang chủ
          </Link>
        </Header>
        <Content className="m-5">
          <div className="rounded-lg bg-white p-6 shadow-sm min-h-[calc(100vh-140px)]">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
