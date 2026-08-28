import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, Skeleton } from "antd";
import { formatVND } from "../../components/format/Format";
import { useCart } from "../../hooks/useCart";

const Cart = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    cart,
    isError,
    isLoading,
    items,
    removeMutation,
    updateMutation,
  } = useCart();

  const handleUpdateQuantity = (bookId, quantity) => {
    if (quantity < 1) return;
    updateMutation.mutate({ bookId, quantity });
  };
  const handleRemove = (bookId) => {
    try {
      removeMutation.mutate(bookId);
      messageApi.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (removeError) {
      messageApi.error(removeError?.message || "Xóa sản phẩm thất bại, vui lòng thử lại sau!");
    }
  };

  if (isLoading && items.length === 0) {
    return <Skeleton active className="p-6" />;
  }

  return (
    <main className="px-5 py-8 text-[#334b3b] sm:px-8 lg:px-12">
      {contextHolder}
      <h1 className="mb-6 text-2xl font-semibold">Giỏ hàng</h1>
      {isError && <p className="mb-4 text-sm text-red-600">Lỗi máy chủ, vui lòng quay lại sau!</p>}
      {items.length === 0 ? (
        <p className="rounded-lg bg-white p-8 text-center text-gray-500">
          Giỏ hàng đang trống.
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="divide-y rounded-lg bg-white px-5 shadow-sm">
            {items.map((item) => (
              <article key={item.bookId} className="flex gap-4 py-5">
                <img
                  src={item.book?.imageUrl}
                  alt={item.book?.title}
                  className="h-28 w-20 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium">{item.book?.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatVND(item.book?.discountPrice || item.book?.price)}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex h-9 items-center rounded border border-gray-200">
                      <button
                        type="button"
                        aria-label="Giảm số lượng"
                        className="h-full w-9 text-gray-600"
                        onClick={() =>
                          handleUpdateQuantity(item.bookId, item.quantity - 1)
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Tăng số lượng"
                        className="h-full w-9 text-gray-600"
                        onClick={() =>
                          handleUpdateQuantity(item.bookId, item.quantity + 1)
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Xóa ${item.book?.title}`}
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleRemove(item.bookId)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
                <strong className="text-right text-sm">
                  {formatVND(item.subtotal)}
                </strong>
              </article>
            ))}
          </section>
          <aside className="h-fit rounded-lg bg-[#f1f0e8] p-6">
            <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>
            <div className="mt-4 flex justify-between border-t border-[#dcdccf] pt-4">
              <span>Tạm tính</span>
              <strong>{formatVND(cart?.total)}</strong>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Cart;
