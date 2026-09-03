import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { Link } from "react-router-dom";
import { getWishlist, removeWishlistBook } from "../../services/wishlistService";
import { formatVND } from "../../components/format/Format";

const AccountWishlist = () => {
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
    <div>
      {contextHolder}
      <h2 className="mb-4 text-lg font-semibold">Danh sách yêu thích</h2>
      {isError && (
        <p className="mb-4 text-sm text-red-600">
          Lỗi máy chủ, vui lòng quay lại sau!
        </p>
      )}
      {isLoading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : bookIds.length === 0 ? (
        <p className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
          Bạn chưa có sách nào trong danh sách yêu thích.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookIds.map((book) => (
            <div
              key={book._id}
              className="group overflow-hidden rounded-md border border-gray-100 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <Link
                to={`/books/${book._id}`}
                className="block h-[200px] overflow-hidden bg-[#e8e9e2]"
              >
                <img
                  src={book.imageUrl}
                  alt={`Bìa sách ${book.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex min-h-[110px] flex-col px-3 py-3">
                <Link to={`/books/${book._id}`}>
                  <h3 className="line-clamp-2 text-sm font-medium leading-5 text-[#242624] hover:text-[#40583f]">
                    {book.title}
                  </h3>
                </Link>
                <p className="mt-1 text-[10px] text-[#565b54]">{book.author}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span>
                    <span
                      className="text-[10px] font-medium text-[#294b36]"
                      style={{ textDecoration: "line-through" }}
                    >
                      {formatVND(book.price)}
                    </span>
                    <span className="ml-2 text-sm font-medium text-red-600">
                      {formatVND(book.discountPrice)}
                    </span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Xóa ${book.title} khỏi yêu thích`}
                    onClick={() => removeMutation.mutate(book._id)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountWishlist;
