import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../services/bookService";
import { useCart } from "./useCart";
import { addWishlistBook, removeWishlistBook, getWishlist } from "../services/wishlistService";

const useBookDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addMutation } = useCart();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booksDetail", { id }],
    queryFn: () => getBookById(id),
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: Boolean(token),
  });

  const books = wishlistData?.wishlist?.books ?? [];
  const isFavorite = books.some((book) => String(book._id) === String(id));

  const wishlistMutation = useMutation({
    mutationFn: () =>
      isFavorite
        ? removeWishlistBook(id)
        : addWishlistBook(id),
    onSuccess: () => {
      messageApi.success(
        isFavorite
          ? "Đã xóa khỏi danh sách yêu thích!"
          : "Đã thêm vào danh sách yêu thích!",
      );
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      messageApi.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    },
  });

  const handleOk = () => {
    setIsModalOpen(false);
    navigate(`/login`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleToCart = async () => {
    if (!token) {
      setIsModalOpen(true);
      return;
    }
    await addMutation.mutateAsync({
      bookId: id,
      quantity,
    });
    messageApi.success("Thêm vào giỏ hàng thành công!");
  };

  const handleFav = () => {
    if (!token) {
      setIsModalOpen(true);
      return;
    }
    wishlistMutation.mutate();
  };

  return {
    quantity,
    setQuantity,
    contextHolder,
    isModalOpen,
    isFavorite,
    data,
    isLoading,
    isError,
    handleOk,
    handleCancel,
    handleToCart,
    handleFav,
  };
};

export default useBookDetail;
