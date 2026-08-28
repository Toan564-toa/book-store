import {
  faCartPlus,
  faHeart,
  faMinus,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Modal, Skeleton } from "antd";
import { formatVND } from "../../components/format/Format";
import useBookDetail from "../../hooks/useBookDetail";

const fakeReviews = [
  {
    name: "Minh Anh",
    date: "2 ngày trước",
    text: "Một cuốn sách tuyệt vời để cân bằng lại cuộc sống. Ngôn từ mộc mạc nhưng sâu sắc.",
  },
  {
    name: "Tuấn Phong",
    date: "1 tuần trước",
    text: "Đọc chậm rãi vào buổi sáng cùng một tách trà hợp nhất. Sách đẹp và nội dung dễ áp dụng.",
  },
];

const BookDetail = () => {
  const {
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
  } = useBookDetail();

  return (
    <main className="text-[#334b3b] sm:px-8 lg:px-12 py-2.5">
      {contextHolder}
      {isError && <h2>Lỗi máy chủ, vui lòng quay lại sau</h2>}
      {isLoading ? (
        <Skeleton active />
      ) : (
        <section className="grid gap-8 border-b border-[#e8e6dc] pb-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <Modal
            title="Bạn muốn đăng nhập?"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            onOk={handleOk}
            okText="Đăng nhập"
            cancelText="Hủy"
            onCancel={handleCancel}
          >
            <p>Vui lòng đăng nhập để thực hiện hành động!</p>
          </Modal>
          <div className="flex min-h-[390px] items-center justify-center rounded-lg bg-white p-3 shadow-sm">
            <Image
              className="h-[360px] w-full rounded object-cover sm:w-[290px]"
              alt={`Bìa sách ${data?.book?.title}`}
              src={data?.book?.imageUrl}
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#859080]">
              {data?.book?.status === "active" ? "Còn hàng" : "Hết hàng"}
            </p>
            <h1 className="text-3xl font-medium leading-tight sm:text-4xl">
              {data?.book?.title}
            </h1>
            <p className="mt-3 text-sm text-[#687166]">{data?.book?.author}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl font-semibold text-[#365a42]">
                {formatVND(data?.book?.discountPrice)}
              </span>
              <span className="text-sm text-[#a6aaa0] line-through">
                {formatVND(data?.book?.price)}
              </span>
              <span className="rounded bg-[#e5eee4] px-2 py-1 text-xs font-medium text-[#416044]">
                -16%
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 rounded-lg bg-[#f1f0e8] p-5 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#8a9186]">
                  Nhà xuất bản
                </p>
                <p className="mt-1 text-[#39433a]">{data?.book?.publisher}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#8a9186]">
                  Tồn kho
                </p>
                <p className="mt-1 text-[#39433a]">{data?.book?.stock} cuốn</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#8a9186]">
                  Đã bán
                </p>
                <p className="mt-1 text-[#39433a]">{data?.book?.sold} cuốn</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex h-11 items-center rounded border border-[#d9ddd2] bg-white">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-full w-10 text-[#526452] hover:bg-[#f1f4ed]"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  onClick={() =>
                    setQuantity(Math.min(data?.book?.stock, quantity + 1))
                  }
                  className="h-full w-10 text-[#526452] hover:bg-[#f1f4ed]"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <button
                type="button"
                className="h-11 flex-1 rounded bg-[#31563d] px-6 text-sm font-medium text-white transition hover:bg-[#24452f] sm:flex-none"
                onClick={handleToCart}
              >
                <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                Thêm vào giỏ
              </button>
              <button
                type="button"
                aria-label="Thêm vào yêu thích"
                onClick={handleFav}
                className={`h-11 w-12 rounded border ${isFavorite ? "border-[#bd6c60] text-[#bd6c60]" : "border-[#d9ddd2] text-[#526452]"} bg-white`}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-10 py-10 lg:grid-cols-[1.6fr_0.85fr]">
        <div>
          <h2 className="text-xl font-medium">Tóm tắt nội dung</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#586158]">
            {data?.book?.description}
          </div>
        </div>

        <aside className="rounded-lg bg-[#f1f0e8] p-6">
          <h2 className="text-lg font-medium">Nhận xét từ độc giả</h2>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-[#31563d]">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  className={
                    star >= Number(data?.book?.averageRating) + 1
                      ? "text-[#c8cec2]"
                      : ""
                  }
                />
              ))}
            </span>
            <span className="font-medium text-[#39433a]">
              {data?.book?.averageRating}
            </span>
            <span className="text-xs text-[#777f75]">
              ({data?.book?.reviewCount} đánh giá)
            </span>
          </div>
          <div className="mt-5 divide-y divide-[#e1e1d7]">
            {fakeReviews.map((review) => (
              <article key={review.name} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between text-xs font-medium text-[#39433a]">
                  <span>{review.name}</span>
                  <span className="font-normal text-[#a1a79d]">
                    {review.date}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#687166]">
                  {review.text}
                </p>
              </article>
            ))}
          </div>
          <button
            type="button"
            className="mt-5 w-full text-xs font-medium text-[#31563d] hover:underline"
          >
            Xem tất cả nhận xét
          </button>
        </aside>
      </section>
    </main>
  );
};

export default BookDetail;
