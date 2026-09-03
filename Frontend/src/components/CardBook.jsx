import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../context/AuthContext";
import { formatVND } from "./format/Format";
import { addCart } from "../services/cartService";

const CardBook = ({ book }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      message.warning("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
      return;
    }
    try {
      await addCart({ bookId: book.id, quantity: 1 });
      message.success("Đã thêm vào giỏ hàng!");
    } catch {
      message.error("Thêm vào giỏ hàng thất bại!");
    }
  };

  return (
    <article
      key={book.id}
      className="group overflow-hidden rounded-[3px] bg-white transition-transform duration-200 hover:-translate-y-1"
    >
      <Link
        to={`/books/${book.id}`}
        className="block h-[255px] overflow-hidden bg-[#e8e9e2]"
      >
        <img
          src={book.imageUrl}
          alt={`Bìa sách ${book.title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex min-h-[126px] flex-col px-3 py-3">
        <Link to={`/books/${book.id}`}>
          <h3 className="line-clamp-2 text-[15px] font-medium leading-5 text-[#242624] hover:text-[#40583f]">
            {book.title}
          </h3>
        </Link>
        <p className="mt-1 text-[10px] text-[#565b54]">{book.author}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span>
            <span
              className="text-[11px] font-medium text-[#294b36]"
              style={{ textDecoration: "line-through" }}
            >
              {formatVND(book.price)}
            </span>
            <span className="text-[20px] font-medium text-red-600 ml-2.5">
              {formatVND(book.discountPrice)}
            </span>
          </span>
          <button
            type="button"
            aria-label={`Thêm ${book.title} vào giỏ hàng`}
            onClick={handleAddToCart}
            className="text-[#2d513a] transition-colors hover:text-[#6a8a5d]"
          >
            <FontAwesomeIcon icon={faCartPlus} className="text-sm" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardBook;
