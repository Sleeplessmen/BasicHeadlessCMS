import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  login: () => {
    console.warn(
      "AuthContext: login() được gọi mà không có AuthProvider. " +
        "Hãy đảm bảo App được bao bọc bởi <AuthProvider>."
    );
  },
  logout: () => {
    console.warn("AuthContext: logout() được gọi mà không có AuthProvider.");
  },
  isLoggedIn: false,
  loading: true,
});
