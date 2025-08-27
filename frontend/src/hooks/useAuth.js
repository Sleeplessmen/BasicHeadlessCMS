import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  useContext(AuthContext);

  // if (!context) {
  //     throw new Error('useAuth must be used within an AuthProvider')
  // }

  // const { user, login, logout, isLoggedIn, loading } = context

  // const can = (permission) =>
  //     user?.role?.permissions?.includes(permission)

  // const isRole = (roleName) =>
  //     user?.role?.name === roleName

  // return {
  //     user,
  //     login,
  //     logout,
  //     isLoggedIn,
  //     loading,
  //     can,
  //     isRole,
  // }
}
