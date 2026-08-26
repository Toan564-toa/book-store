import {
  faCartPlus,
  faHeart,
  faMinus,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { formatVND } from "../../components/format/Format";

const fakeBook = {
  title: "Nghệ thuật sống tối giản",
  author: "Phạm Hoàng Ngân",
  price: 220000,
  discountPrice: 185000,
  imageUrl:
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85",
  pages: "256 trang",
  publisher: "NXB Trẻ",
  size: "14 x 20.5 cm",
  cover: "Bìa mềm",
  rating: 4.8,
  reviewCount: 124,
  description: [
    "Nghệ thuật sống tối giản không chỉ là việc vứt bỏ đồ đạc, mà là quá trình thanh lọc tâm trí, tập trung vào những điều thực sự mang lại ý nghĩa và hạnh phúc trong cuộc sống hiện đại.",
    "Cuốn sách đưa ra những góc nhìn sâu sắc và bài thực hành cụ thể giúp người đọc dần buông bỏ những áp lực vô hình, sắp xếp lại không gian sống và tìm lại sự bình yên nội tại.",
  ],
};

const fakeReviews = [
  { name: "Minh Anh", date: "2 ngày trước", text: "Một cuốn sách tuyệt vời để cân bằng lại cuộc sống. Ngôn từ mộc mạc nhưng sâu sắc." },
  { name: "Tuấn Phong", date: "1 tuần trước", text: "Đọc chậm rãi vào buổi sáng cùng một tách trà hợp nhất. Sách đẹp và nội dung dễ áp dụng." },
];

const BookDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <main className="bg-[#fbfaf4] px-5 py-8 text-[#334b3b] sm:px-8 lg:px-12">
      <section className="grid gap-8 border-b border-[#e8e6dc] pb-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
        <div className="flex min-h-[390px] items-center justify-center rounded-lg bg-white p-3 shadow-sm">
          <img
            src={fakeBook.imageUrl}
            alt={`Bìa sách ${fakeBook.title}`}
            className="h-[360px] w-full rounded object-cover sm:w-[290px]"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#859080]">Sách mới</p>
          <h1 className="text-3xl font-medium leading-tight sm:text-4xl">{fakeBook.title}</h1>
          <p className="mt-3 text-sm text-[#687166]">{fakeBook.author}</p>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-2xl font-semibold text-[#365a42]">{formatVND(fakeBook.discountPrice)}</span>
            <span className="text-sm text-[#a6aaa0] line-through">{formatVND(fakeBook.price)}</span>
            <span className="rounded bg-[#e5eee4] px-2 py-1 text-xs font-medium text-[#416044]">-16%</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 rounded-lg bg-[#f1f0e8] p-5 text-sm">
            <div><p className="text-[10px] uppercase tracking-wider text-[#8a9186]">Số trang</p><p className="mt-1 text-[#39433a]">{fakeBook.pages}</p></div>
            <div><p className="text-[10px] uppercase tracking-wider text-[#8a9186]">Nhà xuất bản</p><p className="mt-1 text-[#39433a]">{fakeBook.publisher}</p></div>
            <div><p className="text-[10px] uppercase tracking-wider text-[#8a9186]">Kích thước</p><p className="mt-1 text-[#39433a]">{fakeBook.size}</p></div>
            <div><p className="text-[10px] uppercase tracking-wider text-[#8a9186]">Hình thức</p><p className="mt-1 text-[#39433a]">{fakeBook.cover}</p></div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex h-11 items-center rounded border border-[#d9ddd2] bg-white">
              <button type="button" aria-label="Giảm số lượng" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-full w-10 text-[#526452] hover:bg-[#f1f4ed]"><FontAwesomeIcon icon={faMinus} /></button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button type="button" aria-label="Tăng số lượng" onClick={() => setQuantity(quantity + 1)} className="h-full w-10 text-[#526452] hover:bg-[#f1f4ed]"><FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <button type="button" className="h-11 flex-1 rounded bg-[#31563d] px-6 text-sm font-medium text-white transition hover:bg-[#24452f] sm:flex-none"><FontAwesomeIcon icon={faCartPlus} className="mr-2" />Thêm vào giỏ</button>
            <button type="button" aria-label="Thêm vào yêu thích" onClick={() => setIsFavorite(!isFavorite)} className={`h-11 w-12 rounded border ${isFavorite ? "border-[#bd6c60] text-[#bd6c60]" : "border-[#d9ddd2] text-[#526452]"} bg-white`}><FontAwesomeIcon icon={faHeart} /></button>
          </div>
        </div>
      </section>

      <section className="grid gap-10 py-10 lg:grid-cols-[1.6fr_0.85fr]">
        <div>
          <h2 className="text-xl font-medium">Tóm tắt nội dung</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#586158]">
            {fakeBook.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <aside className="rounded-lg bg-[#f1f0e8] p-6">
          <h2 className="text-lg font-medium">Nhận xét từ độc giả</h2>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-[#31563d]">{[1, 2, 3, 4, 5].map((star) => <FontAwesomeIcon key={star} icon={faStar} className={star === 5 ? "text-[#c8cec2]" : ""} />)}</span>
            <span className="font-medium text-[#39433a]">{fakeBook.rating}</span>
            <span className="text-xs text-[#777f75]">({fakeBook.reviewCount} đánh giá)</span>
          </div>
          <div className="mt-5 divide-y divide-[#e1e1d7]">
            {fakeReviews.map((review) => (
              <article key={review.name} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between text-xs font-medium text-[#39433a]"><span>{review.name}</span><span className="font-normal text-[#a1a79d]">{review.date}</span></div>
                <p className="mt-2 text-xs leading-5 text-[#687166]">{review.text}</p>
              </article>
            ))}
          </div>
          <button type="button" className="mt-5 w-full text-xs font-medium text-[#31563d] hover:underline">Xem tất cả nhận xét</button>
        </aside>
      </section>
    </main>
  );
};

export default BookDetail