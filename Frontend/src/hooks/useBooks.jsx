import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getBooks } from "../services/bookService";
import { getCategoryAll } from "../services/categoryService";
import { useParams } from "react-router-dom";

const useBooks = () => {
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [page, setPage] = useState(1);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const limit = 8;
  const {search} = useParams();

  const sortData = [
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
    queryKey: [
      "books",
      { page, limit, selectedCategoryIds, sort, minPrice, maxPrice, search },
    ],
    queryFn: () =>
      getBooks({
        limit: limit,
        page: page,
        categoryId: selectedCategoryIds.join(","),
        sort: sort,
        minPrice: minPrice,
        maxPrice: maxPrice,
        search: search
      }),
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoryAll(),
  });

  const onChange = (checkedValues) => {
    setSelectedCategoryIds(checkedValues);
    setPage(1);
  };

  const minPriceChange = (value) => {
    setMinPrice(value);
  };

  const sortChange = (value) => {
    setSort(value);
  };

  const maxPriceChange = (value) => {
    setMaxPrice(value);
  };

  return {
    sortData,
    booksData,
    isBooksLoading,
    isBooksError,
    categories,
    isCategoriesLoading,
    page,
    setPage,
    onChange,
    minPriceChange,
    sortChange,
    maxPriceChange,
  };
};

export default useBooks;
