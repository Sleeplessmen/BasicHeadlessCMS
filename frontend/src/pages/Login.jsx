import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const { login } = useAuth()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.email || !form.password) {
            return setError('Vui lòng nhập đầy đủ email và mật khẩu.')
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
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-xl font-sans">
            <h2 className="text-2xl mb-6 text-brand-dark">🔐 Đăng nhập</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="you@example.com"
                        autoComplete="username"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="••••••"
                        autoComplete="current-password"
                    />
                </div>

                {error && (
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 rounded-md text-white font-bold bg-brand hover:bg-brand-dark transition ${loading ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </form>
        </div>
    )
}
