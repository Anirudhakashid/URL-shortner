import { UrlState } from "@/Context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RequireAuth({ children }) {
  // This component is used to protect routes that require authentication
  // If the user is not authenticated, they will be redirected to the login page
  const navigate = useNavigate();
  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      // If the user is not authenticated and loading is complete, redirect to login
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);
  if (loading) return <BarLoader width={"100%"} />;

  if (isAuthenticated) return children;
}

export default RequireAuth;
