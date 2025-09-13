import { JSX } from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }: { children: JSX.Element }) => {
  const isAuth =
    localStorage.getItem("isLoggedIn") === "true" &&
    localStorage.getItem("username");

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default Auth;
