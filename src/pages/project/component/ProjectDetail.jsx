import { Button, Form, Input, Modal, Radio, Select, message } from "antd";
import { useFetchProject, useFetchUser } from "hooks/useRedux";
import { useEffect } from "react";
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

export default function ProjectDetail({ title, idx, isOpen, close }) {
  const [detailProjectform] = Form.useForm();
  const { projectInfo } = useFetchProject();
  const [messageApi, contextHolder] = message.useMessage();
  const { userData } = useFetchUser();

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: `${projectInfo.name} 수정에 성공하였습니다.`,
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: `${projectInfo.name} 수정에 실패하였습니다.`,
    });
  };

  const onFinish = async (values) => {
    const owner = await userData.find((v) => v.name === values.ownerName);

    const reqBody = {
      id: `${idx}`,
      userId: +owner.id,
      name: values.name,
      description: values.description ?? "",
      status: values.status,
    };
    const res = await request.put(`/projects/${idx}`, reqBody);

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
      const findOwnerName = userData.find((v) => +v.id === projectInfo.userId);

      detailProjectform.setFieldsValue({
        name: projectInfo.name,
        ownerName: findOwnerName.name,
        description: projectInfo.description,
        status: projectInfo.status,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectInfo]);

  return (
    <>
      {contextHolder}
      <Modal title={title} open={isOpen} footer={() => null} onCancel={close}>
        <Form
          name="projectDetail"
          form={detailProjectform}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="name"
            name="name"
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
              Modify
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
