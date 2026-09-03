import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import CardBook from "../../components/CardBook";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import {
  getWishlist,
  removeWishlistBook,
} from "../../services/wishlistService";

const AccountWishlist = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  console.log("data: ", data);

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

  const books = data?.wishlist?.books ?? [];

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
        Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard index={index} key={index} />
        ))
      ) : books.length === 0 ? (
        <p className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
          Bạn chưa có sách nào trong danh sách yêu thích.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-5">
          {data?.wishlist?.books?.map((book) => (
            <CardBook key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountWishlist;
