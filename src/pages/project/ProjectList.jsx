import { Button, Flex, Space, Table, Tag } from "antd";
import { useFetchProject, useFetchUser } from "hooks/useRedux";
import { useEffect, useState } from "react";
import { request } from "utils/request";
import ProjectDetail from "./component/ProjectDetail";

export default function ProjectList() {
  const { getUserList } = useFetchUser();
  const { projectData, getProjectList } = useFetchProject();
  const [projectIdx, setProjectIdx] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDetailOpen = async (id) => {
    setProjectIdx(id);
    setIsDetailOpen(true);
  };

  const handleDetailClose = async () => {
    setIsDetailOpen(false);
    getProjectList();
  };

  const deleteProject = async ({ id, name }) => {
    const isConfirm = window.confirm(`${name} 프로젝트를 삭제하시겠습니까?`);

    if (isConfirm) {
      const res = await request.delete(`/projects/${+id}`);

      if (res.ok) {
        getProjectList();
      }
    }
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Completed",
          value: "Completed",
        },
        {
          text: "Inactive",
          value: "Inactive",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      render: (_, { status }) => {
        const tagColor =
          status === "Active"
            ? "processing"
            : status === "Inactive"
            ? "default"
            : status === "Completed"
            ? "success"
            : null;

        return (
          <Space size="middle">
            <Flex gap="small">
              <Tag color={tagColor}>{status}</Tag>
            </Flex>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: `actions`,
      render: (_, record) => {
        return (
          <Space size="middle">
            <Flex gap="small">
              <Button
                type="primary"
                onClick={() => handleDetailOpen(record.id)}
              >
                Detail
              </Button>
              <Button danger onClick={() => deleteProject(record)}>
                Delete
              </Button>
            </Flex>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProjectList(projectIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectIdx]);

  return (
    <>
      <Table
        rowKey={(row) => row.id}
        columns={columns}
        dataSource={projectData}
      />
      <ProjectDetail
        title="project detail"
        idx={projectIdx}
        isOpen={isDetailOpen}
        close={handleDetailClose}
      />
    </>
  );
}
