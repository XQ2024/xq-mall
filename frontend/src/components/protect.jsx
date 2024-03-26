import { Navigate, Link } from "react-router-dom";
import { useMemo } from "react";

export default function ProtectedLayout({ children }) {
  const user = useMemo(() => localStorage.getItem("user"), []);
  // const navigate = useNavigate();
  //假设后端有API拿到一个JWT token，放入localStorage里

  if (!user) {
    //如果没登录
    return <Navigate to="/login" />;
    // const navigate = useNavigate()
  }

  return (
    <div>
      {children}
      {/* {children}  作为 <ProtectedLayout> 组件的子组件传递进来的任何内容，<User /> */}
      {/* <Outlet /> */}
    </div>
  );
}
