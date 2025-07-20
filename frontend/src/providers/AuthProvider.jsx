import { useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    const publicPaths = ['/login', '/register']
    const isPublicRoute = publicPaths.includes(location.pathname)

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:1338/api/v1/auth/me', {
                withCredentials: true,
            })
            setUser(res.data.data)
        } catch (err) {
            console.warn('⚠️ fetchUser error:', err.response?.data || err.message)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async ({ email, password }) => {
        try {
            await axios.post('http://localhost:1338/api/v1/auth/login', { email, password }, {
                withCredentials: true,
            })

            await fetchUser()
            return { success: true }
        } catch (err) {
            console.warn('⚠️ Login error:', err.response?.data || err.message)
            return {
                success: false,
                message: err.response?.data?.message || 'Đăng nhập thất bại.',
            }
        }
    }

    const logout = async () => {
        try {
            await axios.post('http://localhost:1338/api/v1/auth/logout', {}, {
                withCredentials: true,
            })
        } catch (err) {
            console.warn('⚠️ Logout error:', err.message)
        } finally {
            setUser(null)
        }
    }

    useEffect(() => {
        if (!isPublicRoute) {
            fetchUser()
        } else {
            setLoading(false)
        }
    }, [isPublicRoute, location.pathname])

    const isLoggedIn = !!user

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
