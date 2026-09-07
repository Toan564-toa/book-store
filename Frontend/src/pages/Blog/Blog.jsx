import { Button, Form, Input, message } from "antd";

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? "").trim());
}

const Blog = () => {
  const onFinish = ({ email }) => {
    message.success(`Email hợp lệ: ${email}`);
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-xl font-semibold">Đăng ký nhận tin</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            {
              validator: (_, value) =>
                !value || isValidEmail(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Vui lòng nhập đúng định dạng email!")),
            },
          ]}
        >
          <Input placeholder="ban@example.com" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Blog;
