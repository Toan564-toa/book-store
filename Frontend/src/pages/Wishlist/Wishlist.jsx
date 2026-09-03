import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { Link } from "react-router-dom";
import { getWishlist, removeWishlistBook } from "../../services/wishlistService";
import { formatVND } from "../../components/format/Format";
import ProtectedRoute from "../../components/ProtectedRoute";

const Wishlist = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const removeMutation = useMutation({
    mutationFn: removeWishlistBook,
    onSuccess: () => {
      messageApi.success("Đã xóa khỏi danh sách yêu thích!");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      messageApi.error("Xóa thất bại, vui lòng thử lại sau!");
    },
  });

  const bookIds = data?.wishlist?.bookIds ?? [];

  return (
    <main className="px-5 py-8 text-[#334b3b] sm:px-8 lg:px-12">
      {contextHolder}
      <h1 className="mb-6 text-2xl font-semibold">Danh sách yêu thích</h1>
      {isError && (
        <p className="mb-4 text-sm text-red-600">Lỗi máy chủ, vui lòng quay lại sau!</p>
      )}
      {isLoading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : bookIds.length === 0 ? (
        <p className="rounded-lg bg-white p-8 text-center text-gray-500">
          Bạn chưa có sách nào trong danh sách yêu thích.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bookIds.map((book) => (
            <div
              key={book._id}
              className="group overflow-hidden rounded-[3px] bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <Link
                to={`/books/${book._id}`}
                className="block h-[255px] overflow-hidden bg-[#e8e9e2]"
              >
                <img
                  src={book.imageUrl}
                  alt={`Bìa sách ${book.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex min-h-[126px] flex-col px-3 py-3">
                <Link to={`/books/${book._id}`}>
                  <h3 className="line-clamp-2 text-[15px] font-medium leading-5 text-[#242624] hover:text-[#40583f]">
                    {book.title}
                  </h3>
                </Link>
                <p className="mt-1 text-[10px] text-[#565b54]">{book.author}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span>
                    <span
                      className="text-[11px] font-medium text-[#294b36]"
                      style={{ textDecoration: "line-through" }}
                    >
                      {formatVND(book.price)}
                    </span>
                    <span className="text-[20px] font-medium text-red-600 ml-2.5">
                      {formatVND(book.discountPrice)}
                    </span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Xóa ${book.title} khỏi yêu thích`}
                    onClick={() => removeMutation.mutate(book._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  );
}
