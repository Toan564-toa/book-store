import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../services/orderService";
import { formatVND } from "../../components/format/Format";

const statusMap = {
  pending: { label: "Chờ xác nhận", color: "text-yellow-700 bg-yellow-50" },
  confirmed: { label: "Đã xác nhận", color: "text-blue-700 bg-blue-50" },
  shipping: { label: "Đang giao", color: "text-purple-700 bg-purple-50" },
  completed: { label: "Hoàn thành", color: "text-green-700 bg-green-50" },
  cancelled: { label: "Đã hủy", color: "text-red-700 bg-red-50" },
};

const AccountOrders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myOrders"],
    queryFn: () => getMyOrders({ page: 1, limit: 10 }),
  });

  const orders = data?.orders ?? [];

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Đơn hàng của tôi</h2>
      {isError && (
        <p className="mb-4 text-sm text-red-600">
          Lỗi máy chủ, vui lòng quay lại sau!
        </p>
      )}
      {isLoading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : orders.length === 0 ? (
        <p className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
          Bạn chưa có đơn hàng nào.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="block rounded-lg border border-gray-100 p-4 transition hover:border-[#31563d] hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    Mã đơn: {order._id}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <span
                  className={`rounded px-3 py-1 text-xs font-medium ${
                    statusMap[order.status]?.color || "text-gray-600 bg-gray-50"
                  }`}
                >
                  {statusMap[order.status]?.label || order.status}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {order.items?.length ?? 0} sản phẩm
                </span>
                <span className="font-semibold">{formatVND(order.total)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountOrders;
