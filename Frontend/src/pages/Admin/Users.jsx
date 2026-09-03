import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message, Table, Skeleton, Select, Tag } from "antd";
import { getAllUsers, updateUserStatus } from "../../services/userService";
import ProtectedRoute from "../../components/ProtectedRoute";

const statusMap = {
  active: { label: "Hoạt động", color: "green" },
  blocked: { label: "Bị khóa", color: "red" },
};

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => getAllUsers({ page: 1, limit: 100 }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateUserStatus(id, status),
    onSuccess: () => {
      messageApi.success("Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error) => {
      messageApi.error(error?.response?.data?.message || "Cập nhật thất bại!");
    },
  });

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color={role === "admin" ? "blue" : "default"}>{role}</Tag>,
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <div>
      {contextHolder}
      <h2 className="mb-4 text-xl font-semibold">Quản lý người dùng</h2>
      {isLoading && <Skeleton active />}
      {isError && <p className="text-red-600">Lỗi tải dữ liệu</p>}
      <Table
        dataSource={data?.users ?? []}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default function AdminUsersPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminUsers />
    </ProtectedRoute>
  );
}
