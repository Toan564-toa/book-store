import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const featuredBooks = [
  { id: "nghe-thuat-song-toi-gian", title: "Nghệ thuật sống tối giản", author: "Fumio Sasaki", price: "150.000 ₫", image: "https://covers.openlibrary.org/b/isbn/9780143131776-L.jpg" },
  { id: "kieu-hanh-va-dinh-kien", title: "Kiêu hãnh và Định kiến", author: "Jane Austen", price: "125.000 ₫", image: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg" },
  { id: "thu-vien-nua-dem", title: "Thư viện nửa đêm", author: "Matt Haig", price: "180.000 ₫", image: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg" },
  { id: "sapiens", title: "Sapiens: Lược sử loài người", author: "Yuval Noah Harari", price: "250.000 ₫", image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg" },
];

const Featuredproducts = () => (
  <section className="bg-[#faf9f2] px-5 py-12 sm:px-8 md:py-16 lg:px-11">
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-5 flex items-end justify-between gap-4 md:mb-7">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-[#1e211d] md:text-[28px]">Sách Nổi Bật</h2>
          <p className="mt-1 text-xs text-[#555b52] md:text-sm">Những tác phẩm được yêu thích nhất trong tuần</p>
        </div>
        <Link to="/books" className="mb-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#40583f] transition-colors hover:text-[#263e2b]">
          Xem tất cả <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredBooks.map((book) => (
          <article key={book.id} className="group overflow-hidden rounded-[3px] bg-white transition-transform duration-200 hover:-translate-y-1">
            <Link to={`/books/${book.id}`} className="block h-[255px] overflow-hidden bg-[#e8e9e2]">
              <img src={book.image} alt={`Bìa sách ${book.title}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </Link>
            <div className="flex min-h-[126px] flex-col px-3 py-3">
              <Link to={`/books/${book.id}`}>
                <h3 className="line-clamp-2 text-[15px] font-medium leading-5 text-[#242624] hover:text-[#40583f]">{book.title}</h3>
              </Link>
              <p className="mt-1 text-[10px] text-[#565b54]">{book.author}</p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="text-[11px] font-medium text-[#294b36]">{book.price}</span>
                <button type="button" aria-label={`Thêm ${book.title} vào giỏ hàng`} className="text-[#2d513a] transition-colors hover:text-[#6a8a5d]">
                  <FontAwesomeIcon icon={faCartPlus} className="text-sm" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Featuredproducts;
