import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
import HomePage from '../pages/Home'
import MePage from '../pages/Me'
import PageManagementPage from '../pages/PageManagement/PageManagement'
import PageEditor from '../pages/PageEditor/PageEditor';
import DynamicPage from '../pages/PageManagement/DynamicPage';

import AppLayout from '../layouts/AppLayout'
import AuthLayout from '../layouts/AuthLayout'

export default function AppRouter() {
    const { isLoggedIn } = useAuth()

    return (
        <Routes>
            {/* Root redirect */}
            <Route
                path="/"
                element={
                    isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
                }
            />

            {/* Auth routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {isLoggedIn && (
                <Route element={<AppLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/me" element={<MePage />} />

                    <Route path="/page-management" element={<PageManagementPage />} />

                    <Route path="/page-editor/new" element={<PageEditor mode="create" />} />

                    <Route path="/page-editor/:id" element={<PageEditor mode="edit" />} />

                    <Route path="/pages/:slug" element={<DynamicPage />} />

                </Route>
            )}

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
