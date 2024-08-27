import DashBoard from "pages/dashBoard/DashBoard";
import Navi from "pages/dashBoard/Navi";
import Project from "pages/project/Project";
import Users from "pages/user/Users";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navi />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </>
  );
}

export default App;
