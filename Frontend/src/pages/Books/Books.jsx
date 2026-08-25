import { useQuery } from "@tanstack/react-query";
import { Checkbox, InputNumber, Pagination, Select } from "antd";
import React, { useState } from "react";
import { getBooks } from "../../services/bookService";
import CardBook from "../../components/CardBook";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import { getCategoryAll } from "../../services/categoryService";
import { formatVND, parseVND } from "../../components/format/Format";

const Books = () => {
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const [page, setPage] = useState(1);
  const [selectedCategoryIds ,setSelectedCategoryIds] = useState("")
  const limit = 8;

  const sort = [
    { name: "Mới nhất", sort: "newest" },
    { name: "Giá tăng dần", sort: "price_asc" },
    { name: "Giá giảm dần", sort: "price_desc" },
    { name: "Bán chạy nhất", sort: "best_selling" },
  ];

  const {
    data: booksData = [],
    isLoading: isBooksLoading,
    isError: isBooksError,
  } = useQuery({
    queryKey: ["books", { page, limit, selectedCategoryIds }],
    queryFn: () => getBooks({ limit: limit, page: page, categoryId: selectedCategoryIds.join(","), }),
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoryAll(),
  });

  console.log("booksData: ", booksData);
  //   {
  //     "page": 1,
  //     "limit": 8,
  //     "total": 17,
  //     "totalPages": 3
  // }

  const onChange = (checkedValues) => {
    // console.log("checked = ", checkedValues);
    setSelectedCategoryIds(checkedValues);
    setPage(1);
  };

  const minPriceChange = (value) => {
    console.log("min: ", value);
  };

  const maxPriceChange = (value) => {
    console.log("max: ", value);
  };

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
            className="flex gap-2.5"
            onChange={onChange}
          />
        </div>
        <div className="p-5 flex flex-col gap-2.5">
          <h3 className="text-xl font-bold">Khoảng giá</h3>
          <div className="flex gap-0.5">
            <InputNumber
              defaultValue="1"
              min="0"
              max="1000000"
              formatter={formatVND}
              onChange={minPriceChange}
              stringMode
            />
            -
            <InputNumber
              defaultValue="1000000"
              min="0"
              max="1000000"
              formatter={formatVND}
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
            onChange={onSecondCityChange}
            options={sort.map((i) => ({
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
