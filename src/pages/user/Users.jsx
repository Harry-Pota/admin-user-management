import { Button, Flex } from "antd";
import { useFetchUser } from "hooks/useRedux";
import { useState } from "react";
import UsersList from "./UsersList";
import CreateModal from "./component/CreateModal";

export default function Users() {
  const { getUserList } = useFetchUser();

  const [isOpen, setIsOpen] = useState(false);
  const clickedCreate = async () => setIsOpen(true);
  const handleClose = async () => {
    setIsOpen(false);
    getUserList();
  };

  return (
    <>
      <Flex gap="small" justify="flex-end" style={{ marginBottom: "12px" }}>
        <Button type="primary" onClick={clickedCreate}>
          Create
        </Button>
      </Flex>
      <UsersList />

      <CreateModal title="create user" isOpen={isOpen} close={handleClose} />
    </>
  );
}
