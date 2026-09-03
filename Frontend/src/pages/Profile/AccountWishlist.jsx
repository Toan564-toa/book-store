import { useQuery } from "@tanstack/react-query";
import CardBook from "../../components/CardBook";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import { getWishlist } from "../../services/wishlistService";

const AccountWishlist = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const books = data?.wishlist?.books ?? [];

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Danh sách yêu thích</h2>
      {isError && (
        <p className="mb-4 text-sm text-red-600">
          Lỗi máy chủ, vui lòng quay lại sau!
        </p>
      )}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} index={index} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <p className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
          Bạn chưa có sách nào trong danh sách yêu thích.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-5">
          {books.map((book) => (
            <CardBook key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountWishlist;
