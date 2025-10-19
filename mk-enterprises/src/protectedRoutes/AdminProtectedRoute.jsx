import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ Component }) => {
  const adminAuth = sessionStorage.getItem("admin_auth");
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminAuth) {
      navigate("/admin");
    }
  }, [adminAuth, navigate]);

  return <Component />;
};

export default AdminProtectedRoute;
