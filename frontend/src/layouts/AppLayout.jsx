import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'
import { useTheme } from '../hooks/useTheme'

export default function AppLayout() {
    const { toggleTheme } = useTheme()

    return (
        <div className="flex h-screen font-sans">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar toggleDarkMode={toggleTheme} />
                <main className="flex-1 p-lg bg-gray-50 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
