import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { login, register } from "../../services/authService";
import { Form, message } from "antd";
import loginImage from "../../assets/Login.jpg";

const Auth = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const nav = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  const loginMutation = useMutation({
    mutationFn: (data) => {
      return isLogin ? login(data) : register(data);
    },
    onSuccess: (data) => {
      if (isLogin) {
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        form.resetFields();
        messageApi.open({
          type: "success",
          content: "Đăng nhập thành công!",
        });
        return nav(`/`);
      }
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Đăng ký thành công!",
      });
      return nav(`/login`);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      if (isLogin) {
        messageApi.open({
          type: "error",
          content: "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Đăng ký thất bại. Email đã tồn tại!",
        });
      }
    },
  });

  const onFinish = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="flex justify-between items-center bg-white">
      {contextHolder}
      <div className="w-1/2 h-screen">
        <img
          src={loginImage}
          className="min-h-screen object-cover"
          alt="login"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-start items-center h-screen">
        <div className="px-20">
          <h1 className="mt-10 w-full text-2xl font-bold">Chào mừng trở lại</h1>
          <p className="mt-4">
            Đăng nhập để tiếp tục truy cập vào BookStore và khám phá những cuốn
            sách tuyệt vời.
          </p>
        </div>
        <div className="px-20 w-full">
          <div className="flex justify-between items-center my-5">
            <Link
              className={`text-center w-full px-0 py-2 border-b-2 ${isLogin ? "border-blue-500" : "border-gray-300"} font-semibold`}
              to="/login"
            >
              Đăng nhập
            </Link>
            <Link
              className={`text-center w-full px-0 py-2 border-b-2 ${!isLogin ? "border-blue-500" : "border-gray-300"} font-semibold`}
              to="/register"
            >
              Đăng ký
            </Link>
          </div>

          <AuthForm
            onFinish={onFinish}
            form={form}
            loading={loginMutation.isPending}
          />

          <div className="flex items-center justify-center my-5">
            <hr className="flex-1" />
            <span className="px-4">Đăng nhập bằng</span>
            <hr className="flex-1" />
          </div>
        </div>
        {/* Đăng nhập bằng Google */}
      </div>
    </div>
  );
};

export default Auth;
