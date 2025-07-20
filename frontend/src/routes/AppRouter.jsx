import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
import HomePage from '../pages/Home'
import MePage from '../pages/Me'

import AppLayout from '../layouts/AppLayout'
import AuthLayout from '../layouts/AuthLayout'

export default function AppRouter() {
    const { isLoggedIn } = useAuth()

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
                }
            />

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {isLoggedIn && (
                <Route element={<AppLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/me" element={<MePage />} />
                </Route>
            )}

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
