import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import AdminLayout from '../layouts/AdminLayout'

export default function AppRouter() {
    const isLoggedIn = true // TODO: dùng từ context sau

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/dashboard"
                element={isLoggedIn ? <AdminLayout><DashboardPage /></AdminLayout> : <Navigate to="/login" />}
            />
        </Routes>
    )
}
