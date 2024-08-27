import { useDispatch, useSelector } from "react-redux";
import { request } from "utils/request";
import {
  setDetailProjectInfo,
  setDetailUserInfo,
  setLatestProjectIdx,
  setLatestUserIdx,
  setProjectInfo,
  setUserInfo,
} from "../redux/store";

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userList);
  const userInfo = useSelector((state) => state.userInfo);

  const getUserList = async (id) => {
    const url = id ? `/users/${id}` : "/users";
    const res = await request.get(url);
    const result = await res.json();

    if (id) {
      dispatch(setDetailUserInfo(result));
    } else {
      dispatch(setUserInfo(result));
      dispatch(setLatestUserIdx(+result[result.length - 1].id));
    }
  };

  return {
    userData,
    userInfo,
    getUserList,
  };
};

export const useFetchProject = () => {
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.projectList);
  const projectInfo = useSelector((state) => state.projectInfo);

  const getProjectList = async (id) => {
    const url = id ? `/projects/${id}` : "/projects";
    const res = await request.get(url);
    const result = await res.json();

    if (id) {
      dispatch(setDetailProjectInfo(result));
    } else {
      dispatch(setProjectInfo(result));
      dispatch(setLatestProjectIdx(+result[result.length - 1].id));
    }
  };

  return {
    projectData,
    projectInfo,
    getProjectList,
  };
};
