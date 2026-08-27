import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addCart,
    deleteCartById,
    getAllCart,
    updateCartById,
} from "../services/cartService";

const initialState = {
    items: [],
    total: 0,
    version: 0,
    status: "idle",
    error: null,
};

// {
//   "cart": {
//     "_id": "6a904e38905a84384889e8de",
//     "userId": "6a90321d905a84384889e8da",
//     "items": [
//       {
//         "bookId": "6a8e5924697c02345a274c85",
//         "quantity": 1,
//         "book": {
//           "_id": "6a8e5924697c02345a274c85",
//           "title": "Learning SQL",
//           "description": "A hands-on introduction to SQL queries, database design and relational data.",
//           "author": "Alan Beaulieu",
//           "publisher": "O'Reilly Media",
//           "isbn": "9781492057611",
//           "price": 640000,
//           "discountPrice": 579000,
//           "stock": 16,
//           "sold": 24,
//           "imageUrl": "https://covers.openlibrary.org/b/isbn/9781492057611-L.jpg",
//           "sourceUrl": "https://openlibrary.org/isbn/9781492057611",
//           "categoryId": "6a8e5924697c02345a274c7b",
//           "status": "active",
//           "createdAt": "2026-08-26T03:10:28.675Z",
//           "updatedAt": "2026-08-26T03:10:28.675Z",
//           "__v": 0,
//           "id": "6a8e5924697c02345a274c85"
//         },
//         "subtotal": 579000
//       },
//     ],
//     "createdAt": "2026-08-27T14:48:24.134Z",
//     "updatedAt": "2026-08-27T15:17:46.144Z",
//     "__v": 1,
//     "id": "6a904e38905a84384889e8de",
//     "total": 1667000
//   }
// }

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ bookId, quantity }, { rejectWithValue }) => {
        try {
            const response = await addCart({ bookId, quantity });
            return response.cart;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Không thể thêm sách vào giỏ hàng",
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
            return rejectWithValue(
                error.response?.data?.message || fallbackMessage,
            );
        }
    });

export const fetchCart = createCartThunk(
    "cart/fetchCart",
    () => getAllCart(),
    "Không thể tải giỏ hàng",
);

export const updateCartItem = createCartThunk(
    "cart/updateCartItem",
    ({ bookId, quantity }) => updateCartById(bookId, quantity),
    "Không thể cập nhật giỏ hàng",
);

export const removeCartItem = createCartThunk(
    "cart/removeCartItem",
    (bookId) => deleteCartById(bookId),
    "Không thể xóa sản phẩm khỏi giỏ hàng",
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCartState: (state) => {
            state.items = [];
            state.total = 0;
            state.version = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.version = action.payload.__v ?? 0;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Không thể thêm sách vào giỏ hàng";
            })
            .addMatcher(
                (action) =>
                    [fetchCart.pending.type, updateCartItem.pending.type, removeCartItem.pending.type].includes(action.type),
                (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addMatcher(
                (action) =>
                    [fetchCart.fulfilled.type, updateCartItem.fulfilled.type, removeCartItem.fulfilled.type].includes(action.type),
                (state, action) => {
                    state.status = "succeeded";
                    state.items = action.payload.items;
                    state.total = action.payload.total;
                    state.version = action.payload.__v ?? 0;
                }
            )
            .addMatcher(
                (action) =>
                    [fetchCart.rejected.type, updateCartItem.rejected.type, removeCartItem.rejected.type].includes(action.type),
                (state, action) => {
                    state.status = "failed";
                    state.error = action.payload || "Không thể cập nhật giỏ hàng";
                }
            );
    },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;