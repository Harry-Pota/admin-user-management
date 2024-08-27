import { Button, Flex, Space, Table } from "antd";
import { useFetchUser } from "hooks/useRedux";
import { useEffect, useState } from "react";
import { request } from "utils/request";
import UserDetail from "./component/UserDetail";

export default function UsersList() {
  const { userData, getUserList } = useFetchUser();
  const [userIdx, setUserIdx] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDetailOpen = async (id) => {
    setUserIdx(id);
    setIsDetailOpen(true);
  };

  const handleDetailClose = async () => {
    setIsDetailOpen(false);
    getUserList();
  };

  const deleteUser = async ({ id, name }) => {
    const isConfirm = window.confirm(`${name} 사용자를 삭제하시겠습니까?`);

    if (isConfirm) {
      const res = await request.delete(`/users/${+id}`);

      if (res.ok) {
        getUserList();
      }
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
              <Button danger onClick={() => deleteUser(record)}>
                Delete
              </Button>
            </Flex>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    getUserList(userIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdx]);

  return (
    <>
      <Table rowKey={(row) => row.id} columns={columns} dataSource={userData} />
      <UserDetail
        title="user detail"
        idx={userIdx}
        isOpen={isDetailOpen}
        close={handleDetailClose}
      />
    </>
  );
}
