import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderService";
import { formatVND } from "../../components/format/Format";
import { Skeleton } from "antd";
import ProtectedRoute from "../../components/ProtectedRoute";

const statusMap = {
  pending: { label: "Chờ xác nhận", color: "text-yellow-700 bg-yellow-50" },
  confirmed: { label: "Đã xác nhận", color: "text-blue-700 bg-blue-50" },
  shipping: { label: "Đang giao", color: "text-purple-700 bg-purple-50" },
  completed: { label: "Hoàn thành", color: "text-green-700 bg-green-50" },
  cancelled: { label: "Đã hủy", color: "text-red-700 bg-red-50" },
};

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: Boolean(id),
  });

  const order = data?.order;

  return (
    <main className="px-5 py-8 text-[#334b3b] sm:px-8 lg:px-12">
      <h1 className="mb-6 text-2xl font-semibold">Chi tiết đơn hàng</h1>
      {isLoading && <Skeleton active />}
      {isError && (
        <p className="text-sm text-red-600">Lỗi máy chủ, vui lòng quay lại sau!</p>
      )}
      {order && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <p className="text-sm text-gray-500">Mã đơn hàng</p>
                <p className="font-medium">{order._id}</p>
              </div>
              <span
                className={`rounded px-3 py-1 text-sm font-medium ${
                  statusMap[order.status]?.color || "text-gray-600 bg-gray-50"
                }`}
              >
                {statusMap[order.status]?.label || order.status}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Ngày đặt</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Địa chỉ giao hàng</p>
              <p className="font-medium">{order.shippingAddress}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="font-medium">{order.phone}</p>
            </div>
            {order.note && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Ghi chú</p>
                <p className="font-medium">{order.note}</p>
              </div>
            )}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Sản phẩm</h3>
              <div className="mt-4 divide-y divide-gray-100">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {formatVND(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">
                      {formatVND(item.subtotal)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <aside className="h-fit rounded-lg bg-[#f1f0e8] p-6">
            <h2 className="text-lg font-semibold">Tóm tắt</h2>
            <div className="mt-4 flex justify-between border-t border-[#dcdccf] pt-4">
              <span>Tổng cộng</span>
              <strong>{formatVND(order.total)}</strong>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

export default function OrderDetailPage() {
  return (
    <ProtectedRoute>
      <OrderDetail />
    </ProtectedRoute>
  );
}
