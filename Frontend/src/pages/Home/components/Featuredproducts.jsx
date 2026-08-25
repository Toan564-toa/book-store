import { faArrowRight, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SkeletonCard from "../../../components/skeleton/SkeletonCard";
import CardBook from "../../../components/CardBook";

const Featuredproducts = ({ data, isLoading, isError}) => {

  return (
    <section className="bg-[#faf9f2] px-5 py-12 sm:px-8 md:py-16 lg:px-11">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-5 flex items-end justify-between gap-4 md:mb-7">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-[#1e211d] md:text-[28px]">
              Sách Nổi Bật
            </h2>
            <p className="mt-1 text-xs text-[#555b52] md:text-sm">
              Những tác phẩm được yêu thích nhất trong tuần
            </p>
          </div>
          <Link
            to="/books"
            className="mb-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#40583f] transition-colors hover:text-[#263e2b]"
          >
            Xem tất cả{" "}
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard index={index}/>
              ))
            : data?.books?.map((book) => (
            <CardBook key={book.id} book={book} />
          ))}
          {isError && (
            <h2>Lỗi máy chủ, vui lòng quay lại sau</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Featuredproducts;
