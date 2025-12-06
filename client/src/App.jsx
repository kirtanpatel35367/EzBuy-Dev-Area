import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  redirect,
  useNavigate,
  Navigate,
} from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { Toaster } from "sonner";
import AuthLayout from "./components/auth/layout";
import Authlogin from "./pages/auth/login";
import Authregister from "./pages/auth/register";
import VerifyOTP from "./pages/auth/verify-otp";
import Adminlayout from "./components/admin-view/layout";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminProducts from "./pages/admin-view/Product";
import AdminDashBoard from "./pages/admin-view/DashBoard";
import Shoppinglayout from "./components/shopping-view/layout";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import HomePage from "./pages/shopping-view/HomePage";
import ProductListing from "./pages/shopping-view/ProductListing";
import CheckOut from "./pages/shopping-view/CheckOut";
import UserProfilePage from "./pages/shopping-view/UserProfilePage";
import CheckAuth from "./components/common/CheckAuth";
import Unauth from "./pages/unAuthPage/Unauth";
import Success from "./pages/shopping-view/success";
import Canncel from "./pages/shopping-view/cancel";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";

const App = () => {
  const { user, isAuthanticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <HashLoader color="#113150" />
      </div>
    );
  }

  // Redirect root path to login if not authenticated
  if (location.pathname === "/" && !isAuthanticated) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        {
          // (location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register')) ? (<></>) : (<h1>Header Component</h1>)
        }

        {/* Authantication Part */}
        <Routes>
          <Route
            path="/auth"
            element={
              <CheckAuth
                isAuthanticated={isAuthanticated}
                user={user}
                isLoading={isLoading}
              >
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Authlogin />} />
            <Route path="register" element={<Authregister />} />
            <Route path="verify-otp" element={<VerifyOTP />} />
          </Route>

          {/* Admin part  */}
          <Route
            path="/admin"
            element={
              <CheckAuth
                isAuthanticated={isAuthanticated}
                user={user}
                isLoading={isLoading}
              >
                <Adminlayout />
              </CheckAuth>
            }
          >
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="dashboard" element={<AdminDashBoard />} />
          </Route>

          {/* Shopping Part  */}
          <Route
            path="/shop"
            element={
              <CheckAuth
                isAuthanticated={isAuthanticated}
                user={user}
                isLoading={isLoading}
              >
                <Shoppinglayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<HomePage />} />
            <Route path="productList" element={<ProductListing />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="useraccount" element={<UserProfilePage />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Canncel />} />
          </Route>
          <Route path="/unauth" element={<Unauth />} />
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
};

export default App;
