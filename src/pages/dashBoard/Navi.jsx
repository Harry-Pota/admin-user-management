import { Link } from "react-router-dom";

export default function Navi() {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        textAlign: "start",
        fontSize: "20px",
      }}
    >
      <Link
        to="/"
        style={{ textDecoration: "none", marginRight: "25px", color: "black" }}
      >
        대시보드
      </Link>
      <Link
        to="/users"
        style={{ textDecoration: "none", marginRight: "25px", color: "black" }}
      >
        사용자
      </Link>
      <Link to="/project" style={{ textDecoration: "none", color: "black" }}>
        프로젝트
      </Link>
    </div>
  );
}
