import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Form, Input, message, Table } from "antd";
import { getCategoryAll, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import ProtectedRoute from "../../components/ProtectedRoute";

const AdminCategories = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminCategories"],
    queryFn: () => getCategoryAll(),
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      messageApi.success("Thêm danh mục thành công!");
      setIsModalOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
    },
    onError: (error) => {
      messageApi.error(error?.response?.data?.message || "Thêm thất bại!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => {
      messageApi.success("Cập nhật thành công!");
      setIsModalOpen(false);
      setEditingCategory(null);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
    },
    onError: (error) => {
      messageApi.error(error?.response?.data?.message || "Cập nhật thất bại!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      messageApi.success("Xóa thành công!");
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
    },
    onError: (error) => {
      messageApi.error(error?.response?.data?.message || "Xóa thất bại!");
    },
  });

  const onFinish = (values) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory._id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button size="small" danger onClick={() => deleteMutation.mutate(record._id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="mb-4 flex justify-end">
        <Button type="primary" onClick={() => { setEditingCategory(null); form.resetFields(); setIsModalOpen(true); }}>
          Thêm danh mục
        </Button>
      </div>
      {isLoading && <p className="text-gray-500">Đang tải...</p>}
      {isError && <p className="text-red-600">Lỗi tải dữ liệu</p>}
      <Table
        dataSource={data?.categories ?? []}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingCategory ? "Cập nhật danh mục" : "Thêm danh mục"}
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setEditingCategory(null); }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Tên danh mục" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={createMutation.isPending || updateMutation.isPending}>
              {editingCategory ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default function AdminCategoriesPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminCategories />
    </ProtectedRoute>
  );
}
