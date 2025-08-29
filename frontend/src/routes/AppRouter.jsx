import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import HomePage from "../pages/Home";
import MePage from "../pages/Me";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

export default function AppRouter() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/admin/auth/login" element={<LoginPage />} />
        <Route path="/admin/auth/register" element={<RegisterPage />} />
      </Route>

      {/* App routes */}
      <Route element={<AppLayout />}>
        <Route path="/admin" element={<HomePage />} />
        <Route path="/admin/me" element={<MePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
