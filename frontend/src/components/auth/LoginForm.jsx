import { useState } from 'react'
import styles from './LoginForm.module.css'

export default function LoginForm({ onSubmit, error, loading }) {
    const [form, setForm] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                Email
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="username"
                    placeholder="you@example.com"
                />
            </label>

            <label className={styles.label}>
                Mật khẩu
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="current-password"
                    placeholder="••••••••"
                />
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
        </form>
    )
}
