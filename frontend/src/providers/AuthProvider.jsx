import { useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    // Hàm gọi API lấy thông tin người dùng
    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:1338/api/v1/auth/me', {
                withCredentials: true,
            })
            setUser(res.data.data) // Giả sử response chuẩn hóa là { data: { ...user } }
        } catch (err) {
            console.error('Fetch user error:', err.message)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    // Hàm đăng nhập
    const login = async (email, password) => {
        await axios.post('http://localhost:1338/api/v1/auth/login', { email, password }, {
            withCredentials: true
        })
        await fetchUser()
    }

    // Hàm đăng xuất
    const logout = async () => {
        await axios.post('http://localhost:1338/api/v1/auth/logout', {}, {
            withCredentials: true
        })
        setUser(null)
    }

    // Chỉ fetch user nếu không phải login/register
    useEffect(() => {
        const publicPaths = ['/login', '/register']
        if (!publicPaths.includes(location.pathname)) {
            fetchUser()
        } else {
            setLoading(false)
        }
    }, [location.pathname])

    const isLoggedIn = !!user

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isLoggedIn }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
