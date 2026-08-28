import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useBookDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleToCart = () => {
    if (!token) {
      setIsModalOpen(true);
      return;
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
