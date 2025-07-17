import { useState, useEffect } from 'react'
import { PermissionContext } from '../contexts/PermissionContext'
import { useAuth } from '../hooks/useAuth' // Để lấy thông tin user hiện tại nếu cần fetch permission

export function PermissionProvider({ children }) {
    const { user } = useAuth()
    const [permissions, setPermissions] = useState([])

    useEffect(() => {
        if (user) {
            // 🧠 TODO: gọi API thực tế để lấy quyền, ở đây mock
            setPermissions(user.permissions || [])
        } else {
            setPermissions([])
        }
    }, [user])

    const hasPermission = (required) => {
        if (!required) return true
        if (Array.isArray(required)) {
            return required.some((perm) => permissions.includes(perm))
        }
        return permissions.includes(required)
    }

    return (
        <PermissionContext.Provider value={{ permissions, hasPermission }}>
            {children}
        </PermissionContext.Provider>
    )
}
