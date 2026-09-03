import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Input, message, Skeleton } from "antd";
import { getMe, updateMe, changePassword } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const currentUser = data?.user || user;

  const updateMutation = useMutation({
    mutationFn: (values) => updateMe(values),
    onSuccess: (res) => {
      setUser(res.user);
      messageApi.success("Cập nhật thông tin thành công!");
    },
    onError: (error) => {
      messageApi.error(
        error?.response?.data?.message ||
        "Cập nhật thất bại, vui lòng thử lại sau!",
      );
    },
  });

  const passwordMutation = useMutation({
    mutationFn: (values) => changePassword(values),
    onSuccess: () => {
      form.resetFields(["currentPassword", "newPassword"]);
      messageApi.success("Đổi mật khẩu thành công!");
    },
    onError: (error) => {
      messageApi.error(
        error?.response?.data?.message ||
        "Đổi mật khẩu thất bại, vui lòng thử lại sau!",
      );
    },
  });

  const onUpdateProfile = (values) => {
    updateMutation.mutate(values);
  };

  const onChangePassword = (values) => {
    passwordMutation.mutate(values);
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <div>
      {contextHolder}
      <h2 className="mb-4 text-lg font-semibold">Thông tin cá nhân</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onUpdateProfile}
        initialValues={{ name: currentUser?.name, email: currentUser?.email }}
      >
        <Form.Item label="Tên" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Vai trò">
          <Input
            value={currentUser?.role === "admin" ? "Quản trị" : "Người dùng"}
            disabled
          />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="h-11 rounded bg-[#31563d] px-6 text-sm font-medium text-white transition hover:bg-[#24452f] disabled:opacity-50"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </Form.Item>
      </Form>

      <h2 className="mt-8 mb-4 text-lg font-semibold">Đổi mật khẩu</h2>
      <Form layout="vertical" onFinish={onChangePassword}>
        <Form.Item
          label="Mật khẩu hiện tại"
          name="currentPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="h-11 rounded bg-[#31563d] px-6 text-sm font-medium text-white transition hover:bg-[#24452f] disabled:opacity-50"
            disabled={passwordMutation.isPending}
          >
            {passwordMutation.isPending ? "Đang đổi..." : "Đổi mật khẩu"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
