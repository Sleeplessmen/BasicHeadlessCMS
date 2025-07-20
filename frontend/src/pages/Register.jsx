import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const { login, isLoggedIn } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home')
        }
    }, [isLoggedIn, navigate])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
        setSuccess('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.email || !form.password || !form.confirmPassword) {
            return setError('Vui lòng điền đầy đủ thông tin.')
        }

        if (form.password !== form.confirmPassword) {
            return setError('Mật khẩu không khớp.')
        }

        setLoading(true)
        try {
            // 1. Đăng ký
            await axios.post('http://localhost:1338/api/v1/auth/register', {
                email: form.email,
                password: form.password,
                role: form.role,
            })

            // 2. Tự động đăng nhập
            const res = await login({ email: form.email, password: form.password })

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
        <div className="max-w-md mx-auto mt-10 font-sans">
            <h2 className="text-xl font-semibold text-brand mb-6">📝 Đăng ký</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full p-2 border border-gray-100 rounded-md"
                        autoComplete="username"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm mb-1">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••"
                        className="w-full p-2 border border-gray-100 rounded-md"
                        autoComplete="current-password"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm mb-1">
                        Xác nhận mật khẩu
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••"
                        className="w-full p-2 border border-gray-100 rounded-md"
                        autoComplete="new-password"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm mb-1">
                        Vai trò
                    </label>
                    <select
                        name="role"
                        id="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-100 rounded-md"
                    >
                        <option value="user">Người dùng</option>
                        <option value="editor">Biên tập viên</option>
                    </select>
                </div>

                {error && <p className="text-sm text-danger">{error}</p>}
                {success && <p className="text-sm text-success">{success}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 text-white font-bold rounded-md transition-opacity duration-200 ${loading ? 'opacity-60 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark'
                        }`}
                >
                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>
            </form>
        </div>
    )
}
