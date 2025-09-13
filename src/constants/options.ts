import { store } from "../store/index";
import { logout } from "../store/authSlice";

export const options = [
  {
    title: "Logout",
    onClick: () => {
      store.dispatch(logout());
      window.location.href = "/login";
    },
  },
];
