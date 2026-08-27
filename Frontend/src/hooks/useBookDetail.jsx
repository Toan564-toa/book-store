import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../services/bookService";
import { addToCart } from "../stores/cartSlice";

const useBookDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    navigate(`/login`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booksDetail", { id }],
    queryFn: () => getBookById(id),
  });

  console.log("data: ", data)
  console.log("id: ", id)

  const handleToCart = async () => {
    if (!token) {
      setIsModalOpen(true);
      return;
    }

    try {
      await dispatch(addToCart({ bookId: id, quantity })).unwrap();
      messageApi.open({
        type: "success",
        content: "Đã thêm sách vào giỏ hàng!",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error?.message || String(error),
      });
    }
  };

  const handleFav = () => {
    if (!token) {
      setIsModalOpen(true);
    } else {
      setIsFavorite(!isFavorite);
    }
  };
  return {
    contextHolder,
    data,
    dispatch,
    handleCancel,
    handleFav,
    handleOk,
    handleToCart,
    setQuantity,
    isError,
    isFavorite,
    isLoading,
    isModalOpen,
    quantity,
  };
};

export default useBookDetail;
