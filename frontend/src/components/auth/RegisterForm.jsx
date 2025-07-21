import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'
import styles from './RegisterForm.module.css'

export default function RegisterForm() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password, confirmPassword, role } = form

        if (!email || !password || !confirmPassword) {
            return setError('Vui lòng điền đầy đủ thông tin.')
        }

        if (password !== confirmPassword) {
            return setError('Mật khẩu không khớp.')
        }

        setLoading(true)
        try {
            await axios.post('http://localhost:1338/api/v1/auth/register', {
                email,
                password,
                role,
            })

            const res = await login({ email, password })

            if (res.success) {
                navigate('/')
            } else {
                setError('Đăng ký thành công nhưng đăng nhập thất bại.')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="username"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Mật khẩu</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Xác nhận mật khẩu</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Vai trò</label>
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="user">Người dùng</option>
                    <option value="editor">Biên tập viên</option>
                </select>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" disabled={loading} className={styles.submitButton}>
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
        </form>
    )
}
