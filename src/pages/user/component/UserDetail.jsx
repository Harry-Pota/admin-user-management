import { Button, Form, Input, Modal, message } from "antd";
import { useFetchUser } from "hooks/useRedux";
import { useEffect } from "react";
import { request } from "utils/request";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function UserDetail({ title, idx, isOpen, close }) {
  const [form] = Form.useForm();
  const { userInfo } = useFetchUser();
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: `${userInfo.name} 수정에 성공하였습니다.`,
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: `${userInfo.name} 수정에 실패하였습니다.`,
    });
  };

  const onFinish = async (values) => {
    const reqBody = {
      id: `${idx}`,
      name: values.name,
      email: values.email,
    };
    const res = await request.put(`/users/${idx}`, reqBody);

    if (res.ok) {
      successMessage();
      close();
    } else {
      errorMessage();
    }
  };
  const onFinishFailed = () => errorMessage();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        name: userInfo.name,
        email: userInfo.email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <>
      {contextHolder}
      <Modal title={title} open={isOpen} footer={() => null} onCancel={close}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input user name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-Mail"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 20,
            }}
          >
            <Button type="primary" htmlType="submit">
              Modify
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
