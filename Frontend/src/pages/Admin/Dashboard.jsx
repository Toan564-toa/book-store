import { useQuery } from "@tanstack/react-query";
import { Row, Col, Statistic, Card, Table, Tag } from "antd";
import { getAllUsersNoPage } from "../../services/userService";
import { getAllOrdersNoPage } from "../../services/orderService";
import { getAllBooks } from "../../services/bookService";
import { formatVND } from "../../components/format/Format";

const statusMap = {
  pending: { label: "Chờ xác nhận", color: "orange" },
  confirmed: { label: "Đã xác nhận", color: "blue" },
  shipping: { label: "Đang giao", color: "purple" },
  completed: { label: "Hoàn thành", color: "green" },
  cancelled: { label: "Đã hủy", color: "red" },
};

const Dashboard = () => {
  const { data: usersData } = useQuery({ queryKey: ["usersAll"], queryFn: getAllUsersNoPage });
  const { data: booksData } = useQuery({ queryKey: ["booksAll"], queryFn: getAllBooks });
  const { data: ordersData } = useQuery({ queryKey: ["ordersAll"], queryFn: getAllOrdersNoPage });

  const users = usersData?.users ?? [];
  const books = booksData?.books ?? [];
  const orders = ordersData?.orders ?? [];

  const totalUsers = users.length;
  const totalBooks = books.length;
  const totalOrders = orders.length;
  const revenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);

  const lowStockBooks = books.filter((b) => b.stock <= 5);
  const latestOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const orderColumns = [
    { title: "Mã đơn", dataIndex: "_id", key: "_id" },
    {
      title: "Người mua",
      dataIndex: "userId",
      key: "userId",
      render: (user) => user?.name || "-",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const s = statusMap[status] || { label: status, color: "default" };
        return <Tag color={s.color}>{s.label}</Tag>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => formatVND(total),
    },
  ];

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Tổng quan</h2>
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic title="Người dùng" value={totalUsers} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Sách" value={totalBooks} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Đơn hàng" value={totalOrders} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Doanh thu" value={revenue} precision={0} prefix="₫" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Đơn hàng mới nhất">
            <Table
              dataSource={latestOrders}
              columns={orderColumns}
              rowKey="_id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Sắp hết hàng">
            {lowStockBooks.length === 0 ? (
              <p className="text-gray-500">Không có sách nào sắp hết hàng.</p>
            ) : (
              <Table
                dataSource={lowStockBooks}
                columns={[
                  { title: "Tên sách", dataIndex: "title", key: "title" },
                  { title: "Tồn kho", dataIndex: "stock", key: "stock" },
                ]}
                rowKey="_id"
                pagination={false}
                size="small"
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
