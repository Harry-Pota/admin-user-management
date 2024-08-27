import { Button, Flex } from "antd";
import { useFetchProject } from "hooks/useRedux";
import { useState } from "react";
import ProjectList from "./ProjectList";
import CreateModal from "./component/CreateModal";

export default function Project() {
  const { getProjectList } = useFetchProject();

  const [isOpen, setIsOpen] = useState(false);
  const clickedCreate = async () => setIsOpen(true);
  const handleClose = async () => {
    setIsOpen(false);
    getProjectList();
  };

  return (
    <>
      <Flex gap="small" justify="flex-end" style={{ marginBottom: "12px" }}>
        <Button type="primary" onClick={clickedCreate}>
          Create
        </Button>
      </Flex>
      <ProjectList />

      <CreateModal title="create project" isOpen={isOpen} close={handleClose} />
    </>
  );
}
