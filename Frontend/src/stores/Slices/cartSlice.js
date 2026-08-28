import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCart, deleteCartById, getAllCart, updateCartById } from "../../services/cartService";

const initialState = {
  items: [],
  totalPrice: 0,
  quantityBook: 0,
  status: "idle",
  error: null,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ bookId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addCart({ bookId, quantity });
      return response.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể thêm sản phẩm vào giỏ hàng",
      );
    }
  },
);

const createCartThunk = (type, request, fallbackMessage) =>
  createAsyncThunk(type, async (payload, { rejectWithValue }) => {
    try {
      const response = await request(payload);
      return response.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || fallbackMessage);
    }
  });

export const fetchCart = createCartThunk(
    "cart/fetchCart",
    ()=> getAllCart(),
    "Không thể tải giỏ hàng"
)

export const updateCartItem = createCartThunk(
    "cart/updateCartItem",
    ({bookId, quantity})=> updateCartById(bookId, quantity),
    "Không thể cập nhật giỏ hàng"
)

export const removeCartItem = createCartThunk(
    "cart/removeCartItem",
    (bookId)=> deleteCartById(bookId),
    "Không thể xóa sản phẩm khỏi giỏ hàng"
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
        reducers: {
            cleanCartState: (state) => {
                state.items = [];
                state.totalPrice = 0;
                state.quantityBook = 0;
            }
        }
})