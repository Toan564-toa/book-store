import { Checkbox, InputNumber, Pagination, Select } from "antd";
import CardBook from "../../components/CardBook";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import useBooks from "../../hooks/useBooks";

const Books = () => {
  
  const {
    booksData,
    categories,
    isBooksError,
    isBooksLoading,
    isCategoriesLoading,
    maxPriceChange,
    minPriceChange,
    onChange,
    sortChange,
    sortData,
    page,
    setPage
  } = useBooks();

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <h2 className="p-5 text-2xl font-bold">Lọc Sách</h2>
        <div className="p-5 flex flex-col gap-2.5">
          <h3 className="text-xl font-bold">Thể loại</h3>
          <Checkbox.Group
            options={(categories?.categories ?? []).map((category) => ({
              label: category.name,
              value: category.id,
            }))}
            className="flex flex-col gap-2.5"
            onChange={onChange}
          />
        </div>
        <div className="p-5 flex flex-col gap-2.5">
          <h3 className="text-xl font-bold">Khoảng giá</h3>
          <div className="flex gap-0.5">
            <InputNumber
              defaultValue="0"
              min="0"
              max="1000000"
              onChange={minPriceChange}
              stringMode
            />
            -
            <InputNumber
              defaultValue="1000000"
              min="0"
              max="1000000"
              onChange={maxPriceChange}
              stringMode
            />
          </div>
        </div>
      </div>

      <div className="flex flex-5 flex-col">
        <div className="flex justify-between items-center p-5">
          <h1 className="text-3xl font-bold">Khám phá Sách mới</h1>
          <Select
            defaultValue="Bộ lọc"
            style={{ width: 120 }}
            onChange={sortChange}
            options={sortData.map((i) => ({
              label: i.name,
              value: i.sort,
            }))}
          />
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-5">
            {isBooksLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCard index={index} key={index} />
                ))
              : booksData?.books?.map((book) => (
                  <CardBook key={book.id} book={book} />
                ))}
            {isBooksError && <h2>Lỗi máy chủ, vui lòng quay lại sau</h2>}
          </div>
          {isBooksLoading ? (
            ""
          ) : (
            <Pagination
              align="center"
              current={page}
              pageSize={booksData?.pagination?.limit}
              total={booksData?.pagination?.total ?? 0}
              showSizeChanger={false}
              onChange={(nextPage) => setPage(nextPage)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
