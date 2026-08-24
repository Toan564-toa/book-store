import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const AuthForm = ({ onFinish, form, loading }) => {
  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      className="w-full"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {location.pathname === "/register" && (
        <Form.Item
          label="Tên người dùng"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên người dùng!" },
            { min: 3, message: "Tên người dùng phải có ít nhất 3 ký tự!" },
            { max: 100, message: "Tên người dùng không được quá 100 ký tự!" },
          ]}
        >
          <Input />
        </Form.Item>
      )}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email!" },
          {
            type: "email",
            message: "Vui lòng nhập đúng định dạng email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={
          location.pathname === "/login" ? (
            //không để được w-full
            <div className="flex w-lg items-center justify-between">
              <span>Mật khẩu</span>
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>
          ) : (
            <span>Mật khẩu</span>
          )
        }
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password />
      </Form.Item>

      {location.pathname === "/register" && (
        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!"),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      )}

      <Form.Item label={null}>
        <Button loading={loading} type="primary" htmlType="submit" className={`w-full`}>
          {location.pathname === "/login" ? "Đăng nhập" : "Đăng ký"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
