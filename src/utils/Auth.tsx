import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "../store";

const Auth = ({ children }: { children: JSX.Element }) => {
  const authState = useSelector((state: RootState) => state.auth);

  const isAuth = authState.isLoggedIn && authState.username;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default Auth;
