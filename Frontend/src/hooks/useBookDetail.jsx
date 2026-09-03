import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../services/bookService";
import { useCart } from "./useCart";

const useBookDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const {addMutation} = useCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booksDetail", { id }],
    queryFn: () => getBookById(id),
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
    messageApi.open({
        type:"success",
        content: "Thêm vào giỏ hàng thành công!"
    })
  };

  const handleFav = () => {
    if (!token) {
      setIsModalOpen(true);
    } else {
      setIsFavorite(!isFavorite);
    }
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
