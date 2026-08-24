import React from "react";
import { Link } from "react-router-dom";
import Featuredproducts from "./components/Featuredproducts";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "../../services/bookService";

const Home = () => {

  return (
    <div>
      {/* không thể để chiều cao thường */}
      <div className="banner h-[600px] text-white flex justify-start items-center p-20">
        <div className="w-3/4 flex flex-col gap-5">
          <h3 className="text-6xl">
            Khám phá thế giới sách qua từng trang sách
          </h3>
          <p className="text-2xl">
            Lumina Books mang đến không gian đọc tinh tế, nơi bạn có thể chậm
            lại, thư giãn và đắm chìm trong những câu chuyện vượt thời gian.
          </p>
          <Link className="rounded-md px-4 py-2 w-fit bg-[#4A654F] border-0" to={`/books`}>
            Khám phá bộ sưu tập
          </Link>
        </div>
      </div>

      <Featuredproducts />
    </div>
  );
};

export default Home;
