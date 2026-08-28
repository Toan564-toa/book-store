import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllCart,
  addCart,
  updateCartById,
  deleteCartById,
} from "../services/cartService";

export const useCart = () => {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: getAllCart,
    enabled: Boolean(localStorage.getItem("token")),
  });

  const addMutation = useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ bookId, quantity }) => updateCartById(bookId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: deleteCartById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const cart = cartQuery.data?.cart;
  const items = cart?.items ?? [];

  const quantityBook = new Set(
    items.map((item) => String(item.bookId?._id ?? item.bookId)),
  ).size;

  return {
    cart,
    items,
    quantityBook,
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,
    addMutation,
    updateMutation,
    removeMutation,
  };
};