import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import styles from './Login.module.css'

export default function LoginPage() {
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (form) => {
        if (!form.email || !form.password) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu.')
            return
        }

        setLoading(true)
        const res = await login(form)
        setLoading(false)

        if (res.success) {
            navigate('/')
        } else {
            setError(res.message)
        }
    }

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Đăng nhập</h2>
            <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
        </div>
    )
}
