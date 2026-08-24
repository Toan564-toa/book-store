import React from "react";

const Footer = () => {
  return (
    <div className=" flex flex-wrap justify-center p-4 bg-gray-200 text-gray-700">
      <div className="column-1 w-1/3 p-4 flex flex-col justify-center items-start gap-5">
        <img src="logo.png" alt="Logo" className="w-14 h-14 object-cover" />
        <p className="text-gray-700">
          © 2024 Lumina Books. Tất cả quyền được bảo lưu. Một trải nghiệm đọc
          tinh tế.
        </p>
      </div>
      <div className="column-2 w-1/3 p-4">
        <h3 className="text-lg text-gray-700">Hỗ trợ khách hàng</h3>
        <ul className="list-none p-0">
          <li className="py-2">
            <a href="#" className="text-gray-700 hover:text-gray-600">
              Thông tin vận chuyển
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-gray-700 hover:text-gray-600">
              Chính sách đổi trả
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-gray-700 hover:text-gray-600">
              Điều khoản sử dụng
            </a>
          </li>
        </ul>
      </div>
      <div className="column-3 w-1/3 p-4">
        <h3 className="text-lg text-gray-700">Về chúng tôi</h3>
        <ul className="list-none p-0">
          <li className="py-2">
            <a href="#" className="text-gray-700 hover:text-gray-600">
              Liên hệ
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-gray-700 hover:text-gray-600">
              Hệ thống cửa hàng
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
