import { Button, Form, Input, Modal, message } from "antd";
import { useSelector } from "react-redux";
import { request } from "utils/request";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function CreateModal({ title, isOpen, close }) {
  const [createUserform] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = ({ name }) => {
    messageApi.open({
      type: "success",
      content: `${name} 저장에 성공하였습니다.`,
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "저장에 실패하였습니다.",
    });
  };

  const latestIdx = useSelector((state) => state.latestUserIdx);
  const onFinish = async (values) => {
    const reqBody = {
      id: `${Number(latestIdx) + 1}`,
      name: values.name,
      email: values.email,
    };
    const res = await request.post("/users", reqBody);

    if (res.ok) {
      successMessage(values);
      createUserform.resetFields();
      close();
    } else {
      errorMessage();
    }
  };
  const onFinishFailed = () => errorMessage();

  return (
    <>
      {contextHolder}
      <Modal title={title} open={isOpen} footer={() => null} onCancel={close}>
        <Form
          name="create user"
          form={createUserform}
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
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
