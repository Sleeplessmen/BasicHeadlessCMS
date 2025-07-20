import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans p-lg">
            <div className="bg-surface-light p-xl rounded-2xl shadow-strong w-full max-w-[400px]">
                <Outlet />
            </div>
        </div>
    )
}
