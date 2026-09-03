import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button, Modal, Form, Input, InputNumber, Select, message, Table, Tag, Skeleton,
} from "antd";
import {
  getBooks, createBooks, updateBooks, deleteBooks, updateStockBooks,
} from "../../services/bookService";
import { getCategoryAll } from "../../services/categoryService";
import { formatVND } from "../../components/format/Format";
import ProtectedRoute from "../../components/ProtectedRoute";

const statusMap = {
  active: { label: "Còn hàng", color: "green" },
  inactive: { label: "Ngừng kinh doanh", color: "red" },
};

const AdminBooks = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form] = Form.useForm();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminBooks"],
    queryFn: () => getBooks({ page: 1, limit: 100 }),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categoriesAll"],
    queryFn: getCategoryAll,
  });
  const categories = categoriesData?.categories ?? [];

  const createMutation = useMutation({
    mutationFn: createBooks,
    onSuccess: () => {
      messageApi.success("Thêm sách thành công!");
      setIsModalOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["adminBooks"] });
    },
    onError: (error) => {
      messageApi.error(error?.response?.data?.message || "Thêm thất bại!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateBooks(id, data),
    onSuccess: () => {
      messageApi.success("Cập nhật thành công!");
      setIsModalOpen(false);
      setEditingBook(null);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["adminBooks"] });
    },
    onError: (error) => {
      messageApi.error(error?.response?.data?.message || "Cập nhật thất bại!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooks,
    onSuccess: () => {
      messageApi.success("Xóa thành công!");
      queryClient.invalidateQueries({ queryKey: ["adminBooks"] });
    },
    onError: (error) => {
      messageApi.error(error?.response?.data?.message || "Xóa thất bại!");
    },
  });

  const stockMutation = useMutation({
    mutationFn: ({ id, stock }) => updateStockBooks(id, stock),
    onSuccess: () => {
      messageApi.success("Cập nhật tồn kho thành công!");
      queryClient.invalidateQueries({ queryKey: ["adminBooks"] });
    },
    onError: (error) => {
      messageApi.error(error?.response?.data?.message || "Cập nhật thất bại!");
    },
  });

  const onFinish = (values) => {
    if (editingBook) {
      updateMutation.mutate({ id: editingBook._id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleEdit = (record) => {
    setEditingBook(record);
    form.setFieldsValue({
      ...record,
      categoryId: record.categoryId?._id || record.categoryId,
    });
    setIsModalOpen(true);
  };

  const handleStockChange = (id, newStock) => {
    stockMutation.mutate({ id, stock: newStock });
  };

  const columns = [
    { title: "Tên sách", dataIndex: "title", key: "title" },
    { title: "Tác giả", dataIndex: "author", key: "author" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price, record) => (
        <div>
          <span className="text-red-600 font-medium">{formatVND(record.discountPrice || price)}</span>
          <span className="ml-2 text-xs text-gray-400 line-through">{formatVND(price)}</span>
        </div>
      ),
    },
    { title: "Tồn kho", dataIndex: "stock", key: "stock" },
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
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button size="small" danger onClick={() => deleteMutation.mutate(record._id)}>Xóa</Button>
          <InputNumber
            size="small"
            min={0}
            defaultValue={record.stock}
            onChange={(val) => handleStockChange(record._id, val)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="mb-4 flex justify-end">
        <Button type="primary" onClick={() => { setEditingBook(null); form.resetFields(); setIsModalOpen(true); }}>
          Thêm sách
        </Button>
      </div>
      {isLoading && <Skeleton active />}
      {isError && <p className="text-red-600">Lỗi tải dữ liệu</p>}
      <Table
        dataSource={data?.books ?? []}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
      <Modal
        title={editingBook ? "Cập nhật sách" : "Thêm sách"}
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setEditingBook(null); }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Tên sách" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Tác giả" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="publisher" label="Nhà xuất bản">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="discountPrice" label="Giá khuyến mãi">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="stock" label="Tồn kho" rules={[{ required: true }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="imageUrl" label="Ảnh bìa (URL)">
            <Input />
          </Form.Item>
          <Form.Item name="categoryId" label="Thể loại" rules={[{ required: true }]}>
            <Select options={categories.map((c) => ({ label: c.name, value: c._id }))} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" initialValue="active">
            <Select options={[
              { label: "Còn hàng", value: "active" },
              { label: "Ngừng kinh doanh", value: "inactive" },
            ]} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={createMutation.isPending || updateMutation.isPending}>
              {editingBook ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default function AdminBooksPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminBooks />
    </ProtectedRoute>
  );
}
