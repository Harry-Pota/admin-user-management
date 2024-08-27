import { configureStore, createSlice } from "@reduxjs/toolkit";

const user = { id: 0, name: "", email: "" };
const project = {
  id: 0,
  userId: 0,
  userName: "",
  name: "",
  description: "",
  status: "",
};

const latestUserIdx = createSlice({
  name: "latestUserIdx",
  initialState: 0,
  reducers: {
    setLatestUserIdx: (state, action) => {
      state = action.payload;

      return state;
    },
  },
});

const userList = createSlice({
  name: "userList",
  initialState: [user],
  reducers: {
    setUserInfo: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const userInfo = createSlice({
  name: "userInfo",
  initialState: user,
  reducers: {
    setDetailUserInfo: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const latestProjectIdx = createSlice({
  name: "latestProjectIdx",
  initialState: 0,
  reducers: {
    setLatestProjectIdx: (state, action) => {
      state = action.payload;

      return state;
    },
  },
});

const projectList = createSlice({
  name: "projectList",
  initialState: [project],
  reducers: {
    setProjectInfo: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const projectInfo = createSlice({
  name: "projectInfo",
  initialState: project,
  reducers: {
    setDetailProjectInfo: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setLatestUserIdx } = latestUserIdx.actions;
export const { setUserInfo } = userList.actions;
export const { setDetailUserInfo } = userInfo.actions;
export const { setLatestProjectIdx } = latestProjectIdx.actions;
export const { setProjectInfo } = projectList.actions;
export const { setDetailProjectInfo } = projectInfo.actions;

export default configureStore({
  reducer: {
    latestUserIdx: latestUserIdx.reducer,
    userList: userList.reducer,
    userInfo: userInfo.reducer,
    latestProjectIdx: latestProjectIdx.reducer,
    projectList: projectList.reducer,
    projectInfo: projectInfo.reducer,
  },
});
