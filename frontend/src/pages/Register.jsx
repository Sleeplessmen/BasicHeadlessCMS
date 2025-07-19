import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '', role: 'user' })
    const [formError, setFormError] = useState({})
    const [serverError, setServerError] = useState('')
    const [success, setSuccess] = useState(false)

    const validate = () => {
        const errors = {}
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

        if (!form.role || !['user', 'editor'].includes(form.role)) {
            errors.role = 'Vai trò không hợp lệ'
        }

        setFormError(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setServerError('')
        if (!validate()) return

        try {
            const res = await fetch('http://localhost:1338/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            const data = await res.json()

            if (!res.ok) {
                setServerError(data.message || 'Đăng ký thất bại')
                return
            }

            setSuccess(true)
            setTimeout(() => navigate('/login'), 2000)
        } catch (err) {
            setServerError('Lỗi kết nối đến máy chủ' + (err.message ? `: ${err.message}` : ''))
        }
    }

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold text-center">Đăng ký</h2>

                {serverError && <div className="text-red-500 text-sm">{serverError}</div>}
                {success && <div className="text-green-500 text-sm">Đăng ký thành công! Đang chuyển hướng...</div>}

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {formError.email && <div className="text-red-500 text-sm mt-1">{formError.email}</div>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="w-full p-2 border rounded"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    {formError.password && <div className="text-red-500 text-sm mt-1">{formError.password}</div>}
                </div>

                <div>
                    <select
                        className="w-full p-2 border rounded"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="user">Người dùng</option>
                        <option value="editor">Biên tập viên</option>
                    </select>
                    {formError.role && <div className="text-red-500 text-sm mt-1">{formError.role}</div>}
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                    Đăng ký
                </button>

                <p className="text-sm text-center text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )
}
