import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import styles from './LogoutButton.module.css'

export default function LogoutButton() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:1338/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
        } catch (err) {
            console.error('Logout error:', err)
        }

        logout()
        navigate('/login')
    }

    return (
        <button onClick={handleLogout} className={styles.logoutButton} title="Đăng xuất">
            <FiLogOut size={20} />
        </button>
    )
}
