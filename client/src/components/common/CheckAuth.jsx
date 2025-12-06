import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthanticated, user, children, isLoading }) => {
  const location = useLocation();

  //   if (!isAuthanticated) {
  //     return <Navigate to="/auth/login" state={{ from: location }} replace />;
  //   }

  if (
    !isAuthanticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/verify-otp")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  if (
    isAuthanticated &&
    user?.role == "admin" &&
    location.pathname.includes("/shop/home")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  if (
    isAuthanticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to={"/unauth"} />;
  }

  if (
    isAuthanticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/verify-otp"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/shop/home"} />;
    }
  }

  return <>{children}</>;
};

export default CheckAuth;
