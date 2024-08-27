import { Button, Form, Input, Modal, Radio, Select, message } from "antd";
import { useFetchUser } from "hooks/useRedux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { common } from "utils/common";
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
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { userData, getUserList } = useFetchUser();

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

  const latestIdx = useSelector((state) => state.latestProjectIdx);
  const onFinish = async (values) => {
    const owner = await userData.find((v) => v.name === values.ownerName);

    const reqBody = {
      id: `${Number(latestIdx) + 1}`,
      owner: +owner.id,
      ownerName: values.ownerName,
      projectName: values.projectName,
      description: values.description ?? "",
      status: values.status,
    };

    const res = await request.post("/projects", reqBody);

    if (res.ok) {
      successMessage(values);
      form.resetFields();
      close();
    } else {
      errorMessage();
    }
  };
  const onFinishFailed = () => errorMessage();

  useEffect(() => {
    if (isOpen) {
      getUserList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            label="projectName"
            name="projectName"
            rules={[
              {
                required: true,
                message: "Please input project name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ownerName"
            name="ownerName"
            rules={[
              {
                required: true,
                message: "Please input project owner name!",
              },
            ]}
          >
            <Select>
              {userData.map((v) => (
                <Select.Option key={v.id} value={v.name}>
                  {v.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="status" name="status">
            <Radio.Group>
              {common.projectStatus.map((v) => (
                <Radio key={v} value={v}>
                  {v}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
            wrapperCol={{
              ...layout.wrapperCol,
            }}
            rules={[
              {
                required: false,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea />
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
