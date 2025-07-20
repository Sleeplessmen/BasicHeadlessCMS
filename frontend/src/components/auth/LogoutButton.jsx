import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            // Gọi API logout
            await fetch('http://localhost:1338/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include' // cần thiết để gửi cookie JWT
            })
        } catch (err) {
            console.error('Logout error:', err)
            // Không chặn logout FE nếu BE lỗi
        }

        logout() // Xóa local user info
        navigate('/login')
    }

    return (
        <button onClick={handleLogout} className="p-2 text-red-500 hover:underline">
            Đăng xuất
        </button>
    )
}
