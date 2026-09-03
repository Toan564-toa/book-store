import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message, Table, Select, Skeleton } from "antd";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";
import { formatVND } from "../../components/format/Format";
import ProtectedRoute from "../../components/ProtectedRoute";

const statusMap = {
  pending: { label: "Chờ xác nhận", color: "orange" },
  confirmed: { label: "Đã xác nhận", color: "blue" },
  shipping: { label: "Đang giao", color: "purple" },
  completed: { label: "Hoàn thành", color: "green" },
  cancelled: { label: "Đã hủy", color: "red" },
};

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: () => getAllOrders({ page: 1, limit: 100 }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => {
      messageApi.success("Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
    },
    onError: (error) => {
      messageApi.error(error?.response?.data?.message || "Cập nhật thất bại!");
    },
  });

  const columns = [
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
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 160 }}
          onChange={(val) => statusMutation.mutate({ id: record._id, status: val })}
          options={Object.entries(statusMap).map(([key, { label }]) => ({ label, value: key }))}
        />
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => formatVND(total),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <div>
      {contextHolder}
      <h2 className="mb-4 text-xl font-semibold">Quản lý đơn hàng</h2>
      {isLoading && <Skeleton active />}
      {isError && <p className="text-red-600">Lỗi tải dữ liệu</p>}
      <Table
        dataSource={data?.orders ?? []}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default function AdminOrdersPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminOrders />
    </ProtectedRoute>
  );
}
