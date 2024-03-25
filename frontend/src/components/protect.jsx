import { Navigate, Link } from "react-router-dom";
import { useMemo } from "react";

export default function ProtectedLayout({ children }) {
  const user = useMemo(() => localStorage.getItem("user"), []);

  if (!user) {
    //如果没登录
    return <Navigate to="/login" />;
    // const navigate = useNavigate()
  }

  return (
    <div>
      {children}
    </div>
  );
}
