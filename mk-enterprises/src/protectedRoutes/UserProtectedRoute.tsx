import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectedRoute = ({ Component }) => {
  const userCookie = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userCookie) {
      navigate("/login");
    }
  }, [userCookie, navigate]);

  return <Component />;
};

export default UserProtectedRoute;
