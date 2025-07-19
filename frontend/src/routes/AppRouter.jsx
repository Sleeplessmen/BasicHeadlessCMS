import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
import DashboardPage from '../pages/Dashboard'
import AdminLayout from '../layouts/AdminLayout'

export default function AppRouter() {
    const { isLoggedIn } = useAuth()

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/dashboard"
                element={isLoggedIn ? (
                    <AdminLayout>
                        <DashboardPage />
                    </AdminLayout>
                ) : (
                    <Navigate to="/login" />
                )}
            />
        </Routes>
    )
}
