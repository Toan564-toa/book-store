import { Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/orderService";
import { formatVND } from "../../components/format/Format";
import { useCart } from "../../hooks/useCart";

const Checkout = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { items, clearCart } = useCart();

  const orderMutation = useMutation({
    mutationFn: (data) => createOrder(data),
    onSuccess: () => {
      messageApi.success("Đặt hàng thành công!");
      clearCart();
      navigate("/orders");
    },
    onError: (error) => {
      messageApi.error(
        error?.response?.data?.message ||
        "Đặt hàng thất bại, vui lòng thử lại sau!",
      );
    },
  });

  const onFinish = (values) => {
    if (!items.length) {
      messageApi.warning("Giỏ hàng trống!");
      return;
    }
    orderMutation.mutate(values);
  };

  const total = items.reduce(
    (sum, item) => sum + (item.subtotal || 0),
    0,
  );

  if (items.length === 0) {
    return (
      <main className="px-5 py-8 text-[#334b3b] sm:px-8 lg:px-12">
        <h1 className="mb-6 text-2xl font-semibold">Thanh toán</h1>
        <p className="rounded-lg bg-white p-8 text-center text-gray-500">
          Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.
        </p>
      </main>
    );
  }

  return (
    <main className="px-5 py-8 text-[#334b3b] sm:px-8 lg:px-12">
      {contextHolder}
      <h1 className="mb-6 text-2xl font-semibold">Thanh toán</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Thông tin giao hàng</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="mt-4"
          >
            <Form.Item
              label="Địa chỉ giao hàng"
              name="shippingAddress"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ giao hàng!" },
              ]}
            >
              <Input placeholder="Nhập địa chỉ giao hàng" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item label="Ghi chú" name="note">
              <Input.TextArea rows={3} placeholder="Ghi chú thêm (tùy chọn)" />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                loading={orderMutation.isPending}
                className="h-11 rounded bg-[#31563d] px-6 text-sm font-medium text-white transition hover:bg-[#24452f]"
              >
                Đặt hàng
              </button>
            </Form.Item>
          </Form>
        </section>

        <aside className="h-fit rounded-lg bg-[#f1f0e8] p-6">
          <h2 className="text-lg font-semibold">Đơn hàng</h2>
          <div className="mt-4 divide-y divide-[#dcdccf]">
            {items.map((item) => (
              <div key={item.bookId} className="flex justify-between py-3 text-sm">
                <span className="flex-1 truncate pr-2">{item.book?.title}</span>
                <span>x{item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-[#dcdccf] pt-4">
            <span>Tổng cộng</span>
            <strong>{formatVND(total)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
