import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [formError, setFormError] = useState({ email: '', password: '' })

    const validate = () => {
        const errors = { email: '', password: '' }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!form.email) {
            errors.email = 'Email không được để trống'
        } else if (!emailRegex.test(form.email)) {
            errors.email = 'Email không hợp lệ'
        }

        if (!form.password) {
            errors.password = 'Mật khẩu không được để trống'
        } else if (form.password.length < 6) {
            errors.password = 'Mật khẩu tối thiểu 6 ký tự'
        }

        setFormError(errors)
        return !errors.email && !errors.password
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!validate()) return

        try {
            await login(form.email, form.password) // chỉ gọi context
            navigate('/dashboard')
        } catch (err) {
            setError('Đăng nhập thất bại: ' + (err.message || ''))
        }
    }

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold text-center">Đăng nhập</h2>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {formError.email && (
                        <div className="text-red-500 text-sm mt-1">{formError.email}</div>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="w-full p-2 border rounded"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    {formError.password && (
                        <div className="text-red-500 text-sm mt-1">{formError.password}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                    Đăng nhập
                </button>

                <p className="text-sm text-center text-gray-600">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Đăng ký
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )
}
